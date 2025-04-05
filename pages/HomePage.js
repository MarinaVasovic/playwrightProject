class HomePage {
    constructor(page) {
      this.page = page;
      this.createIssue = 'xpath=//i[contains(@class,"anticon-plus")]';
      this.ticketTitle= 'xpath=//div[@class="issue"]/p[contains(text(), "${titcketTitle}")]';
    }
  
    async navigate() {
      await this.page.goto('https://jira.trungk18.com/project/board');
    }

    async clickOnCreateIssue() {
      await this.page.click(this.createIssue);
    }

    getTicketOnBoard(ticketTitle) {
     const locatorString = this.ticketTitle.replace('${titcketTitle}', ticketTitle);
       return this.page.locator(locatorString);
    }

    async clickOnTicketOnBoard(ticketTitle) {
        await this.getTicketOnBoard(ticketTitle).click();
    }
  }
  
  module.exports = HomePage;