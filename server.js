const mysql = require("mysql2");
const { printTable } = require('console-table-printer');
const inquirer = require("inquirer");
const fs = require('fs');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2023Azkaban03",
  database: "workforce_db",
});

const schema = fs.readFileSync('./db/schema.sql', 'utf8');

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

menuPage();

function menuPage() {
  inquirer.prompt({
    type: "list",
    name: "home",
    message: "Choose an option:",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ],
  })
  .then(({ home }) => {
    switch (home) {
      case "view all departments":
        viewDept();
        break;

      case "view all roles":
        viewRole();
        break;

      case "view all employees":
        viewEmployees();
        break;

      case "add a department":
        addDept();
        break;

      case "add an employee":
        addEmployee();
        break;

      case "add a role":
        addRole();
        break;

      case "update an employee role":
        updateRole();
        break;
    }
  });
}

function queryDb(queryString, queryArgs = []) {
  return new Promise((resolve, reject) => {
    db.query(queryString, queryArgs, function (err, res) {
      if (err) return reject(err);
      resolve(res);
    });

  });
}

async function viewDept() {
  try {
    const departments = await queryDb("SELECT * FROM department");
    printTable(departments);
    menuPage();
  } catch (err) {
    console.error(err);
  }
}

async function viewRole() {
  try {
    const roles = await queryDb("SELECT * FROM role");
    printTable(roles);
    menuPage();
  } catch (err) {
    console.error(err);
  }
}

async function viewEmployees() {
  try {
    const employees = await queryDb("SELECT * FROM employee");
    printTable(employees);
    menuPage();
  } catch (err) {
    console.error(err);
  }
}

function addEmployee() {
  const questions = [
    { message: "add first name: ", name: "first_name" },
    { message: "add last name: ", name: "last_name" },
    { message: "add a role: ", name: "role_id" },
    { message: "add a manager: ", name: "manager_id" },
  ];

  inquirer.prompt(questions).then((answers) => {
    const { first_name, last_name, role_id, manager_id } = answers;

    const query =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    const values = [first_name, last_name, role_id, manager_id];

    db.query(query, values, (err) => {
      if (err) throw err;
      console.log("Employee added!");
      menuPage();
    });
  });
}

function addRole() {
  const questions = [
    { type: "input", message: "add a department id: ", name: "dep_id" },
    { type: "input", message: "add a role title: ", name: "title" },
    { type: "input", message: "Enter a salary: ", name: "salary" },
  ];

  inquirer.prompt(questions).then(handleAddRole);
}

function handleAddRole({ dep_id, title, salary }) {
  db.query(
    "INSERT INTO role (dep_id, title, salary) VALUES (?,?,?)",
    [dep_id, title, salary],
    function (err) {
      if (err) throw err;
      console.log("Role Added!");
      menuPage();
    }
  );
}

function addDept() {
  const questions = [
    {
      type: "input",
      message: "add a new department name: ",
      name: "dep_name",
    },
  ];

  inquirer.prompt(questions).then(({ dep_name }) => {
    const query = "INSERT INTO department (dep_name) VALUES (?)";

    db.query(query, [dep_name], (err) => {
      if (err) throw err;

      console.log("Department Added!");
      menuPage();
    });
  });
}

function updateRole() {
  // Query for employees
  db.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, res) {
      if (err) throw err;

      // Create array of employee choices
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));

      // Prompt user to select employee to update
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeID",
            message: "Select an employee to update their role: ",
            choices: employeeChoices,
          },
        ])
        .then((employeeResponse) => {
          const employeeID = employeeResponse.employeeID;

          // Query for roles
          db.query("SELECT id, title FROM role", function (err, res) {
            if (err) throw err;

            // Create array of role choices
            const roleChoices = res.map(({ id, title }) => ({
              name: `${title}`,
              value: id,
            }));

            // Prompt user to select new role for the employee
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "roleID",
                  message: "Select a new role for the employee: ",
                  choices: roleChoices,
                },
              ])
              .then((roleResponse) => {
                const roleID = roleResponse.roleID;

                // Update employee role in the database
                db.query(
                  "UPDATE employee SET role_id = ? WHERE id = ?",
                  [roleID, employeeID],
                  function (err) {
                    if (err) throw err;
                    console.log("Employee role updated!");
                    menuPage();
                  }
                );
              });
          });
        });
    }
  );
}
