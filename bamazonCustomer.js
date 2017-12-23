var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var Table = require("cli-table");


//Initializes the connection to the MySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});

// Creates the connection with the server and displays the products with an established conneciton
connection.connect(function(err) {
    if (err) throw err;{
      console.log("connected as id " + connection.threadId + "\n");
  //connection.end();
  //afterConnection();
  //ItemList.prototype.printInfo();
        }
  printProducts();
    });

    //Displays the available products in Bamazon
    function printProducts() {

      var table = new Table ({
             head: ['Item ID', 'Product', 'Department', 'Price', 'Qty Available']
          });
       connection.query("SELECT * FROM products", function(err, res) {
         if (err) throw err;

           for (var i =0; i<res.length; i++) {
             table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity]);
           }

       console.log("BAMAZON ITEMS AVAILABLE FOR YOUR SELECTION!!! "+ "\n");
       console.log(table.toString());
       //console.table(res);
       askCustomerForItem(res);
     });
  }
      
 //prompts the user for item selection    
function askCustomerForItem(item) {

//prompt for user input
inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "\n"+"Please enter the Item# you would like to buy "+" [Quit with Q]"+"\n",
      validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
    },
  {
    name: "qty",
    type: "input",
    message: "Please enter the number of items you would like to buy"
  }
      ]).then(function(answers) {
        //console.log(aswers.item);
        queryItem();
      //function to display the selected list items
      function queryItem() {
   
    var query = connection.query("SELECT * FROM products WHERE item_id=?", [answers.item], function(err, res){
           
            if (err) throw err;
               for (var i =0; i < res.length; i++){
                  if (answers.qty > res[i].stock_quantity){ 
                     console.log("Sorry Insufficient quantity!");
                     askCustomerForItem();
                       } else {
                          var item = res[i].item_id;
                          var qty = answers.qty;
                          var product = res[i].product_name
                         //console.log(res);
                         console.log("\n" + "You have selected Item #: " + res[i].item_id + " | " + " Product: " + res[i].product_name + ", with a quantity of " + answers.qty + " items."+ "\n");
                         var total = answers.qty * res[i].price.toFixed(2);
                         var product = res[i].product_name;
                         var quantity = answers.qty;
                         var item = res[i].item_id;
                         console.log("Your purchase total :$ " + total+"\n");
                         promptCustomerForPurchase();

                         function promptCustomerForPurchase() {
                                inquirer
                                  .prompt([
                                    {
                                      type: "confirm",
                                      name: "purchase",
                                      message: "Would you like to purchase the selected items? [Purchase with Y, Choose another selection with N]",
                                      validate: function(val) {
                                        return val.item.toLowerCase();
                                      }
                                    }
                                  ])
                                  .then(function(val) {
                                    // Check if the user wants to quit the program
                                    //checkIfShouldExit(val.item);
                                    var purchase = val.purchase;
                                    
                                    // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
                                    if (!purchase ) {
                                      console.log("Please enter your new selection for purchase! "+"\n");
                                      askCustomerForItem(); 
                                    }
                                    else {
                                      // Otherwise run makePurchase, give it the product, quantity, and desired item to purchase
                                      makePurchase(product, quantity, item);
                                    }
                                  });
                                }
                         //makePurchase(product, quantity, item);
                              }
                        // console.log("\n" + "Item #: " +res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Depatment: " + 
                        //     res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + answers.qty);
                        // console.log("==============================================================================================================================="); 
                         }
                      })
                     }
                  })
               }
                  // Purchase the desired quanity of the desired item
                  function makePurchase(product, quantity, item) {
                    connection.query(
                      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                      [quantity, item],

                      function(err, res) {
                        // Let the user know the purchase was successful, re-run loadProducts
                        console.log("\n Thank you for your purchase you have successfully purchased " + quantity + ",  " + product + "'s!"+"\n");
                        printProducts();
                        
                      }
                    );
                  }

                  // Check to see if the product the user chose exists in the inventory
                  function checkInventory(choiceId, inventory) {
                    for (var i = 0; i < inventory.length; i++) {
                      if (inventory[i].item_id === choiceId) {
                        // If a matching product is found, return the product
                        return inventory[i];
                      }
                    }
                    // Otherwise return null
                    return null;
                  }

                  // Check to see if the user wants to quit the program
                  function checkIfShouldExit(answers) {
                    if (answers.toLowerCase() === "q") {
                      // Log a message and exit the current node process
                      console.log("Goodbye!");
                      process.exit(0);
                    }
                  }
