package de.akquinet.dailyplanner.web.rest;

import de.akquinet.dailyplanner.logic.dao.DailyPlanDao;
import de.akquinet.dailyplanner.logic.dao.TaskDto;
import org.jboss.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;

@Path("/v1")
@Stateless
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @EJB
    private DailyPlanDao dailyPlanDao;


    @GET
    @Path("/plan")
    @Produces({"application/json"})
    public TaskDto[] getDailyPlan() {
        return dailyPlanDao.findTasksOfDailyPlan();
    }

    @POST
    @Path("/plan")
    @Consumes({"application/json"})
    public void saveDailyPlan(TaskDto[] taskDtos) {
        LOG.debugf("saveDailyPlan", taskDtos);

        dailyPlanDao.saveDailyPlan(taskDtos);
    }

}
