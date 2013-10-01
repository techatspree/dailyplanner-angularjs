package de.akquinet.dailyplanner.web.rest;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DailyPlanSimpleStorage {

    private String dailyPlan = "";

    public String getDailyPlan() {
        return this.dailyPlan;
    }

    public void saveDailyPlan(String dailyPlan) {
        this.dailyPlan = dailyPlan;
    }

}
