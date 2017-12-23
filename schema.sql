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
("Amazon Echo", "Electronics", 179.99, 200),

("Amazon Echo Dot", "Electronics", 49.99, 150),

("Instant Pot 7-in-1 MultiFunctional Pressure Cooker", "Home & Kitchen", 129.95, 100),

("Fire HD Tablets", "Electronics", 109.99, 100),

("SanDisk 32GB Ultra Class Memory Card", "Electronics", 13.95, 150),

("Sony XB950B1 Extra Bass Wireless Headphones with App Control", "Electronics", 148.99, 300),

("Call of Duty WWII - Playstation 4", "Video Game", 54.95, 250),

("EatSmart Precision Digital Bathroom Scale", "Electronics", 14.95, 100),

("iXCC Certified Lightning Cable for iPhones", "Electronics", 7.00, 150),

("Echo Show - Black", "Electronics", 149.99, 160);


select * from products;
