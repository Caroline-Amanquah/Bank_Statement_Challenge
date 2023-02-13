const Transaction = require('./bank_account').Transaction;
const BankAccount = require('./bank_account').BankAccount;

describe("Transaction class", () => {
    it("should display the date", () => {
        const date = '10-01-2023';
        const transaction = new Transaction(date, 100, 100);
        expect(transaction.date).toBe(date);
    });
    it("should display the amount", () => {
        const amount = 100;
        const transaction = new Transaction("10-01-2023", amount, 100);
        expect(transaction.amount).toBe(amount);
    });
    it("should display the balance", () => {
        const balance = 100;
        const transaction = new Transaction("10-01-2023", 100, balance);
        expect(transaction.balance).toBe(balance);
    });
});

describe("BankAccount class", () => {
    let account;
  
    beforeEach(() => {
      account = new BankAccount();
    });
  
    it("should display a transactions", () => {
      expect(account.transactions).toEqual([]);
    });
    it("should deposit a given amount to the account", () => {
        account.deposit(1000, "10-01-2023");
        expect(account.transactions).toHaveLength(1);
        expect(account.transactions[0].amount).toBe(1000);
    });
    it("should withdraw a given amount from the account", () => {
        account.deposit(1000, "10-01-2023");
        account.withdrawal(500, "14-01-2023");
        expect(account.transactions).toHaveLength(2);
        expect(account.transactions[1].amount).toBe(-500);
    });
});

describe("BankAccount integration tests", () => {
    let account;
      
    beforeEach(() => {
        account = new BankAccount();
    });
    it("displays the date, credit, debit and balance of the account on a statement", () => {

        account.deposit(1000, "10-01-2023");
        account.deposit(2000, "13-01-2023");
        account.withdrawal(500, "14-01-2023");

        const statementSpy = jest.spyOn(console, "log").mockImplementation();
    
        account.statement();
    
        expect(statementSpy).toHaveBeenCalledWith("date || credit || debit || balance");
        expect(statementSpy).toHaveBeenCalledWith("14-01-2023 ||  || 500.00 || 2500.00");
        expect(statementSpy).toHaveBeenCalledWith("13-01-2023 || 2000.00 ||  || 3000.00");
        expect(statementSpy).toHaveBeenCalledWith("10-01-2023 || 1000.00 ||  || 1000.00");
    
        statementSpy.mockRestore();
    });
    it('should deposit a given amount to the account and update the balance', () => {
        account.deposit(1000, '10-01-2023');
        expect(account.transactions[0].balance).toBe(1000);
        account.deposit(2000, '11-01-2023');
        expect(account.transactions[1].balance).toBe(3000);
    });
    it('should withdraw a given amount from the account and update the balance', () => {
        account.deposit(1000, '10-01-2023');
        account.withdrawal(500, '11-01-2023');
        expect(account.transactions[1].balance).toBe(500);
    });
});

describe("BankAccount Edge Case Tests", () => {
    let account;
  
    beforeEach(() => {
      account = new BankAccount();
    });
  
    it("Bank account user should be informed when no money has been deposited into the account after attempt", () => {
      expect(() => account.deposit(-100, "11-01-2023")).toThrowError("Deposit in bank account has not been made");
    });
    it("Bank account user should be informed when no money has been withdrawn from account after attempt", () => {
        expect(() => account.withdrawal(-100, "12-01-2023")).toThrowError("Withdrawal from bank account has not been made");
    });
    it("Should not allow withdrawal of an amount greater than the current balance", () => {
        expect(() => account.withdrawal(3000, "15-01-2023")).toThrowError(
          "Amount greater than the current balance"
        );
    });
    it("Should display 'No transactions' when there are no transactions", () => {
        const account = new BankAccount();
        console.log = jest.fn();
        account.statement();
        expect(console.log).toHaveBeenCalledWith("No transactions");
      });
});