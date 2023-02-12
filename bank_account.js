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
}

module.exports = {
    Transaction,
    BankAccount
};