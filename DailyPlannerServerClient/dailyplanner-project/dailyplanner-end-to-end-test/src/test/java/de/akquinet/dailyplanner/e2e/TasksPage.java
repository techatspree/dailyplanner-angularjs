package de.akquinet.dailyplanner.e2e;

import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;
import org.fluentlenium.core.wait.FluentWait;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotVisibleException;
import org.openqa.selenium.NoSuchElementException;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class TasksPage extends FluentPage {

    @Page
    private LoginPage loginPage;

    private static final String OPEN_DELETE_VIEW = "#task-list button[ng-click='showTaskDeleteView($index)']";
    private static final String CONFIRM_DELETE_BUTTON = "#task-list .task-delete-view button[ng-click='deleteTask($index)']";

    @Override
    public void isAt() {
        await().atMost(2, TimeUnit.SECONDS).until($(".navbar-brand")).hasText("Tagesplaner");
    }

    public void addTask(String text) {
        $("input[ng-model='newTaskTitle']").text(text);
        $("input[ng-model='newTaskTitle']").submit();
    }

    public void deleteTask(int index) {
        selectTask(index);

        await().until($(OPEN_DELETE_VIEW)).isClickable();
        $(OPEN_DELETE_VIEW).click();

        await().until($(CONFIRM_DELETE_BUTTON)).isClickable();
        $(CONFIRM_DELETE_BUTTON).click();
    }

    public List<String> listTasks() {
        return $("#task-list .task-title").getTexts();
    }

    public void selectTask(int index) {
        $("#task-list div[ng-click='selectTask(task, $index)']").get(index).click();
        await().until($("#edit-task-form")).isDisplayed();
    }

    public void logout(){
        final By abmelden = By.linkText("Abmelden");

        await().until(abmelden).isClickable();
        find(abmelden).click();

        await().until(() -> {
            loginPage.isAt();
            return true;
        });
    }

    @Override
    public FluentWait await() {
        return super.await().atMost(1, TimeUnit.SECONDS).ignoring(NoSuchElementException.class, ElementNotVisibleException.class);
    }
}
