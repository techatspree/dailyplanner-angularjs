package de.akquinet.dailyplanner.e2e;

import org.fluentlenium.assertj.FluentLeniumAssertions;
import org.fluentlenium.core.FluentPage;
import org.fluentlenium.core.annotation.Page;

import java.util.concurrent.TimeUnit;

import static org.fluentlenium.assertj.FluentLeniumAssertions.assertThat;

public class LoginPage extends FluentPage {

    @Page
    private TasksPage tasksPage;

    @Override
    public String getUrl() {
        return TestConfig.basUrl() + "pages/index.html";
    }

    @Override
    public void isAt() {
        assertThat($("form[name='loginForm']").first()).isDisplayed();
    }

    public void login(String username, String password){
        $("#username").text(username);
        $("#password").text(password);
        $("form[name='loginForm']").submit();
    }

    public void assertOnLoginFailedPage(){
        await().atMost(5, TimeUnit.SECONDS).until("h4").hasText("Fehler bei der Anmeldung");
    }
}
