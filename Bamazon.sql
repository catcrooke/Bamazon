CREATE DATABASE bamazon;
a

CREATE TABLE products (
	item_id INTEGER (12) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR (500) NOT NULL,
	department_name VARCHAR (500) NOT NULL,
	price DECIMAL (10,2) NOT NULL,
	stock_quantity INTEGER (10) NOT NULL,
	primary key (item_id)
); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('Bianchi Bicycle', 'Sports', 7500.80, 12),
('Where the Red Fern Grows', 'Books', 12.75, 200),
('Empire Strikes Back', 'Films', 23.43, 50),
('The Man in the High Castle', 'Music', 9.49, 250),
('Aquarium', 'Pet Supplies', 55.22, 56),
('Fresh Snow, Yosemite, CA', 'Photography', 14250, 1),
('NFL Pittsburgh Steelers Garden Gnome','Garden Statues', 24.99, 25),
('Ukelele', 'Musical Instruments', 54.99, 27),
('Easel', 'Art Supplies', 19.99, 430),
('Himalayan Glow Hand Carved Natural Crystal Himalayan Salt Lamp','Lighting', 29.99, 10);

SELECT * FROM products