DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL auto_increment,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL(5,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Amazon Echo", "Electronics", 179.99, 20),

("Amazon Echo Dot", "Electronics", 49.99, 15),

("Instant Pot 7-in-1 MultiFunctional Pressure Cooker", "Home & Kitchen", 129.95, 10),

("Fire HD Tablets", "Electronics", 109.99, 10),

("SanDisk 32GB Ultra Class Memory Card", "Electronics", 13.95, 5),

("Sony XB950B1 Extra Bass Wireless Headphones with App Control", "Electronics", 148.99, 30),

("Call of Duty WWII - Playstation 4", "Video Game", 54.95, 25),

("EatSmart Precision Digital Bathroom Scale", "Electronics", 14.95, 10),

("iXCC Certified Lightning Cable for iPhones", "Electronics", 7.00, 15),

("Echo Show - Black", "Electronics", 149.99, 16);


select * from products;
