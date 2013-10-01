package de.akquinet.dailyplanner.web.rest;

import org.jboss.logging.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;

@Path("/")
@RequestScoped
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @Inject
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
