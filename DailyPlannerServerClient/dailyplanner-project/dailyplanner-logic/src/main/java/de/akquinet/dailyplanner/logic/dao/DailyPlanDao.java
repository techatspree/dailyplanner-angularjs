package de.akquinet.dailyplanner.logic.dao;


import de.akquinet.dailyplanner.dbmodel.DailyPlan;
import org.jboss.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class DailyPlanDao {

    private static final Logger LOG = Logger.getLogger(DailyPlanDao.class);

    @PersistenceContext
    private EntityManager em;


    public DailyPlan findDailyPlan(String userId) {
        final DailyPlan dailyPlan = DailyPlan.class.cast(em.
                createNamedQuery(DailyPlan.FIND_DAILY_PLAN_BY_USER_ID).
                setParameter("userId", userId).
                getSingleResult());
        return dailyPlan;
    }
}
