import { test, expect } from '@playwright/test';
const HomePage = require('../pages/HomePage.js');
const IssuePage = require('../pages/IssuePage.js');

const bugTitle = "My bug";

test('Create bug report', async ({ page }) => {

  const homePage = new HomePage(page);
  const issuePage = new IssuePage(page);

  await homePage.navigate();
  await homePage.clickOnCreateIssue();
  await issuePage.clickOnIssueTypeDropdown();
  await issuePage.selectIssueTypeOrPriority("Bug");
  await issuePage.clickOnIssuePriorityDropdown();
  await issuePage.selectIssueTypeOrPriority("Medium");
  await issuePage.fillSumary(bugTitle);
  await issuePage.fillDescription("Bug description");
  await issuePage.clickOnCreateIssueButton();
  await expect(homePage.getTicketOnBoard(bugTitle)).toBeVisible();
});

test('Delete ticket', async ({ page }) => {

  const homePage = new HomePage(page);
  const issuePage = new IssuePage(page);

  await homePage.navigate();
  await homePage.clickOnCreateIssue();
  await issuePage.clickOnIssueTypeDropdown();
  await issuePage.selectIssueTypeOrPriority("Bug");
  await issuePage.clickOnIssuePriorityDropdown();
  await issuePage.selectIssueTypeOrPriority("Medium");
  await issuePage.fillSumary(bugTitle);
  await issuePage.fillDescription("Bug description");
  await issuePage.clickOnCreateIssueButton();
  await expect(homePage.getTicketOnBoard(bugTitle)).toBeVisible();
  await homePage.clickOnTicketOnBoard(bugTitle);
  await issuePage.clickOnDeleteTicketIcon();
  await issuePage.clickOnDeleteButtonInDeleteModal();
  await expect(homePage.getTicketOnBoard(bugTitle)).not.toBeVisible();
});

test('Check issue type dropdown items', async ({ page }) => {

  const homePage = new HomePage(page);
  const issuePage = new IssuePage(page);
  const expectedDropdownItems = ['BUG', 'STORY', 'TASK'];

  await homePage.navigate();
  await homePage.clickOnCreateIssue();
  await issuePage.clickOnIssueTypeDropdown();
  const dropdownItems = await issuePage.getTextOfDropdownItems();
  expect(dropdownItems).toEqual(expectedDropdownItems); 
});

test('Add comment to bug report', async ({ page }) => {

  const homePage = new HomePage(page);
  const issuePage = new IssuePage(page);
  const comment = "My comment";

  await homePage.navigate();
  await homePage.clickOnCreateIssue();
  await issuePage.clickOnIssueTypeDropdown();
  await issuePage.selectIssueTypeOrPriority("Bug");
  await issuePage.clickOnIssuePriorityDropdown();
  await issuePage.selectIssueTypeOrPriority("Medium");
  await issuePage.fillSumary(bugTitle);
  await issuePage.fillDescription("Bug description");
  await issuePage.clickOnCreateIssueButton();
  await expect(homePage.getTicketOnBoard(bugTitle)).toBeVisible();
  await homePage.clickOnTicketOnBoard(bugTitle);
  await issuePage.addComment(comment);
  await issuePage.saveComment();
  await expect(issuePage.getAddedComment(comment)).toBeVisible();
});

test('Update task title', async ({ page }) => {

  const homePage = new HomePage(page);
  const issuePage = new IssuePage(page);
  const taskTitle = "My task";
  const updatedTaskTitle = "Updated task title";

  await homePage.navigate();
  await homePage.clickOnCreateIssue();
  await issuePage.clickOnIssueTypeDropdown();
  await issuePage.selectIssueTypeOrPriority("Task");
  await issuePage.clickOnIssuePriorityDropdown();
  await issuePage.selectIssueTypeOrPriority("Medium");
  await issuePage.fillSumary(taskTitle);
  await issuePage.fillDescription("Task description");
  await issuePage.clickOnCreateIssueButton();
  await expect(homePage.getTicketOnBoard(taskTitle)).toBeVisible();
  await homePage.clickOnTicketOnBoard(taskTitle);
  await issuePage.updateTitle(updatedTaskTitle);
  await issuePage.clickOnCloseButton();
  await expect(homePage.getTicketOnBoard(taskTitle)).not.toBeVisible();
  await expect(homePage.getTicketOnBoard(updatedTaskTitle)).toBeVisible();
});

