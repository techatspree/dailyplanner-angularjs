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
import java.util.ArrayList;
import java.util.List;

@Stateless
@Path("/")
public class DailyPlannerRest {

    private static final Logger LOG = Logger.getLogger(DailyPlannerRest.class);

    @EJB
    private DailyPlanDao dailyPlanDao;

    @GET
    @Path("/plans/{id}")
    @Produces({"application/json"})
    public DailyPlanDto getDailyPlan(@PathParam("id") String userId) {
        LOG.debugf("getDailyPlan(%s) called", userId);

        DailyPlan dailyPlan = dailyPlanDao.findDailyPlan(userId);

        List<TaskDto> taskDtos = new ArrayList<TaskDto>(dailyPlan.getTasks().size());
        for (Task task : dailyPlan.getTasks()) {
            final TaskDto taskDto = new TaskDto(task.getTitle(), task.getDescription(), task.getDuration(), task.getDone());
            taskDtos.add(taskDto);
        }

        final DailyPlanDto dailyPlanDto = new DailyPlanDto();
        dailyPlanDto.setTasks(taskDtos);

        return dailyPlanDto;
    }
}
