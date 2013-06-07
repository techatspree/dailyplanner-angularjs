package de.akquinet.curamob.ticketmanagement;

import org.infinispan.Cache;
import org.infinispan.manager.CacheContainer;
import org.jboss.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

@MessageDriven(name = "TicketOperatorMDB", activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue"),
        @ActivationConfigProperty(propertyName = "destination", propertyValue = "queues/curamobQ"),
        @ActivationConfigProperty(propertyName = "acknowledgeMode", propertyValue = "Auto-acknowledge")})
public class TicketOperatorMDB implements MessageListener {

    private final static Logger LOG = Logger.getLogger(TicketOperatorMDB.class);

    @SuppressWarnings("EjbEnvironmentInspection")
    @Resource(mappedName = "java:jboss/infinispan/container/curamob")
    private CacheContainer container;

    @EJB
    private PingOperator pingOperator;

    @SuppressWarnings({"unchecked"})
    public void onMessage(Message message) {
        LOG.debugf("received message: %s", message);

        if (message instanceof TextMessage) {
            final TextMessage textMessage = (TextMessage) message;
            String ticket = null;
            try {
                ticket = textMessage.getText();
            } catch (JMSException e) {
                LOG.fatalf("I could not extract the ticket string from the received text message. I will swallow the message.");
            }
            if (ticket != null) {
                final Cache<String, RequestHolder> cache = container.getCache();
                final RequestHolder requestHolder = cache.get(ticket);
                if (requestHolder != null) {
                    final RequestHolder.OperationType operationType = requestHolder.getOperationType();
                    final Object input = requestHolder.getInput();
                    switch (operationType) {
                        // todo. architecture should be generalized
                        case PING:
                            if (pingOperator.checkInput(input)) {
                                LOG.debugf("Operating ping message with input %s.", input);
                                final String output = pingOperator.operate(String.class.cast(input));
                                requestHolder.putOutput(output);
                            } else {
                                LOG.fatalf("The input %s does not comply with the operator. I will swallow the message.", input);
                            }
                            break;
                        default:
                            LOG.fatalf("I received an unsupported operation type %s. I will swallow the message.", operationType);
                    }
                } else {
                    LOG.fatal("There is no ticket <%s>. I will swallow the message.");
                }

            }
        } else {
            LOG.fatalf("Received unexpected message type: %s. I will swallow it.", message.getClass());
        }

    }

}
