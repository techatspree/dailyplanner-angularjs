package de.akquinet.dailyplanner.logic.rest;

import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Task;
import de.akquinet.dailyplanner.logic.dao.DailyPlanDao;
import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

@Stateless
@Path("/")
@RolesAllowed({"admin","user"})
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

        TaskDto[] taskDtos = convertTaskListToDtoArray(dailyPlan);

        LOG.debugf("Return %s tasks (%d)", taskDtos, taskDtos.length);
        return taskDtos;
    }

    private TaskDto[] convertTaskListToDtoArray(DailyPlan dailyPlan) {
        TaskDto[] taskDtos = new TaskDto[dailyPlan.getTasks().size()];
        for (int i = 0; i < taskDtos.length; i++) {
            final Task task = dailyPlan.getTasks().get(i);
            final TaskDto taskDto =
                    new TaskDto(task.getId(), task.getTitle(), task.getDescription(), task.getDuration(), task.getDone());
            taskDtos[i] = (taskDto);
        }
        return taskDtos;
    }

    @POST
    @Path("/plans/{id}")
    @Consumes({"application/json"})
    public void saveDailyPlan(@PathParam("id") String userId, TaskDto[] taskDtos) {
        LOG.debugf("saveDailyPlan(%s, %s)", userId, taskDtos);

        final DailyPlan dailyPlan = dailyPlanDao.findDailyPlan(userId);

        List<Task> newTaskList = new ArrayList<Task>(taskDtos.length);
        for (final TaskDto taskDto : taskDtos) {
            final Task task;
            if (taskDto.getId() == null) {
                task = dailyPlanDao.createNewTask(taskDto.getTitle(), taskDto.getDescription(),
                        taskDto.getDuration(), taskDto.getDone());
            } else {
                task = dailyPlanDao.updateTask(taskDto.getId(), taskDto.getTitle(), taskDto.getDescription(),
                        taskDto.getDuration(), taskDto.getDone());
            }
            newTaskList.add(task);
        }
        assert taskDtos.length == newTaskList.size();

        dailyPlanDao.updateTaskList(dailyPlan, newTaskList);
    }
}
