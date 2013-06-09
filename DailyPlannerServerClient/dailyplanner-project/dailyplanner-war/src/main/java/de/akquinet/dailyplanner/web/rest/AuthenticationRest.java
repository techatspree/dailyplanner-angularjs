package de.akquinet.dailyplanner.web.rest;

import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.security.Principal;

@Path("/")
@RolesAllowed({"admin","user"})
@RequestScoped
public class AuthenticationRest {

    private final static Logger LOG = Logger.getLogger(AuthenticationRest.class);

    // HACK: Currently @Context does not work in SLSB, hence this POJO that breaks the architecture :-(
    @Context
    private HttpServletRequest httpRequest;

    @GET
    @Path("/currentuserid")
    @Produces({"application/json"})
    public String getAuthenticatedUserId() {
        final Principal userPrincipal = httpRequest.getUserPrincipal();
        if (userPrincipal == null) {
            return "Gast";
        } else {
            return userPrincipal.getName();
        }
    }

    @POST
    @Path("/session")
    @Consumes({"application/json"})
    public void logout() {
        LOG.debug("logout the current user");
        httpRequest.getSession().invalidate();
    }
}
