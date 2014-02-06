package de.akquinet.dailyplanner.web.rest;

import de.akquinet.dailyplanner.logic.dao.DailyPlanDao;
import de.akquinet.dailyplanner.logic.dao.TaskDto;
import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;

@Path("/v1")
@RolesAllowed({"admin","user"})
@Stateless
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @EJB
    private DailyPlanDao dailyPlanDao;

    @EJB
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
