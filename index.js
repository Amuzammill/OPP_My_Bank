import inquirer from "inquirer";
class BankAccount {
    accountnumber;
    balance;
    constructor(accountnumber, balance) {
        this.accountnumber = accountnumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of ${amount} successfully.remaining balance:$ ${this.balance}`);
        }
        else {
            console.log("insufficient balance");
        }
    }
    deposite(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. remaining balnce${this.balance}`);
    }
    checkbalance() {
        console.log(`current balance :$${this.balance}`);
    }
}
class customer {
    firstname;
    lastname;
    gender;
    age;
    mobilenumber;
    account;
    constructor(firstname, lastname, gender, age, mobilenumber, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.mobilenumber = mobilenumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
const customers = [
    new customer("Muzamil", "Ahmed", "male", 23, 3124567890, accounts[0]),
    new customer("hamza", "khan", "male", 35, 3124563232, accounts[1]),
    new customer("hafeez", "khan", "male", 25, 3128917057, accounts[2])
];
async function service() {
    do {
        const accountnumberinput = await inquirer.prompt({
            name: "accountnumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(cust => cust.account.accountnumber === accountnumberinput.accountnumber);
        if (customer) {
            console.log(`welcome,${customer.firstname} ${customer.lastname} !\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "withdraw", "checkbalance", "exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Deposit"
                    });
                    customer.account.deposite(depositamount.amount);
                    break;
                case "withdraw":
                    const withdrawamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw"
                    });
                    customer.account.withdraw(withdrawamount.amount);
                    break;
                case "checkbalance":
                    customer.account.checkbalance();
                    break;
                case "exit":
                    console.log("Exiting Bank Program...");
                    console.log("\n Thank you for using our bank services.Have a great day!");
                    return;
            }
        }
        else {
            console.log("invalid account number.Please try again.");
        }
    } while (true);
}
service();
