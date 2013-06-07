package de.akquinet.curamob.testdata;

import de.akquinet.curamob.dao.UserDao;
import de.akquinet.curamob.dbmodel.Role;
import de.akquinet.curamob.dbmodel.User;
import org.jboss.logging.Logger;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
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
                User user = User.createUser("user_" + i, "secret", "John_" + (NR_TEST_USER - i), "Doe_" + i, new Date());
                user.addRole(userRole);
                em.persist(user);
            }
            for (int i = 0; i <= NR_TEST_ADMIN; i++) {
                User user = User.createUser("admin_" + i, "secret", "Adam_" + (NR_TEST_ADMIN - i), "Administrator_" + i, new Date());
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
