package de.akquinet.dailyplanner.logic.testdata;

import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Role;
import de.akquinet.dailyplanner.dbmodel.Task;
import de.akquinet.dailyplanner.dbmodel.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.annotation.security.RunAs;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Singleton
@Startup
@RunAs("admin") // set the current role to admin to enable the execution of protected methods, does not work an AS7 :-(
public class TestDataImporter {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestDataImporter.class);
    private static final int NR_TEST_USER = 6;
    private static final int NR_TEST_ADMIN = 4;

    @PersistenceContext
    private EntityManager em;


    @PostConstruct
    public void insertTestData() {
        List<User> allUsers = findAllUsers();
        if (allUsers.isEmpty()) {
            final Role userRole = new Role("user");
            em.persist(userRole);
            final Role adminRole = new Role("admin");
            em.persist(adminRole);


            LOGGER.info("Creating new test users");
            for (int i = 0; i <= NR_TEST_USER; i++) {
                User user = User.createUser("user" + i, "secret", "John_" + (NR_TEST_USER - i), "Doe_" + i);
                user.addRole(userRole);

                DailyPlan dailyPlan = new DailyPlan(user);
                em.persist(dailyPlan);

                for (int j = 0; j < 5; j++) {
                    final Task task = new Task("Tasktitle " + j, "Description " + j, "10", Boolean.FALSE);
                    dailyPlan.appendTask(task);
                    em.persist(task);
                }

                em.persist(user);
            }
            for (int i = 0; i <= NR_TEST_ADMIN; i++) {
                User user = User.createUser("admin" + i, "secret", "Adam_" + (NR_TEST_ADMIN - i), "Administrator_" + i);
                user.addRole(adminRole);
                user.addRole(userRole);

                DailyPlan dailyPlan = new DailyPlan(user);
                em.persist(dailyPlan);

                for (int j = 0; j < 5; j++) {
                    final Task task = new Task("Tasktitle " + j, "Description " + j, "10", Boolean.FALSE);
                    dailyPlan.appendTask(task);
                    em.persist(task);
                }

                em.persist(user);
            }
            LOGGER.info("Created " + (NR_TEST_USER + NR_TEST_ADMIN) + " test users.");
            em.flush();
        } else {
            LOGGER.info("There are users in the database. I will not create additional ones.");
        }
    }

    private List<User> findAllUsers() {
        LOGGER.debug("findAllUsers()");
        Query query = em.createQuery("select user from User user");
        return (List<User>) query.getResultList();
    }

}
