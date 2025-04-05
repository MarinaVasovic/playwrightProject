class IssuePage {
    constructor(page) {
      this.page = page;
      this.createIssuePlusIcon = 'xpath=//i[contains(@class,"anticon-plus")]';
      this.issueTypeDropdown = 'xpath=//div[contains(@class,"form-group")]//issue-type-select';
      this.issuePriorityDropdown = 'xpath=//div[contains(@class,"form-group")]//issue-priority-select';
      this.shortSummary = 'xpath=//div[contains(@class,"form-group")]//input[contains(@class,"form-input")]';
      this.description = 'xpath=//div[contains(@class,"form-group")]//quill-editor[contains(@class,"content-editor")]//div[contains(@class,"ql-container")]//div[@contenteditable="true"]';
      this.descriptionInput = 'xpath=//div[contains(@class,"form-group")]//quill-editor[contains(@class,"content-editor")]//div[contains(@class,"ql-container")]//input';
      this.createIssueButton = 'form .btn-primary';
      this.issueTypeAndPriorityOption= 'xpath=//div[contains(@class,"ant-select")]//span[contains(text(), "${optionText}")]';
      this.deleteButton= 'xpath=(//issue-modal//button[contains(@class,"icon-only")])[1]';
      this.closeButton= 'xpath=(//issue-modal//button[contains(@class,"icon-only")])[3]';
      this.deleteModalButton= 'xpath=//issue-delete-modal//button[contains(@class,"btn-primary")]';  
      this.dropdownItems= 'xpath=//div[contains(@class,"ant-select")]';   
      this.commentsField= 'xpath=//issue-comments//textarea';        
      this.saveCommentButton= 'xpath=//issue-comments//button[contains(@class,"btn-primary")]';  
      this.addedComment= 'xpath=//issue-comment//div[text()="${commentText}"]';        
      this.issueTitle= 'xpath=//issue-title//textarea';        
    }
  
    async navigate() {
      await this.page.goto('https://jira.trungk18.com/project/board');
    }

    async clickOnCreateIssuePlusIcon() {
      await this.page.click(this.createIssuePlusIcon);
    }

    async fillDescription(descriptionText ) {
      await this.page.click(this.description);
      await this.page.keyboard.type(descriptionText); 
    }

    async fillSumary(sumaryText ) {
      await this.page.fill(this.shortSummary, sumaryText);
    }

    async addComment(commentText) {
      await this.page.fill(this.commentsField, commentText);
      await this.page.click(this.commentsField);
    }

    async saveComment() {
      await this.page.click(this.saveCommentButton);
    }

    async updateTitle(title) {
      await this.page.fill(this.issueTitle, title);
    }

    async clickOnCreateIssueButton() {
      await this.page.locator(this.createIssueButton).click();
    }

    async clickOnCloseButton() {
      await this.page.locator(this.closeButton).click();
    }

    async clickOnIssueTypeDropdown() {
      await this.page.click(this.issueTypeDropdown);
    }
    async clickOnIssuePriorityDropdown() {
      await this.page.click(this.issuePriorityDropdown);
    }

    async selectIssueTypeOrPriority(optionText) {
      const finalXPath = this.issueTypeAndPriorityOption.replace('${optionText}', optionText);
      await this.page.click(finalXPath);
    }

    getAddedComment(commentText) {
      const locatorString = this.addedComment.replace('${commentText}', commentText);
        return this.page.locator(locatorString);
     }

    async clickOnDeleteButtonInDeleteModal() {
      await this.page.click(this.deleteModalButton);
    }

    async clickOnDeleteTicketIcon() {
      await this.page.click(this.deleteButton);
    }

    getDropdownItems() {
        return this.page.locator(this.dropdownItems);
    }

    async getTextOfDropdownItems() {
      return await this.getDropdownItems().allInnerTexts();
    }
  }
  
  module.exports = IssuePage;