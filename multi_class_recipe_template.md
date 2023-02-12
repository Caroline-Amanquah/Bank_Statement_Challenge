# Bank Tech Test Multi-Class Design Recipe


## 1. Design the Class System

_Consider diagramming out the classes and their relationships. Take care to
focus on the details you see as important, not everything. The diagram below
uses asciiflow.com but you could also use excalidraw.com, draw.io, or miro.com_

```
┌────────────────────────────┐
│ Transaction                |
|constructor(date, amount,   |
|  balance)                  |
│                            │
│                            │
│                            │
│                            │
│                            │
└───────────┬────────────────┘
            │
            │ makes transaction 
            ▼
┌─────────────────────────┐
│ BankAccount             │
│                         │
│ - deposit(amount,date)  │
│ - withdrawal(amount,    |
| date)                   │
│ -statement(no arguments)│
│                         │
└─────────────────────────┘
```

_Also design the interface of each class in more detail._

```javascript
class Transaction {
    constructor(date, amount, balance) {
    # each Transaction will have its own date, amount, and balance. 
    # the amount and balance will have a float data type and the date will use the Date() constructor which returns a string representation of the date and time.
    }
}

class BankAccount {
   constructor() {
        this.transactions = [];
        # empty array named transactions used to store the transactions that occur in the bank account
   } 

   deposit(amount, date) {
   # deposit method accepts two parameters: the amount of the deposit, and the date of the deposit.
   # calculates the balance of the account after the deposit.
   }


   withdrawal(amount, date) {
   # withdrawal method accepts two parameters: the amount of the withdrawal, and the date of the withdrawal.
   # calculates the balance of the account after the withdrawal.
   }


   statement() {
   # statement method generates a statement of the account's transactions, including the date of the transaction, the credit and  debit amount, and the account balance after the transaction.
   }
}
```

## 3. Create Examples as Integration Tests

_Create examples of the classes being used together in different situations and
combinations that reflect the ways in which the system will be used._

```javascript
describe('BankAccount integration tests', () => {
    let account;

    beforeEach(() => {
        account = new BankAccount();
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
```

## 4. Create Examples as Unit Tests

_Create examples, where appropriate, of the behaviour of each relevant class._

```javascript
describe('Transaction', () => {
    it('should display the date', () => {
        const date = '10-01-2023';
        const transaction = new Transaction(date, 100, 100);
        expect(transaction.date).toBe(date);
    });

    it('should display the amount', () => {
        const amount = 100;
        const transaction = new Transaction('10-01-2023', amount, 100);
        expect(transaction.amount).toBe(amount);
    });

    it('should display the balance', () => {
        const balance = 100;
        const transaction = new Transaction('10-01-2023', 100, balance);
        expect(transaction.balance).toBe(balance);
    });
});

describe('BankAccount', () => {
    let account;

    beforeEach(() => {
        account = new BankAccount();
    });

    it('should display a transactions', () => {
        expect(account.transactions).toEqual([]);
    });

    it('should deposit a given amount to the account', () => {
        account.deposit(1000, '10-01-2023');
        expect(account.transactions).toHaveLength(1);
        expect(account.transactions[0].amount).toBe(1000);
    });

    it('should withdraw a given amount from the account', () => {
        account.deposit(1000, '10-01-2023');
        account.withdrawal(500, '11-01-2023');
        expect(account.transactions).toHaveLength(2);
        expect(account.transactions[1].amount).toBe(-500);
    });
});
```

## 5. Create Examples as Edge Case Tests
```javascript
describe('BankAccount error handling tests', () => {
    let account;
  
    beforeEach(() => {
      account = new BankAccount();
    });
  

    it("Should not allow deposit of negative amount", () => {
        expect(() => account.deposit(-100, "11-01-2023")).toThrowError("Deposit in bank account has not been made");
    });

    it("Should not allow withdrawal of negative amount", () => {
        expect(() => account.withdrawal(-100, "12-01-2023")).toThrowError("Withdrawal from bank account has not been made");
    });

    it("Should not allow withdrawal of an amount greater than the current balance", () => {
        expect(() => account.withdrawal(3000, "15-01-2023")).toThrowError("Amount greater than the current balance");
    });

    it("Should display 'No transactions' when there are no transactions", () => {
        const account = new BankAccount();
        console.log = jest.fn();
        account.statement();
        expect(console.log).toHaveBeenCalledWith("No transactions");
    });
});
```

## 6. Implement the Behaviour

_After each test you write, follow the test-driving process of red, green,
refactor to implement the behaviour._


