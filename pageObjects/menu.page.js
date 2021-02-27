import AllureReporter from '@wdio/allure-reporter';
import BasePage from '../pageobjects/base.page.js';

class MenuPage extends BasePage {

    get headerAvatar() { return $(`div[data-test = 'user-avatar'][size = '3']`) }
    get headerTitle() { return $(`//h1[contains(text(), 'AgentTestowy')]`) }

    get chatsTab() { return $(`a[href = '/chats']`) }
    get trafficTab() { return $(`a[href = '/traffic']`) }
    get archivesTab() { return $(`a[href = '/archives']`) }
    get ticketsTab() { return $(`a[href = '/tickets']`) }
    get agentsTab() { return $(`a[href = '/agents']`) }
    get reportesTab() { return $(`a[href = '/reportes']`) }
    get contactsTab() { return $(`a[href = '/contacts']`) }
    get marketplaceTab() { return $(`a[href = '/marketplace']`) }
    get subscribeTab() { return $(`a[href = '/subscription']`) }
    get settingsTab() { return $(`a[href = '/settings']`) }
    get subscribeTab() { return $(`a[href = '/subscription']`) }

}
export default new MenuPage();
