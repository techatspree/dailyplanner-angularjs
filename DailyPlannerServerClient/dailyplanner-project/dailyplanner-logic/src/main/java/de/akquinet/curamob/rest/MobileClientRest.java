package de.akquinet.curamob.rest;

import de.akquinet.curamob.ticketmanagement.RequestHolder;
import de.akquinet.curamob.ticketmanagement.TicketManager;
import org.jboss.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import static de.akquinet.curamob.ticketmanagement.RequestHolder.OperationType;

@Stateless
@Path("/")
public class MobileClientRest {

    private static final Logger LOG = Logger.getLogger(MobileClientRest.class);


    @EJB
    private TicketManager ticketManager;

    @POST
    @Path("/ping")
    @Produces({"text/plain"})
    @Consumes({"text/plain"})
    public String pingReq(String payload) {
        LOG.debug("REST service called - pingReq() ");

        // HACK?: the server receives 00,07 values at the beginning of the token. I'll remove them...
        // this maybe caused by the writeUTF method in the client
        int i = 0;
        while (i < payload.length()) {
            if (payload.charAt(i) > 20) {
                break;
            } else {
                i++;
            }
        }
        final String payloadCleaned = payload.substring(i);

        final RequestHolder<String, String> requestHolder =
                new RequestHolder<String, String>(OperationType.PING, payloadCleaned);

        return ticketManager.placeNewTicket(requestHolder);
    }

    @GET
    @Path("/ping/{ticket}")
    @Produces({"application/json"})
    public RequestStatus pingResp(@PathParam("ticket") String ticket) {
        LOG.debug("REST service called - pingResp() ");

        // todo: generalize the architecture
        final RequestStatus requestStatus = new RequestStatus();

        final RequestHolder requestHolder = ticketManager.lookupTicket(ticket);

        if (requestHolder == null) {
            requestStatus.setState(RequestStatus.UNKNOWN_STATE);
        } else {
            final RequestHolder.State state = requestHolder.getState();
            switch (state) {
                case REQUESTED:
                    requestStatus.setState(RequestStatus.REQUESTED_STATE);
                    break;
                case OPERATED:
                    requestStatus.setState(RequestStatus.OPERATED_STATE);
                    requestStatus.setResult(requestHolder.getOutput());
                    break;
                default:
                    LOG.fatalf("Unknown state %s.", state);
                    throw new RuntimeException("Unknown state " + state);
            }
        }
        return requestStatus;
    }

    @DELETE
    @Path("/ping/{ticket}")
    public Response removeTicket(@PathParam("ticket") String ticket) {
        LOG.debugf("REST service called - Removing ticket %s", ticket);

        if (ticketManager.removeTicket(ticket)) {
            return Response.ok().build();
        }  else {
            return Response.status(Response.Status.NOT_FOUND).entity("Ticket not found for ticket " + ticket).build();
        }
    }


}
