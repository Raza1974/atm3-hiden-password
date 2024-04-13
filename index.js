#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const myAccount = {
    balance: 50000,
    pin: 98786
};
async function main() {
    try {
        const pinAnswer = await inquirer.prompt({
            name: "pincode",
            type: "password", // Masking PIN input
            message: "Enter your PIN:"
        });
        if (parseInt(pinAnswer.pincode) === myAccount.pin) {
            console.log(chalk.bold.yellowBright("Welcome to your account!"));
            const actionAnswer = await inquirer.prompt({
                name: "action",
                message: chalk.bold.greenBright("Please choose an option:"),
                type: "list",
                choices: ["Check Balance", "Withdraw", "Fast Cash", "Deposit"]
            });
            switch (actionAnswer.action) {
                case "Check Balance":
                    console.log(chalk.yellow(`Your current balance is: ${myAccount.balance}`));
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.greenBright("How much would you like to withdraw?")
                    });
                    if (isNaN(withdrawAmount.amount) || withdrawAmount.amount <= 0) {
                        console.log(chalk.red("Invalid amount!"));
                    }
                    else if (withdrawAmount.amount > myAccount.balance) {
                        console.log(chalk.red("Insufficient funds!"));
                    }
                    else {
                        myAccount.balance -= withdrawAmount.amount;
                        console.log(chalk.blueBright(`Your remaining balance is: ${myAccount.balance}`));
                    }
                    break;
                case "Fast Cash":
                    const cashAmount = await inquirer.prompt({
                        name: "cash",
                        type: "list",
                        message: "Choose your withdrawal amount:",
                        choices: ["1000", "2000", "5000", "10000"].map(amount => ({
                            name: `$${amount}`,
                            value: parseInt(amount)
                        }))
                    });
                    if (cashAmount.cash > myAccount.balance) {
                        console.log(chalk.red("Insufficient funds!"));
                    }
                    else {
                        myAccount.balance -= cashAmount.cash;
                        console.log(chalk.blueBright(`Your remaining balance is: ${myAccount.balance}`));
                    }
                    break;
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.greenBright("How much would you like to deposit?")
                    });
                    if (isNaN(depositAmount.amount) || depositAmount.amount <= 0) {
                        console.log(chalk.red("Invalid amount!"));
                    }
                    else {
                        myAccount.balance += depositAmount.amount;
                        console.log(chalk.blueBright(`Your new balance is: ${myAccount.balance}`));
                    }
                    break;
            }
        }
        else {
            console.log(chalk.underline.red("Incorrect PIN! Please try again."));
        }
    }
    catch (error) {
        console.error(chalk.red("An error occurred: "), error);
    }
}
main();
