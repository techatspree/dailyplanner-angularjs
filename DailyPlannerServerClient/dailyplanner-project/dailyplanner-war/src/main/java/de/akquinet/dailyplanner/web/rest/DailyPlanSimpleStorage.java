package de.akquinet.dailyplanner.web.rest;

import javax.ejb.Singleton;

@Singleton
public class DailyPlanSimpleStorage {

    private String dailyPlan = "[" +
        "{\"title\":\"Joggen\",\"description\":\"Lauf um dein Leben, Marty!\",\"duration\": 60,\"done\": false}," +
        "{\"title\": \"Sushi essen\",\"description\": \"Nigiri, Maguro, Tamagoyaki\",\"duration\": 30,\"done\": false}," +
        "{\"title\":\"AngularJS coden\",\"description\":\"AngularJS, the Superheroic JavaScript MVW Framework\",\"duration\": 300,\"done\": false}" +
        "]";

    public String getDailyPlan() {
        return this.dailyPlan;
    }

    public void saveDailyPlan(String dailyPlan) {
        this.dailyPlan = dailyPlan;
    }

}
