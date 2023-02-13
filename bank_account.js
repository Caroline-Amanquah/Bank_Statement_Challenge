class Transaction {
    constructor(date, amount, balance) {
        this.date = date;
        this.amount = amount;
        this.balance = balance;
    }
}

class BankAccount {
    constructor() {
        this.transactions = [];
    }
    deposit(amount, date) {
        if (amount < 0) {
            throw new Error("Deposit in bank account has not been made");
        }
        let balance = this.transactions.length > 0 ? this.transactions[this.transactions.length - 1].balance + amount : amount;
        this.transactions.push(new Transaction(date, amount, balance));
    }
    withdrawal(amount, date) {
        let balance = this.transactions[this.transactions.length - 1].balance - amount;
        this.transactions.push(new Transaction(date, -amount, balance));
    }
    statement() {
        console.log("date || credit || debit || balance");
        for (let i = this.transactions.length - 1; i >= 0; i--) {
            let credit = this.transactions[i].amount >= 0 ? this.transactions[i].amount.toFixed(2) : "";
            let debit = this.transactions[i].amount < 0 ? (-this.transactions[i].amount).toFixed(2) : "";
            let balance = this.transactions[i].balance.toFixed(2);
            console.log(`${this.transactions[i].date} || ${credit} || ${debit} || ${balance}`);
        }
    }

}

const account = new BankAccount();
account.deposit(1000, "10-01-2023");
account.deposit(2000, "13-01-2023");
account.withdrawal(500, "14-01-2023");
account.statement();

const date = new Date("10-01-2023");
const originalDate = Date;

module.exports = {
    Transaction,
    BankAccount
};
