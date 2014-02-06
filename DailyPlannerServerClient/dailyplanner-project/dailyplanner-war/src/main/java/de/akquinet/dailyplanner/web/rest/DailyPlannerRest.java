package de.akquinet.dailyplanner.web.rest;

import org.jboss.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;

@Path("/v1")
@Stateless
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @EJB
    DailyPlanSimpleStorage storage;


    @GET
    @Path("/plan")
    @Produces({"application/json"})
    public String getDailyPlan() {
        return storage.getDailyPlan();
    }

    @POST
    @Path("/plan")
    @Consumes({"application/json"})
    public void saveDailyPlan(String dailyPlan) {
        storage.saveDailyPlan(dailyPlan);
    }
}
