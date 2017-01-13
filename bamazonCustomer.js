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

connectdb()
    .then(function() {
        // once the connection is finished, run showdb function which displays all of the items for sale
        return showdb();
    })
    .then(function(res) {
        // then run the userchoice function to prompt the user to give the id and quantity of item they want 
        return userchoice(res);
        // inquirer response values
    }).then(function(res) {
        // then run the checkstock function to check if the amount of the item the user wants is available
        return checkstock(res);
    }).then(function(res) {});
//     .then(function(res) {
// // return
// //     });

function showdb() {
    // console.log("inside showdb");
    return new Promise(function(success, failure) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
                failure(err);
            } else {
                console.log(res);
                success(res);
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
function userchoice(res) {
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

// 
function queryDB(querystring, queryobject) {
    return new Promise(function(success, failure) {
        connection.query(querystring, queryobject, function(err, res) {
            if (err) {
                failure(err);
            } else {
                success(res);
            }
        });
    });
}


// if there's not enough in stock, the app needs to log a phrase like 'insufficient quantity!'
function checkstock(userResponse) {
    return queryDB("SELECT product_name, stock_quantity FROM products where item_id = ?", [+userResponse.item_id])
        .then(function(databaseResponse) {
            if (+userResponse.stock_quantity <= databaseResponse[0].stock_quantity) {
                console.log("You got it dude- a fashion industry!");
                updatestock(databaseResponse[0].stock_quantity - +userResponse.stock_quantity, +userResponse.item_id);
            } else {
                console.log("Insufficient Quantity!");
            }
        });
}

function updatestock(updated_quantity, item_id) {
    return queryDB("UPDATE products SET stock_quantity=? WHERE item_id=?", [updated_quantity, item_id]);

    // update statement in mySQL, SET ? Where ?
    //     what you want to set and where to set it
}

function customerPrice() {
    // dataResponse[0].stock_quantity * price = display in console.log
    // 2 fixed (mySQL) to get 2 decimal places return for price to customer
}
