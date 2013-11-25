package de.akquinet.dailyplanner.e2e;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.EnterpriseArchive;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;

@RunWith(Arquillian.class)
public class EndToEndTest {

    @Deployment(testable = false)
    public static EnterpriseArchive accessDeployment() {
        File ear = MavenDependencyResolver.resolve(
                "dailyplanner",
                "dailyplanner-ear",
                "0.1-SNAPSHOT",
                null,
                "ear"
        );

        return ShrinkWrap.createFromZipFile(EnterpriseArchive.class, ear);
    }

    @Test
    public void runE2ETest() {
        WebDriver driver = new FirefoxDriver();

        driver.get("http://localhost:8180/dailyplanner/pages/index.html");

        WebElement usernameInput = driver.findElement(By.id("username"));
        WebElement passwordInput = driver.findElement(By.id("password"));
        WebElement loginForm = driver.findElement(By.name("loginForm"));

        usernameInput.sendKeys("user1");
        passwordInput.sendKeys("secret");

        loginForm.submit();

        driver.get("http://localhost:8180/dailyplanner/scenario-runner/scenario-runner.html");

        ExpectedCondition e = new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return !d.findElement(By.id("application")).isDisplayed();
            }
        };
        Wait w = new WebDriverWait(driver, 20);
        w.until(e);

        WebElement error   = driver.findElement(By.className("status-error"));
        WebElement failure = driver.findElement(By.className("status-failure"));
        WebElement success = driver.findElement(By.className("status-success"));

        System.out.println("\n\n\n------------------------------------------------------------------------");
        System.out.println("AngularJS End-to-End-Tests\n");

        System.out.println(error.getText());
        System.out.println(failure.getText());
        System.out.println(success.getText());

        System.out.println("------------------------------------------------------------------------\n\n\n");

        Assert.assertEquals(error.getText(), "0 Errors");
        Assert.assertEquals(failure.getText(), "0 Failures");

        driver.close();
    }

}
