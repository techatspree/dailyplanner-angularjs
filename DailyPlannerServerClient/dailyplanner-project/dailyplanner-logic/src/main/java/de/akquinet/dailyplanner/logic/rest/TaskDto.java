package de.akquinet.dailyplanner.logic.rest;

import static java.lang.Boolean.FALSE;

@SuppressWarnings("ALL")
public class TaskDto {

    private String title = "";
    private String description = "";
    private String duration = "";
    private Boolean done = FALSE;

    public TaskDto() {
    }

    public TaskDto(String title, String description, String duration, Boolean done) {
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
}
