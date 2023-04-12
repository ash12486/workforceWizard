use workforce_db;
INSERT INTO department (dep_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

/* role */
INSERT INTO role (dep_id, title, salary)
VALUES (4, "Account Executive", 159040),
(2, "Data Analyst", 170504),
(1, "Software Engineer", 132050),
(3, "Attorney", 200252);

/* Employee */
INSERT INTO employee (dep_id, first_name, last_name, role_id, title, salary)
VALUES (2, "Loreali", "Gilmore", 2, "Data Analyst", 170504),
       (1, "Rory", "Gilmore", 3, "Software Engineer", 132050),
       (4, "Emily", "Gilmore", 1, "Account Executive", 159040),
       (1, "Richard", "Gilmore", 3, "Software Engineer", 132050),
       (2, "Luke", "Danes", 2, "Data Analyst", 170504),
       (4, "Sookie", "St. James", 1, "Account Executive", 159040);

UPDATE employee SET manager_id = 2 
where id = 1 or id =4 or id =3 or id =6;