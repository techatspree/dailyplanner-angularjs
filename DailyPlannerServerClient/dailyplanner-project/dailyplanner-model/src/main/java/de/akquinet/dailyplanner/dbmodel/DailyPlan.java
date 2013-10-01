package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import java.util.*;

@Entity
@NamedQuery(name = DailyPlan.FIND_DAILY_PLAN,
        query = "select dp from DailyPlan dp")
public class DailyPlan extends AbstractEntity {

    public static final String FIND_DAILY_PLAN = "findDailyPlan";


    @OneToMany()
    @OrderColumn(name = "INDEX")
    private List<Task> tasks = new ArrayList<Task>();

    public DailyPlan() {
    }

    public List<Task> getTasks() {
        return Collections.unmodifiableList(tasks);
    }

    public void appendTask (Task task) {
        tasks.add(task);
    }

    public Set<Task> returnOwnTasksWhichAreNotInTheList(List<Task> newTaskList) {
        final HashSet<Task> result = new HashSet<Task>(tasks.size());
        for (Task task : tasks) {
            if (! newTaskList.contains(task)) {
                result.add(task);
            }
        }
        return result;
    }

    public void updateTasksFromList(List<Task> newTaskList) {
        tasks =  new ArrayList<Task>();
        for (Task task : newTaskList) {
            appendTask(task);
        }
    }

}
