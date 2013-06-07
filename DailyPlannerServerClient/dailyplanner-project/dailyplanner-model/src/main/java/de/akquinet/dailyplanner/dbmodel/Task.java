package de.akquinet.dailyplanner.dbmodel;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Task extends AbstractEntity {

    @Basic
    private String title;

    @Basic
    private String description;

    @Basic
    private String duration;

    @Basic
    private Boolean done;

    @ManyToOne
    private DailyPlan dailyPlan;

    public Task() {
    }

    public Task(String title, String description, String duration, Boolean done) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.done = done;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    protected void setDailyPlan(DailyPlan dailyPlan) {
        this.dailyPlan = dailyPlan;
    }
}
