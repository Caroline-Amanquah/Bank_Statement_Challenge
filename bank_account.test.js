const Transaction = require('./bank_account').Transaction;
const BankAccount = require('./bank_account').BankAccount;

describe("Transaction", () => {
    it("should display the date", () => {
        const date = '10-01-2023';
        const transaction = new Transaction(date, 100, 100);
        expect(transaction.date).toBe(date);
    });
});