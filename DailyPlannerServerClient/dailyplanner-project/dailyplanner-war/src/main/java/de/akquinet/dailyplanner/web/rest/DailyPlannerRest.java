package de.akquinet.dailyplanner.web.rest;

import de.akquinet.dailyplanner.logic.dao.DailyPlanDao;
import de.akquinet.dailyplanner.logic.dao.TaskDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

@Path("/v1")
@RolesAllowed({"admin", "user"})
@Stateless
public class DailyPlannerRest {

    private static final Logger LOG = LoggerFactory.getLogger(DailyPlannerRest.class);

    @EJB
    private DailyPlanDao dailyPlanDao;

    @EJB
    private AuthenticationRest authenticationRest;

    @GET
    @Path("/plan")
    @Produces({"application/json"})
    public TaskDto[] getDailyPlan(@Context HttpServletRequest httpRequest) {
        final String userId = authenticationRest.getAuthenticatedUserId(httpRequest).getLogin();

        return dailyPlanDao.findTasksOfDailyPlanForUser(userId);
    }

    @POST
    @Path("/plan")
    @Consumes({"application/json"})
    public void saveDailyPlan(TaskDto[] taskDtos, @Context HttpServletRequest httpRequest) {
        final String userId = authenticationRest.getAuthenticatedUserId(httpRequest).getLogin();

        LOG.debug("saveDailyPlan({}) for {}", taskDtos, userId);

        dailyPlanDao.saveDailyPlanForUser(userId, taskDtos);
    }

}
