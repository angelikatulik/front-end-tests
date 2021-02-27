import LoginPage from '../pageobjects/login.page.js';
import MenuPage from '../pageobjects/menu.page.js';
import ArchivesPage from '../pageobjects/archives.page.js';
import { assert } from 'chai';

suite('Search bar tests', () => {
    suiteSetup(() => {
        LoginPage.login();
    });
    test('archives chats can be opened', () => {
        MenuPage._clickElement(MenuPage.archivesTab);

        expect(ArchivesPage.archivesHeader).toExist();
    });
    test('provided value can be found', () => {
        let searchedValue = 'LiveChat';

        ArchivesPage.searchBar.waitForEnabled();
        ArchivesPage._clickElement(ArchivesPage.searchBar)
        ArchivesPage._typeInInput(ArchivesPage.searchBar, searchedValue);
        ArchivesPage.waitForSearchedResults(searchedValue);

        let isSearchedValueFound = ArchivesPage.isSearchedValueFoundInChats(searchedValue);
        assert(isSearchedValueFound, 'Chats do not contain provided value');
    });
    test('provided value can be found in some chats', () => {
        let searchedValue = 'help';

        ArchivesPage.searchBar.waitForEnabled();
        ArchivesPage._clickElement(ArchivesPage.searchBar)
        ArchivesPage._typeInInput(ArchivesPage.searchBar, searchedValue);
        ArchivesPage.waitForSearchedResults(searchedValue);

        let isSearchedValueFound = ArchivesPage.isSearchedValueFoundInChats(searchedValue);
        assert(isSearchedValueFound, 'Chats do not contain provided value');
    });
    test('provided value can not be found', () => {
        let searchedValue = 'automationtest';

        ArchivesPage.searchBar.waitForEnabled();
        ArchivesPage._clickElement(ArchivesPage.searchBar)
        ArchivesPage._typeInInput(ArchivesPage.searchBar, searchedValue);
        ArchivesPage.waitForSearchedResults(searchedValue);

        let isSearchedValueNotFound = ArchivesPage.isSearchedValueFoundInChats(searchedValue);
        assert(isSearchedValueNotFound, 'Chats contain provided value');
        expect(ArchivesPage.noResultsFoundImg).toExist();
        expect(ArchivesPage.noResultsFoundMessage).toExist();
    });
    test('provided value with polish sign can not be found', () => {
        let searchedValue = 'LivęChąt';

        ArchivesPage.searchBar.waitForEnabled();
        ArchivesPage._clickElement(ArchivesPage.searchBar)
        ArchivesPage._typeInInput(ArchivesPage.searchBar, searchedValue);
        ArchivesPage.waitForSearchedResults(searchedValue);

        let isSearchedValueNotFound = ArchivesPage.isSearchedValueFoundInChats(searchedValue);
        assert(isSearchedValueNotFound, 'Chats contain provided value');
        expect(ArchivesPage.noResultsFoundImg).toExist();
        expect(ArchivesPage.noResultsFoundMessage).toExist();
    });
    test('provided punctuation mark can not be found', () => {
        let searchedValue = '?';

        ArchivesPage.searchBar.waitForEnabled();
        ArchivesPage._clickElement(ArchivesPage.searchBar)
        ArchivesPage._typeInInput(ArchivesPage.searchBar, searchedValue);
        ArchivesPage.waitForSearchedResults(searchedValue);

        let isSearchedValueNotFound = ArchivesPage.isSearchedValueFoundInChats(searchedValue);
        assert(isSearchedValueNotFound, 'Chats contain provided value');
        expect(ArchivesPage.noResultsFoundImg).toExist();
        expect(ArchivesPage.noResultsFoundMessage).toExist();
    });
})
