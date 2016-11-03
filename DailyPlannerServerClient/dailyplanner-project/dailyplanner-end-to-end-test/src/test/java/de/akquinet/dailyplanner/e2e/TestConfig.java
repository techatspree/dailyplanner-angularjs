package de.akquinet.dailyplanner.e2e;

import io.github.bonigarcia.wdm.ChromeDriverManager;
import io.github.bonigarcia.wdm.PhantomJsDriverManager;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.phantomjs.PhantomJSDriver;

public class TestConfig {

    private static final int port = 8080;
    private static final Integer portOffset = Integer.getInteger("port.offset", 0);

    public static String basUrl() {
        int actualPort = port + portOffset;
        return "http://localhost:" + actualPort + "/dailyplanner/";
    }

    public static final WebDriver webDriver() {
        final WebDriver driver;
        if (Boolean.getBoolean("use.phantomjs")) {
            PhantomJsDriverManager.getInstance().setup();
            driver = new PhantomJSDriver();
        } else {
            ChromeDriverManager.getInstance().setup();
            driver = new ChromeDriver();
        }

        driver.manage().window().setSize(new Dimension(1024, 800));
        return driver;
    }
}
