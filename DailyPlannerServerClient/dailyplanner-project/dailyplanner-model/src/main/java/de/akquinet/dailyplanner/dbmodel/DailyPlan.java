package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
public class DailyPlan extends AbstractEntity {

    @ManyToOne
    private User user;

    @OneToMany()
    @OrderColumn(name="INDEX")
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
        tasks.add(index,task);
        task.setDailyPlan(this);
    }
}
