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


    public DailyPlan findDailyPlan() {
        return DailyPlan.class.cast(em.
                createNamedQuery(DailyPlan.FIND_DAILY_PLAN).
                getSingleResult());
    }

    public Task createNewTask(String title, String description, String duration, Boolean done) {
        LOG.debugf("createTask(%s, %s, %s, %s", title, description, duration, done);
        final Task task = new Task(title, description, duration, done);
        em.persist(task);
        return task;
    }

    public Task updateTask(Long id, String title, String description, String duration, Boolean done) {
        LOG.debugf("updateTask(%d, %s, %s, %s, %s", id, title, description, duration, done);

        final Task task = em.find(Task.class, id);
        if (task == null)
            throw new RuntimeException("There is no task with the id "+id);

        task.setTitle(title);
        task.setDescription(description);
        task.setDuration(duration);
        task.setDone(done);
        return task;
    }

    public void saveDailyPlan(TaskDto[] taskDtos) {
        final DailyPlan dailyPlan = findDailyPlan();

        List<Task> newTaskList = new ArrayList<Task>(taskDtos.length);
        for (final TaskDto taskDto : taskDtos) {
            final Task task;
            if (taskDto.getId() == null) {
                task = createNewTask(taskDto.getTitle(), taskDto.getDescription(),
                        taskDto.getDuration(), taskDto.getDone());
            } else {
                task = updateTask(taskDto.getId(), taskDto.getTitle(), taskDto.getDescription(),
                        taskDto.getDuration(), taskDto.getDone());
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
