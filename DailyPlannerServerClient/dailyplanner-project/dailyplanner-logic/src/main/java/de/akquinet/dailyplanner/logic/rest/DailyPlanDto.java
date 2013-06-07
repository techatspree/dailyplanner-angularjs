package de.akquinet.dailyplanner.logic.rest;

import java.util.ArrayList;
import java.util.List;

public class DailyPlanDto {

    private List<TaskDto> tasks = new ArrayList<TaskDto>();

    public List<TaskDto> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskDto> tasks) {
        this.tasks = tasks;
    }
}
