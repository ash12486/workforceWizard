DROP DATABASE IF EXISTS workforce_db;
create DATABASE workforce_db;
use workforce_db;
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dep_id INT,
title VARCHAR(30),
salary DECIMAL, 
Foreign Key (dep_id) REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
dep_id INT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
title VARCHAR(30),
salary DECIMAL, 
manager_id INT, 
Foreign Key (role_id) REFERENCES role(id)
);