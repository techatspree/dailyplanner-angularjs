package de.akquinet.dailyplanner.web.rest;

import org.wildfly.swarm.Swarm;
import org.wildfly.swarm.config.security.Flag;
import org.wildfly.swarm.config.security.SecurityDomain;
import org.wildfly.swarm.config.security.security_domain.ClassicAuthentication;
import org.wildfly.swarm.config.security.security_domain.authentication.LoginModule;
import org.wildfly.swarm.security.SecurityFraction;

import java.util.HashMap;

public class Main {

    public static void main(String[] args) throws Exception {
        Swarm swarmContainer = new Swarm(args);
        configureSecurityDomain(swarmContainer);

        swarmContainer.start();

        // deploys this war
        swarmContainer.deploy();
    }

    private static void configureSecurityDomain(final Swarm swarmContainer) {
        final LoginModule databaseLoginModule = new LoginModule("Database").code("Database")
                .flag(Flag.REQUIRED).moduleOptions(new HashMap<Object, Object>() {{
                    put("dsJndiName", "java:jboss/datasources/ExampleDS");
                    put("principalsQuery", "SELECT PASSWORD FROM CM_USER WHERE LOGIN = ?");
                    put("rolesQuery", "SELECT R.NAME, 'Roles' FROM CM_ROLE_CM_USER RU INNER JOIN CM_ROLE R ON R.ID = RU.ROLES_ID INNER JOIN CM_USER U ON U.ID = RU.USERS_ID WHERE U.LOGIN = ?");
                }});
        final SecurityDomain dailyPlannerSecurityDomain = new SecurityDomain("DailyPlanner").classicAuthentication(new ClassicAuthentication().loginModule(databaseLoginModule));
        swarmContainer.fraction(SecurityFraction.defaultSecurityFraction().securityDomain(dailyPlannerSecurityDomain));
    }
}
