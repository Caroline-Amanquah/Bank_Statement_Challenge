const Transaction = require('./bank_account').Transaction;
const BankAccount = require('./bank_account').BankAccount;

describe("Transaction", () => {
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

describe("BankAccount", () => {
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
        account.withdrawal(500, "11-01-2023");
        expect(account.transactions).toHaveLength(2);
        expect(account.transactions[1].amount).toBe(-500);
    });
});
