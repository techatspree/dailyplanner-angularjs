package de.akquinet.dailyplanner.logic.rest;

import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Task;
import de.akquinet.dailyplanner.logic.dao.DailyPlanDao;
import org.jboss.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Stateless
@Path("/")
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @EJB
    private DailyPlanDao dailyPlanDao;

    @GET
    @Path("/plans/{id}")
    @Produces({"application/json"})
    public TaskDto[] getDailyPlan(@PathParam("id") String userId) {
        LOG.debugf("getDailyPlan(%s) called", userId);

        DailyPlan dailyPlan = dailyPlanDao.findDailyPlan(userId);

        TaskDto[] taskDtos = new TaskDto[dailyPlan.getTasks().size()];
        for (int i = 0; i < taskDtos.length; i++) {
            final Task task = dailyPlan.getTasks().get(i);
            final TaskDto taskDto =
                    new TaskDto(task.getId(), task.getTitle(), task.getDescription(), task.getDuration(), task.getDone());
            taskDtos[i] = (taskDto);
        }
        LOG.debugf("Return %s tasks (%d)", taskDtos, taskDtos.length);
        return taskDtos;
    }
}
