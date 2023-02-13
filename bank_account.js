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
        let balance = this.transactions.length > 0 ? this.transactions[this.transactions.length - 1].balance + amount : amount;
        this.transactions.push(new Transaction(date, amount, balance));
    }
}

module.exports = {
    Transaction,
    BankAccount
};
