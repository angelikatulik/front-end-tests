import BasePage from './base.page.js';
import AllureReporter from '@wdio/allure-reporter';

class ArchivesPage extends BasePage {

    get archivesHeader() { return $(`//div[text() = 'Archives']`) }
    get searchBar() { return $(`input[placeholder = 'Search in archives…']`) }
    get clearBtn() { return $(`button[title = 'Clear']`) }

    //filters
    get addFilterDropdown() { return $(`button[data-testid = 'add-filter-button']`) }
    get dateFilter() { return $(`//div[text() = 'Date']`) }
    get agentFilter() { return $(`//div[text() = 'Agent']`) }
    get groupFilter() { return $(`//div[text() = 'Group']`) }
    get goalFilter() { return $(`//div[text() = 'Goal']`) }
    get ratingFilter() { return $(`//div[text() = 'Rating']`) }
    get tagFilter() { return $(`//div[text() = 'Tag']`) }

    //tags multiselect
    get tagsMultiselect() { return $(`//div[contains(@class, 'multiselect-head')]/div`) }
    get doneFilterBtn() { return $(`//button/div[text() = 'Done']`) }
    get removeFiltersBtn() { return $(`//span[contains(@class, 'remove')]`) }

    get numberOfChats() { return $(`//div[text() = 'chats']/span`) }
    get numberOfChat() { return $(`//div[text() = 'chat']/span`) }
    get noResultsFoundMessage() { return $(`//h2[text() = 'Darn, no results found']`) }
    get noResultsFoundImg() { return $(`img[alt='Search no result']`) }

    isSearchedValueFoundInChats(searchedValue) {
        let chatsDisplayedAfterSearching = $$(`//div[@data-testid = 'list-container']/descendant::ul/li`);

        chatsDisplayedAfterSearching.forEach((chat) => {
            let allResultsElementsInChat = chat.$$(`li[id *= 'archive-item'] div > span > span > span`)

            let allResultsTextsInChat = [];
            allResultsElementsInChat.forEach((result) => {
                allResultsTextsInChat.push(result.getText());
            })
            if (!allResultsTextsInChat.includes(searchedValue))
                throw new Error('Chat does not include searched value');
        })
        return true;
    }

    waitForSearchedResults(searchedValue) {
        browser.waitUntil(() => this.searchBar.getAttribute('value') == searchedValue);
        browser.pause(1000);
    }

    selectMultiselectOptions(options) {
        let multiselectLabel = this.getElementLabel(this.tagsMultiselect);

        let choosenElements = [];
        options.forEach((option) => {
            choosenElements.push($(`//div[text() = '${option}']`));
        });

        choosenElements.forEach((element) => {
            element.click();
        });

        this.tagsMultiselect.click();
        this.doneFilterBtn.waitForExist();
        this.doneFilterBtn.click();

        AllureReporter.addStep(`Option ${options} selected in ${multiselectLabel} `);
    }

    AreTagsFoundInChats(tagOptions) {
        let chatsDisplayedAfterFiltering = $$(`//div[@data-testid = 'list-container']/descendant::ul/li`);


        chatsDisplayedAfterFiltering.forEach((chat) => {
            let allResultsTagsInChat = chat.$$(`//li[contains(@id, 'archive-item')]/div/div/span`);

            if (tagOptions.includes('Not tagged')) {
                if (allResultsTagsInChat.length === 0) {
                    return true;
                }
            } else {
                let chatContainsChoosenTag = allResultsTagsInChat.some((tag) => tagOptions.includes(tag.getText()));

                if (!chatContainsChoosenTag)
                    throw new Error('Chat does not include choosen tags');
            }
        })
        return true;
    }
}

export default new ArchivesPage();
