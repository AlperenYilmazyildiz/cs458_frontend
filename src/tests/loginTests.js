const { Builder, By, Key, until } = require("selenium-webdriver");

async function testInvalidLogin() {
    let driver = await new Builder().forBrowser("firefox").build();
    
    try {
        await driver.get("http://localhost:3000");

        // Wait for email and password fields to be visible
        let emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);
        let passwordField = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
        let loginButton = await driver.findElement(By.css('button[type="submit"]'));

        await emailField.sendKeys("wrong@example.com");
        await passwordField.sendKeys("wrongpassword");
        await loginButton.click();

        // Wait for the error message to appear
        await driver.wait(until.elementLocated(By.id('error-message')), 10000);
        
        let errorMessage = await driver.findElement(By.id('error-message')).getText();
        console.log("error message", errorMessage);
        if (errorMessage.includes("Login failed. Wrong email or password.")) {
            console.log("Test Passed: Invalid Login Handled Correctly");
        } else {
            console.log("Test Failed: Unexpected error message - " + errorMessage);
        }
    } catch (error) {
        console.error("Test Failed:", error.message);
    } 
    // finally {
    //     await driver.quit();
    // }
}

testInvalidLogin();
