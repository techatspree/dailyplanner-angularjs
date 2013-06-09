package de.akquinet.dailyplanner.logic.dao;


import de.akquinet.dailyplanner.dbmodel.User;
import org.jboss.logging.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Stateless
@RolesAllowed({"admin","user"})
public class UserDao {

    private static final Logger LOG = Logger.getLogger(UserDao.class);

    @PersistenceContext
    private EntityManager em;


    @SuppressWarnings("unchecked")
    public List<User> findAllUsers() {
        LOG.debug("findAllUsers()");
        Query query = em.createQuery("select user from User user");
        return (List<User>) query.getResultList();
    }

    public User findUser(Long id) {
        return em.find(User.class, id);
    }
}
