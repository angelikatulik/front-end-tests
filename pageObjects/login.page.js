import AllureReporter from '@wdio/allure-reporter';
import BasePage from '../pageobjects/base.page.js';
import MenuPage from '../pageObjects/menu.page.js';

class LoginPage extends BasePage {
    
    get inputUsername () { return $(`//input[@type = 'email']`) }
    get inputPassword() { return $(`//input[@type = 'password']`) }
    get submitBtn() { return $(`//button/span[text() = 'Sign in']`) }

    login() {
        browser.url(browser.config.baseUrl);

        this.inputUsername.waitForEnabled();
        this._typeInInput(this.inputUsername, browser.config.usr);
        this._typeInInput(this.inputPassword, browser.config.pwd);

        this.submitBtn.click();

        MenuPage.headerAvatar.waitForExist({ timeoutMsg: 'Header title not found, login failed' });
    }

    open() {
        browser.url(`login`);
        AllureReporter.addStep(`Sign in page opened`);
    }
}

export default new LoginPage();
