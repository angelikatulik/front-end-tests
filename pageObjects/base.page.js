import AllureReporter from '@wdio/allure-reporter';

export default class BasePage {

    _typeInInput(input, value) {
        let inputLabel = this.getElementLabel(input);
        this._clearInput(input);
        input.setValue(value);

        AllureReporter.addStep(`Input ${inputLabel} value set to ${value}`);
    }

    _clearInput(input) {
        input.waitForEnabled();
        input.waitForExist();
        input.click();
        browser.keys('End');
        let counter = 0;
        let inputTextLength = input.getValue().length;

        do {
            browser.keys('Backspace');
            browser.keys('Delete');
            counter++;
        } while (input.getValue() != "" && counter < 2 * inputTextLength);
    }

    _clickElement(element, force = false) {
        let elementLabel = this.getElementLabel(element);
        element.scrollIntoView({ block: "center" });

        if (force) {
            element.waitForExist();
            browser.execute((elm) => {
                elm.click();
            }, element);
            AllureReporter.addStep(`Element ${elementLabel} force clicked`);
        }
        else {
            element.waitForClickable();
            element.click();
            AllureReporter.addStep(`Element ${elementLabel} clicked`);
        }
    }

    _selectDropdownOption(dropdown, option) {
        let dropdownLabel = this.getElementLabel(dropdown);

        this._clickButton(dropdown, true)
        let targetOptionElement = $(`//div[text() = '${option}']`);
        targetOptionElement.click();

        AllureReporter.addStep(`Option ${option} selected in ${dropdownLabel}`);
    }

    _clickButton(button, force = false) {
        let buttonLabel = this.getElementLabel(button);

        button.waitForClickable();
        button.click();

        AllureReporter.addStep(`Button ${buttonLabel} clicked`);
    }

    getElementLabel(element) {
        let elementLabel = element.getComputedLabel();

        if (elementLabel == '') {
            if (element.getText()) {
                elementLabel = element.getText();
            }
            else {
                elementLabel = element.selector;
            }
        }

        return elementLabel;
    }
}