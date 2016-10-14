package de.akquinet.dailyplanner.e2e;

import org.fluentlenium.adapter.FluentTest;
import org.fluentlenium.adapter.util.SharedDriver;
import org.fluentlenium.core.annotation.Page;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;


@SharedDriver//(type = SharedDriver.SharedType.PER_METHOD)
public class BasicIT extends FluentTest {

    @Page
    private LoginPage loginPage;

    @Page
    private TasksPage tasksPage;

    @Test
    public void canLogin() {
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


    @Before
    public void setup() {
        setScreenshotMode(TriggerMode.ON_FAIL);
        setScreenshotPath("target/screenshots");
    }

    @Override
    public final WebDriver getDefaultDriver() {
        return TestConfig.webDriver();
    }
}
