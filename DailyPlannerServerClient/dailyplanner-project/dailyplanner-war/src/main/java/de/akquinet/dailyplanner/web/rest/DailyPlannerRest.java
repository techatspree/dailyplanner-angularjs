package de.akquinet.dailyplanner.web.rest;

import de.akquinet.dailyplanner.logic.dao.DailyPlanDao;
import de.akquinet.dailyplanner.logic.dao.TaskDto;
import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;

@Path("/")
@RolesAllowed({"admin","user"})
@RequestScoped
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @Inject
    private DailyPlanDao dailyPlanDao;

    @Inject
    private AuthenticationRest authenticationRest;


    @GET
    @Path("/plan")
    @Produces({"application/json"})
    public TaskDto[] getDailyPlan() {
        final String userId = authenticationRest.getAuthenticatedUserId().getLogin();

        return dailyPlanDao.findTasksOfDailyPlanForUser(userId);
    }

    @POST
    @Path("/plan")
    @Consumes({"application/json"})
    public void saveDailyPlan(TaskDto[] taskDtos) {
        final String userId = authenticationRest.getAuthenticatedUserId().getLogin();

        LOG.debugf("saveDailyPlan(%s) for %s", taskDtos, userId);

        dailyPlanDao.saveDailyPlanForUser(userId, taskDtos);
    }

}
