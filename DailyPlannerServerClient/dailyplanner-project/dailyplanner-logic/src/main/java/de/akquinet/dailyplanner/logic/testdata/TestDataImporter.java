package de.akquinet.dailyplanner.logic.testdata;

import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Task;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Singleton
@Startup
public class TestDataImporter {

    @PersistenceContext
    private EntityManager em;


    @PostConstruct
    public void insertTestData() {
        DailyPlan dailyPlan = new DailyPlan();
        em.persist(dailyPlan);

        for (int j=0;j<5;j++) {
            final Task task = new Task("Tasktitle " + j, "Description " + j, "10", Boolean.FALSE);
            dailyPlan.appendTask(task);
            em.persist(task);
        }
    }

}