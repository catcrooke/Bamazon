var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // your password
    password: "MySq12D4y!",
    database: "bamazon"
});

connectdb().then(function() {
    // once the connection is finished, run showdb function which displays all of the items for sale
    showdb();
}).then(function() {
    // then run the userchoice function to prompt the user to give the id and quantity of item they want 
    return userchoice();
});

function showdb() {
    return new Promise(function(success, failure) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
                throw err;
            } else {
                console.log(res);
            }
        });
    });
}

// function to connect to the database
function connectdb() {
    return new Promise(function(success, failure) {
        connection.connect(function(err) {
            if (err) failure(err);
            console.log("connected as id " + connection.threadId);
            success();
        });
    });
}

// function to prompt the user to choose what they want from bamazon
function userchoice() {
    return inquirer.prompt([
        // prompt the user with 2 messages. 1-ask them the id of the item they want, 
        {
            type: "input",
            message: "What is the id of the item that you want?",
            name: "item_id"
        },

        // 2 - ask# units of the product they want

        {
            type: "input",
            message: "How many units of the item do you want?",
            name: "stock_quantity"
        }
    ]);
}



// if there's not enough in stock, the app needs to log a phrase like 'insufficient quantity!'
