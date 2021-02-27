import LoginPage from '../pageobjects/login.page.js';
import MenuPage from '../pageobjects/menu.page.js';
import ArchivesPage from '../pageobjects/archives.page.js';
import { assert } from 'chai';

suite('Filters tests', () => {
    suiteSetup(() => {
        LoginPage.login();
    });
    test('archives chats can be opened', () => {
        MenuPage._clickElement(MenuPage.archivesTab);

        expect(ArchivesPage.archivesHeader).toExist();
    });
    test('chats can be filtered by one tag', () => {
        let filter = 'Tag';
        let tagOption = ['complaint'];

        ArchivesPage.addFilterDropdown.waitForExist();
        ArchivesPage._selectDropdownOption(ArchivesPage.addFilterDropdown, filter);
        ArchivesPage.selectMultiselectOptions(tagOption);

        let isTagFoundInChats = ArchivesPage.AreTagsFoundInChats(tagOption);
        assert(isTagFoundInChats, 'Chats do not contain selected tag');
    });
    test('chats can be filtered by multiple tags', () => {
        let filter = 'Tag';
        let tagOptions = ['complaint', 'spam'];

        ArchivesPage._clickElement(ArchivesPage.removeFiltersBtn, true);

        ArchivesPage.addFilterDropdown.waitForExist();
        ArchivesPage._selectDropdownOption(ArchivesPage.addFilterDropdown, filter);
        ArchivesPage.selectMultiselectOptions(tagOptions);

        let areTagsFoundInChats = ArchivesPage.AreTagsFoundInChats(tagOptions);
        assert(areTagsFoundInChats, 'Chats do not contain selected tags');
    });
    test('chats can be filtered by all Tags', () => {
        let filter = 'Tag';
        let tagOption = ['complaint', 'spam', 'sales', 'support', 'positive feedback'];

        ArchivesPage._clickElement(ArchivesPage.removeFiltersBtn, true);

        ArchivesPage.addFilterDropdown.waitForExist();
        ArchivesPage._selectDropdownOption(ArchivesPage.addFilterDropdown, filter);
        ArchivesPage.selectMultiselectOptions(tagOption);

        let areTagsFoundInChats = ArchivesPage.AreTagsFoundInChats(tagOption);
        assert(areTagsFoundInChats, 'Chats do not contain selected tags');
    });
    test('chats can be filtered by  "Not tagged"', () => {
        let filter = 'Tag';
        let tagOption = ['Not tagged'];

        ArchivesPage._clickElement(ArchivesPage.removeFiltersBtn, true);

        ArchivesPage.addFilterDropdown.waitForExist();
        ArchivesPage._selectDropdownOption(ArchivesPage.addFilterDropdown, filter);
        ArchivesPage.selectMultiselectOptions(tagOption);

        let isTagFoundInChats = ArchivesPage.AreTagsFoundInChats(tagOption);
        assert(isTagFoundInChats, 'All chats are tagged');
    })
})