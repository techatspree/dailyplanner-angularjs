package de.akquinet.dailyplanner.logic.dao;

import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Task;
import org.jboss.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Stateless
public class DailyPlanDao {

    final static Logger LOG = Logger.getLogger(DailyPlanDao.class);

    @PersistenceContext
    private EntityManager em;


    private DailyPlan findDailyPlan() {
        return DailyPlan.class.cast(em.
                createNamedQuery(DailyPlan.FIND_DAILY_PLAN).
                getSingleResult());
    }

    private Task createNewTask(TaskDto taskDto) {
        LOG.debugf("createTask(%s)", taskDto.toString());
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
        LOG.debugf("updateTask(%d, %s", taskDto.getId(), taskDto.toString());

        final Task task = em.find(Task.class, taskDto.getId());
        if (task == null)
            throw new RuntimeException("There is no task with the id " + taskDto.getId());

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDuration(taskDto.getDuration());
        task.setDone(taskDto.getDone());
        return task;
    }

    public void saveDailyPlan(TaskDto[] taskDtos) {
        final DailyPlan dailyPlan = findDailyPlan();

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

    public TaskDto[] findTasksOfDailyPlan() {
        DailyPlan dailyPlan = findDailyPlan();
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
