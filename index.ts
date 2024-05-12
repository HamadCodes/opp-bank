#! /usr/bin/env node

import inquirer from "inquirer"

class bankAccount{
    firstName:string
    lastName:string
    pin:number
    gender:string
    age:number
    mobileNumber:number
    balance:number=0

    constructor(firstName:string,lastName:string,pin:number,gender:string,age:number,mobileNumber:number){
        this.firstName=firstName
        this.lastName=lastName
        this.pin=pin
        this.gender=gender
        this.age=age
        this.mobileNumber=mobileNumber
    }

    showAccountDetails(){
        console.log(`Full Name: ${this.firstName} ${this.lastName}`);
        console.log(`Balance: ${this.balance}`);
        console.log(`Gender: ${this.gender}`);
        console.log(`Mobile Number: ${this.mobileNumber}`);
    }

    depositBalance(value:number){
        this.balance += value
        console.log(`${value} Deposited successfull.`);
        console.log(`Your balance is now ${this.balance}`);
        
    }

    withdrawBalance(value:number){
        this.balance -= value
        console.log(`${value} has been successfully withdrawn,`);
        console.log(`Your balance is now ${this.balance}`);
        
    }
}

let accounts:bankAccount[] = []
let isRunning = true

async function addAccount(){
    const {firstName} = await inquirer.prompt(
        {
        message:"Enter Firstname",
        name:"firstName",
        type:"input"
        })

        const {lastName} = await inquirer.prompt({
        message:"Enter Lastname",
        name:"lastName",
        type:"input"
        })

        const {gender} = await inquirer.prompt({
        message:"Gender",
        name:"gender",
        type:"list",
        choices:["Male","Female"]
        })
        
        let pin
        let pinRunning:boolean = true
        while(pinRunning){
        const {blockpin} = await inquirer.prompt({
        message:"Set a PIN Code",
        name:"blockpin",
        type:"number",
        })
        if(Number.isNaN(blockpin) || blockpin>9999 || blockpin<1000){
            console.log("PIN Code must be 4 Numbers");
            
        }else{
            pin = blockpin
            pinRunning = false
        }
        }
        
        let age
        let ageRunning:boolean = true
        while(ageRunning){
        const {blockage} = await inquirer.prompt({
        message:"What is your age",
        name:"blockage",
        type:"number",
        })
        if(Number.isNaN(blockage) || blockage<18){
            console.log("Age must be atleast 18");
            
        }else{
            age = blockage
            ageRunning = false
        }
        }

        let mobileNumber
        let numberRunning:boolean = true
        while(numberRunning){
        const {blockmobileNumber} = await inquirer.prompt({
        message:"What is your mobile number?",
        name:"blockmobileNumber",
        type:"number",
        })
        if(Number.isNaN(blockmobileNumber)){
            console.log("Age must be atleast 18");
            
        }else{
            mobileNumber = blockmobileNumber
            numberRunning = false
        }
        }

        let bankaccount = new bankAccount(firstName.trim(),lastName.trim(),pin,gender,age,mobileNumber)
        accounts.push(bankaccount)
        console.log(`${firstName} ${lastName}'s Account has been registered`);
        

}

async function withdraw(){
    const {enteredPin} = await inquirer.prompt(
        {
            message:"Enter your pin",
            name: "enteredPin",
            type: "number"
        }
    )

    let account = accounts.find(account => account.pin === enteredPin)
    if(account && account.balance<=0){
        console.log("Insufficient balance, Your balance is zero.");
        
    }
    else if(account){
        let withdrawRunning = true
        while(withdrawRunning){
        console.log(`Your account balance is ${account.balance}`);
        const {amount} = await inquirer.prompt({message:"Enter ammount to withdraw",name:"amount",type:"number"})
        if(amount<=account.balance){
        withdrawRunning=false
        account.withdrawBalance(amount)
        }else{console.log("Insufficient balance, Please enter a valid amount");
        }
        }
    }else{
        console.log("Invalid PIN Code");
    }
}

async function deposit(){
    const {enteredPin} = await inquirer.prompt(
        {
            message:"Enter your pin",
            name: "enteredPin",
            type: "number"
        }
    )

    let account = accounts.find(account => account.pin === enteredPin)
    if(account){
        console.log(`Your account balance is ${account.balance}`);
        const {amount} = await inquirer.prompt({message:"Enter ammount to withdraw",name:"amount",type:"number"})
        account.depositBalance(amount)
    }else{
        console.log("Invalid PIN Code");
    }
}

async function viewAccountDetails(){
    const {enteredPin} = await inquirer.prompt(
        {
            message:"Enter your pin",
            name: "enteredPin",
            type: "number"
        }
    )

    let account = accounts.find(account => account.pin === enteredPin)
    if(account){
        account.showAccountDetails()
    }else{
        console.log("Invalid PIN Code");
    }
}

while(isRunning){
let {options} = await inquirer.prompt({
    message:"What would you like to do?",
    type:"list",
    name:"options",
    choices:["Withdraw","Deposit","View Account Details","Add Account","Exit"]
})

switch(options){
    case "Add Account":
        await addAccount()
        break;
    case "Withdraw":
        await withdraw()
        break;
    case "Deposit":
        await deposit()
        break;
    case "View Account Details":
        await viewAccountDetails()
        break;
    case "Exit":
        isRunning=false
        break;
    default:
        console.log("Invalid");
        break;
}
}