package de.akquinet.dailyplanner.logic.dao;

import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Stateless
@RolesAllowed({"admin", "user"})
public class DailyPlanDao {

    final static Logger LOG = LoggerFactory.getLogger(DailyPlanDao.class);

    @PersistenceContext
    private EntityManager em;


    private DailyPlan findDailyPlan(String userId) {
        return DailyPlan.class.cast(em.
                createNamedQuery(DailyPlan.FIND_DAILY_PLAN_BY_USER_ID).
                setParameter("userId", userId).
                getSingleResult());
    }

    private Task createNewTask(TaskDto taskDto) {
        LOG.debug("createTask({})", taskDto);
        final Task task = new Task(
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getDuration(),
                taskDto.getDone()
        );
        em.persist(task);
        return task;
    }

    private Task updateTask(TaskDto taskDto) {
        LOG.debug("updateTask({}, {})", taskDto.getId(), taskDto);

        final Task task = em.find(Task.class, taskDto.getId());
        if (task == null) {
            throw new RuntimeException("There is no task with the id " + taskDto.getId());
        }

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDuration(taskDto.getDuration());
        task.setDone(taskDto.getDone());
        return task;
    }

    public void saveDailyPlanForUser(String userId, TaskDto[] taskDtos) {
        final DailyPlan dailyPlan = findDailyPlan(userId);

        List<Task> newTaskList = new ArrayList<Task>(taskDtos.length);
        for (final TaskDto taskDto : taskDtos) {
            final Task task;
            if (taskDto.getId() == null) {
                task = createNewTask(taskDto);
            } else {
                task = updateTask(taskDto);
            }
            newTaskList.add(task);
        }
        assert taskDtos.length == newTaskList.size();

        Set<Task> tasksToDelete = dailyPlan.returnOwnTasksWhichAreNotInTheList(newTaskList);

        dailyPlan.updateTasksFromList(newTaskList);

        for (Task task : tasksToDelete) {
            em.remove(task);
        }
    }

    public TaskDto[] findTasksOfDailyPlanForUser(String userId) {
        LOG.debug("getDailyPlan() called for {}", userId);

        DailyPlan dailyPlan = findDailyPlan(userId);

        return convertTaskListToDtoArray(dailyPlan);
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

}
