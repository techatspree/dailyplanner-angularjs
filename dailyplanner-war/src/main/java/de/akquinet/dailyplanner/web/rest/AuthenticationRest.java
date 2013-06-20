package de.akquinet.dailyplanner.web.rest;

import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.security.Principal;
import java.util.LinkedList;

@Path("/")
@RolesAllowed({"admin", "user"})
@RequestScoped
public class AuthenticationRest {

    private final static Logger LOG = Logger.getLogger(AuthenticationRest.class);

    // HACK: Currently @Context does not work in SLSB, hence this POJO that breaks the architecture :-(
    @Context
    private HttpServletRequest httpRequest;

    @GET
    @Path("/currentuserid")
    @Produces({"application/json"})
    public AuthenticatedUserDto getAuthenticatedUserId() {
        final Principal userPrincipal = httpRequest.getUserPrincipal();
        if (userPrincipal == null) {
            return new AuthenticatedUserDto("Gast", new String[]{});
        } else {
            final LinkedList<String> roles = new LinkedList<String>();
            checkAndAddRole("admin", roles);
            checkAndAddRole("user", roles);
            final String[] rolesArray = roles.toArray(new String[roles.size()]);

            return new AuthenticatedUserDto(userPrincipal.getName(), rolesArray);
        }
    }

    private void checkAndAddRole(String role, LinkedList<String> roles) {
        if (httpRequest.isUserInRole(role)) {
            roles.add(role);
        }
    }

    @DELETE
    @Path("/session")
    public void logout() {
        LOG.debug("logout the current user");
        httpRequest.getSession().invalidate();
    }
}
