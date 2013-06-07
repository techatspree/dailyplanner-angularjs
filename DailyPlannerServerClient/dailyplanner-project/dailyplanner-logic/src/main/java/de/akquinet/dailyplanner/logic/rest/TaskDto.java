package de.akquinet.dailyplanner.logic.rest;

import static java.lang.Boolean.FALSE;

public class TaskDto {

    private String title = "";
    private String description = "";
    private String duration = "";
    private Boolean done = FALSE;

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
}
