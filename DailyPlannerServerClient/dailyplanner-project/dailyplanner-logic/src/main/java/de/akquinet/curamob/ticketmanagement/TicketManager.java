package de.akquinet.curamob.ticketmanagement;

import org.infinispan.Cache;
import org.infinispan.manager.CacheContainer;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.jms.*;
import java.util.UUID;

@Stateless
public class TicketManager {

    @SuppressWarnings("EjbEnvironmentInspection")
    @Resource(mappedName = "java:jboss/infinispan/container/curamob")
    private CacheContainer container;

    @Resource(mappedName = "java:/JmsXA")
    private QueueConnectionFactory queueConnectionFactory;

    @Resource(mappedName = "java:/queues/curamobQ")
    private Queue queue;


    public String placeNewTicket(RequestHolder requestHolder) {

        String ticket = putRequestInCache(requestHolder);

        sendTicketForAsynchronousOperating(ticket);

        return ticket;
    }

    public RequestHolder lookupTicket(String ticket) {
        Cache<String, RequestHolder> cache = getCache();
        return cache.get(ticket);
    }

    public boolean removeTicket(String ticket) {
        final Cache<String, RequestHolder> cache = getCache();
        final RequestHolder removedRequestHolder = cache.remove(ticket);

        return (removedRequestHolder != null);
    }

    private void sendTicketForAsynchronousOperating(String ticket) {
        try {
            final QueueConnection connection = queueConnectionFactory.createQueueConnection();
            final QueueSession session = connection.createQueueSession(true, Session.SESSION_TRANSACTED);
            final TextMessage message = session.createTextMessage();
            message.setText(ticket);

            final QueueSender sender = session.createSender(queue);
            sender.send(message);
        } catch (JMSException e) {
            throw new RuntimeException("Could not send message.", e);
        }
    }

    private String putRequestInCache(RequestHolder requestHolder) {
        Cache<String, RequestHolder> cache = getCache();

        // todo: add counter to ensure no infinite loops happens
        String ticket;
        do {
            final UUID uuid;
            uuid = UUID.randomUUID();
            ticket = uuid.toString();
        } while (cache.containsKey(ticket));

        cache.put(ticket, requestHolder);
        return ticket;
    }

    private Cache<String, RequestHolder> getCache() {
        return container.getCache();
    }
}
