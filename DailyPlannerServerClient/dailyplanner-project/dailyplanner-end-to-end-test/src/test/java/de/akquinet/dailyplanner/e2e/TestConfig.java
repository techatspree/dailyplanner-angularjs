package de.akquinet.dailyplanner.e2e;

import io.github.bonigarcia.wdm.ChromeDriverManager;
import io.github.bonigarcia.wdm.PhantomJsDriverManager;
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
        if (Boolean.getBoolean("use.chrome")) {
            ChromeDriverManager.getInstance().setup();
            return new ChromeDriver();
        } else {
            PhantomJsDriverManager.getInstance().setup();
            return new PhantomJSDriver();
        }
    }
}
