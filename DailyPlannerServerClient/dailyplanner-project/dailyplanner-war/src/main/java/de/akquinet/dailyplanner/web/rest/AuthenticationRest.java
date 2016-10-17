package de.akquinet.dailyplanner.web.rest;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import java.security.Principal;
import java.util.LinkedList;

@Path("/v1")
@RolesAllowed({"admin", "user"})
@Stateless
public class AuthenticationRest {

    private final static Logger LOG = LoggerFactory.getLogger(AuthenticationRest.class);

    @GET
    @Path("/currentuserid")
    @Produces({"application/json"})
    public AuthenticatedUserDto getAuthenticatedUserId(@Context HttpServletRequest httpRequest) {
        final Principal userPrincipal = httpRequest.getUserPrincipal();
        if (userPrincipal == null) {
            return new AuthenticatedUserDto("Gast", new String[]{});
        } else {
            final LinkedList<String> roles = new LinkedList<String>();
            checkAndAddRole("admin", roles, httpRequest);
            checkAndAddRole("user", roles, httpRequest);
            final String[] rolesArray = roles.toArray(new String[roles.size()]);

            return new AuthenticatedUserDto(userPrincipal.getName(), rolesArray);
        }
    }

    private void checkAndAddRole(String role, LinkedList<String> roles, HttpServletRequest httpRequest) {
        if (httpRequest.isUserInRole(role)) {
            roles.add(role);
        }
    }

    @DELETE
    @Path("/session")
    public void logout(@Context HttpServletRequest httpRequest) {
        LOG.debug("logout the current user");
        httpRequest.getSession().invalidate();
    }

}
