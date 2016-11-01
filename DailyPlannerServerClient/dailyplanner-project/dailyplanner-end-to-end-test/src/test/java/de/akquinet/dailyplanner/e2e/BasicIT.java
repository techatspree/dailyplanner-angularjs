package de.akquinet.dailyplanner.e2e;

import de.akquinet.dailyplanner.web.rest.Main;
import org.fluentlenium.adapter.FluentTest;
import org.fluentlenium.adapter.util.SharedDriver;
import org.fluentlenium.core.annotation.Page;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;


@SharedDriver(type = SharedDriver.SharedType.PER_METHOD)
public class BasicIT extends FluentTest {

    private static Main main;

    @BeforeClass
    public static void start() throws Exception {
        main = new Main(new String[]{});
        main.start();
        File war = new File("../dailyplanner-war/target/dailyplanner-war-0.1-SNAPSHOT.war");

        final WebArchive webArchive = ShrinkWrap.createFromZipFile(WebArchive.class, war);
        main.deploy(webArchive);
    }

    @Before
    public void setUp(){
        setScreenshotMode(TriggerMode.ON_FAIL);
        setScreenshotPath("target/screenshots");
    }

    @AfterClass
    public static void cleanUp() throws Exception {
        main.stop();
    }

    @Page
    private LoginPage loginPage;

    @Page
    private TasksPage tasksPage;

    @Test
    public void canLogin() throws Exception {
        goTo(loginPage);
        loginPage.login("admin0", "secret");
        tasksPage.isAt();
    }

    @Test
    public void cannotLoginWithWrongCredentials() {
        goTo(loginPage);
        loginPage.login("admin0", "wrong");
        loginPage.assertOnLoginFailedPage();
    }

    @Test
    public void canAddAndDeleteTask() {
        String description = "newTask-" + new Date();

        goTo(loginPage);
        loginPage.login("admin0", "secret");
        tasksPage.isAt();

        assertThat(tasksPage.listTasks()).doesNotContain(description);

        tasksPage.addTask(description);

        assertThat(tasksPage.listTasks()).contains(description);

        tasksPage.deleteTask(tasksPage.listTasks().indexOf(description));

        assertThat(tasksPage.listTasks()).doesNotContain(description);
    }


    @Override
    public final WebDriver getDefaultDriver() {
        return TestConfig.webDriver();
    }
}
