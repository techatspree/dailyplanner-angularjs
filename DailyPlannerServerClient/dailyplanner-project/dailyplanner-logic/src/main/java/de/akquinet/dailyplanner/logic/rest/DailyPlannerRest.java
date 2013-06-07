package de.akquinet.dailyplanner.logic.rest;

import org.jboss.logging.Logger;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Stateless
@Path("/")
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @GET
    @Path("/plans/{id}")
    @Produces({"application/json"})
    public DailyPlanDto getDailyPlan(@PathParam("id") String userId) {
        LOG.debugf("getDailyPlan(%s) called", userId);
      return new DailyPlanDto();
    }
}
