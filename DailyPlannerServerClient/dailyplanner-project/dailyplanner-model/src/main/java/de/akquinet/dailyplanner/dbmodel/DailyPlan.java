package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
@NamedQuery(name = DailyPlan.FIND_DAILY_PLAN_BY_USER_ID,
        query = "select dp from DailyPlan dp where dp.user.login = :userId")
public class DailyPlan extends AbstractEntity {

    public static final String FIND_DAILY_PLAN_BY_USER_ID = "findDailyPlanByUserId";
    @ManyToOne
    private User user;

    @OneToMany()
    @OrderColumn(name = "INDEX")
    private List<Task> tasks = new ArrayList<Task>();

    public DailyPlan() {
    }

    public DailyPlan(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Task> getTasks() {
        return Collections.unmodifiableList(tasks);
    }

    public void addTaskAt(int index, Task task) {
        tasks.add(index, task);
        task.setDailyPlan(this);
    }


    public void appendTask (Task task) {
        tasks.add(task);
        task.setDailyPlan(this);
    }
}
