package de.akquinet.dailyplanner.logic.testdata;

import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import de.akquinet.dailyplanner.dbmodel.Role;
import de.akquinet.dailyplanner.dbmodel.Task;
import de.akquinet.dailyplanner.dbmodel.User;
import de.akquinet.dailyplanner.logic.dao.UserDao;
import org.jboss.logging.Logger;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Startup
@Singleton
public class TestDataImporter {

    private static final Logger LOGGER = Logger.getLogger(TestDataImporter.class);
    private static final int NR_TEST_USER = 6;
    private static final int NR_TEST_ADMIN = 4;

    @EJB
    private UserDao userDao;

    @PersistenceContext
    private EntityManager em;

    @PostConstruct
    public void insertTestData() {
        List<User> allUsers = userDao.findAllUsers();
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

                for (int j=0;j<5;j++) {
                    final Task task = new Task("Tasktitle " + j, "Description " + j, "10m", Boolean.FALSE);
                    dailyPlan.appendTask(task);
                    em.persist(task);
                }

                em.persist(user);
            }
            for (int i = 0; i <= NR_TEST_ADMIN; i++) {
                User user = User.createUser("admin" + i, "secret", "Adam_" + (NR_TEST_ADMIN - i), "Administrator_" + i);
                user.addRole(adminRole);
                user.addRole(userRole);
                em.persist(user);
            }
            LOGGER.info("Created " + (NR_TEST_USER + NR_TEST_ADMIN) + " test users.");
            em.flush();
        } else {
            LOGGER.info("There are users in the database. I will not create additional ones.");
        }
    }

}
