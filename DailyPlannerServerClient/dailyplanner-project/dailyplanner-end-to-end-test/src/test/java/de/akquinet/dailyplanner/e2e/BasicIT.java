package de.akquinet.dailyplanner.e2e;

import org.fluentlenium.adapter.FluentTest;
import org.fluentlenium.adapter.util.SharedDriver;
import org.fluentlenium.core.annotation.Page;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import static org.assertj.core.api.Assertions.assertThat;


@SharedDriver(type = SharedDriver.SharedType.PER_METHOD)
public class BasicIT extends FluentTest {

    @Before
    public void setUp() {
        setScreenshotMode(TriggerMode.ON_FAIL);
        setScreenshotPath("target/screenshots");
    }

    @Page
    private LoginPage loginPage;

    @Page
    private TasksPage tasksPage;

    @Test
    public void canLoginAndLogout() throws Exception {
        login();
        tasksPage.logout();
        loginPage.isAt();
    }

    @Test
    public void cannotLoginWithWrongCredentials() {
        goTo(loginPage);
        loginPage.login("admin0", "wrong");
        loginPage.assertOnLoginFailedPage();
    }

    @Test
    public void canAddAndDeleteTask() {
        String description = "newTask-" + System.currentTimeMillis();

        login();

        assertThat(tasksPage.listTasks()).doesNotContain(description);
        tasksPage.addTask(description);
        assertThat(tasksPage.listTasks()).contains(description);

        tasksPage.deleteTask(tasksPage.listTasks().indexOf(description));
        assertThat(tasksPage.listTasks()).doesNotContain(description);
    }

    @Test
    public void tasksArePersisted() {
        String description = "newTask-" + System.currentTimeMillis();

        login();

        tasksPage.addTask(description);

        tasksPage.logout();
        login();

        tasksPage.deleteTask(tasksPage.listTasks().indexOf(description));

        assertThat(tasksPage.listTasks()).doesNotContain(description);
    }

    private void login() {
        goTo(loginPage);
        loginPage.login("admin0", "secret");
        tasksPage.isAt();
    }


    @Override
    public final WebDriver getDefaultDriver() {
        return TestConfig.webDriver();
    }
}
