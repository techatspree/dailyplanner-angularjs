package de.akquinet.dailyplanner.web.rest;

import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.wildfly.swarm.Swarm;
import org.wildfly.swarm.config.security.Flag;
import org.wildfly.swarm.config.security.SecurityDomain;
import org.wildfly.swarm.config.security.security_domain.ClassicAuthentication;
import org.wildfly.swarm.config.security.security_domain.authentication.LoginModule;
import org.wildfly.swarm.security.SecurityFraction;

import java.util.HashMap;

public class Main {

    private final String[] args;
    private Swarm swarmContainer;

    public Main(String[] args) {
        this.args = args;
    }


    public void start() throws Exception {
        this.swarmContainer = new Swarm(args);
        final LoginModule databaseLoginModule = new LoginModule("Database").code("Database")
                .flag(Flag.REQUIRED).moduleOptions(new HashMap<Object, Object>() {{
                    put("dsJndiName", "java:jboss/datasources/ExampleDS");
                    put("principalsQuery", "SELECT PASSWORD FROM CM_USER WHERE LOGIN = ?");
                    put("rolesQuery", "SELECT R.NAME, 'Roles' FROM CM_ROLE_CM_USER RU INNER JOIN CM_ROLE R ON R.ID = RU.ROLES_ID INNER JOIN CM_USER U ON U.ID = RU.USERS_ID WHERE U.LOGIN = ?");
                }});

        final SecurityDomain dailyPlannerSecurityDomain = new SecurityDomain("DailyPlanner").classicAuthentication(new ClassicAuthentication().loginModule(databaseLoginModule));
        swarmContainer.fraction(SecurityFraction.defaultSecurityFraction().securityDomain(dailyPlannerSecurityDomain));

        swarmContainer.start();
    }

    public void deploy(WebArchive webArchive) throws Exception {
        swarmContainer.deploy(webArchive);
    }

    public void deploySelf() throws Exception {
        // deploys this war
        swarmContainer.deploy();
    }


    public void stop() throws Exception {
        swarmContainer.stop();
    }

    public static void main(String[] args) throws Exception {

        final Main main = new Main(args);
        main.start();
        main.deploySelf();


        // deploys this war
//        swarm.deploy();

//        final File file = new File("dailyplanner-war/target/dailyplanner-war-0.1-SNAPSHOT.war");
//
//        System.out.println(file.getAbsolutePath());
//
//        final WebArchive warArchive = ShrinkWrap.create(ZipImporter.class, "dailyplanner-war-0.1-SNAPSHOT.war").importFrom(file)
//                .as(WebArchive.class);
//        swarm.deploy( warArchive );
    }


}
