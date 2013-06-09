package de.akquinet.dailyplanner.logic.dao;


import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Task;
import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Set;

@Stateless
@RolesAllowed({"admin","user"})
public class DailyPlanDao {

    final static Logger LOG = Logger.getLogger(DailyPlanDao.class);

    @PersistenceContext
    private EntityManager em;


    public DailyPlan findDailyPlan(String userId) {
        return DailyPlan.class.cast(em.
                createNamedQuery(DailyPlan.FIND_DAILY_PLAN_BY_USER_ID).
                setParameter("userId", userId).
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

    public void updateTaskList(DailyPlan dailyPlan, List<Task> newTaskList) {
        Set<Task> tasksToDelete = dailyPlan.returnOwnTasksWhichAreNotInTheList (newTaskList);
        dailyPlan.updateTasksFromList(newTaskList);
        for (Task task : tasksToDelete) {

            em.remove(task);
        }

    }
}
