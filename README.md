# workforceWizard

by Ashlee Huff


## Table of Contents
- [workforceWizard](#workforcewizard)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Managing Employees](#managing-employees)
    - [Managing Departments](#managing-departments)
    - [Managing Roles](#managing-roles)
  - [Testing](#testing)
  - [License](#license)
  - [Questions](#questions)

## Description
The Workforce Wizard is a command-line interface (CLI) application for managing a company's workforce. This application is built with Node.js and uses the MySQL database to store and manage employee, department, and role data.

## Installation
To install the Workforce Wizard, follow the steps below:

1. Clone the repository from GitHub:

```
git clone https://github.com/your-username/workforce-wizard.git
```

2. Install the required dependencies:
```
npm install
```

3. Create a .env file in the root directory and add your MySQL database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=workforce_db
```

4. Import the database schema and seed data into your MySQL database:
```
mysql -u root -p workforce_db < db/schema.sql
mysql -u root -p workforce_db < db/seeds.sql
````

## Usage
![Demo]

To start the Workforce Wizard, run the following command in your terminal:

```
npm start
```

The application will display a main menu with options for managing employees, departments, and roles. Use the arrow keys to navigate the menu and press Enter to select an option.

### Managing Employees
The Employee Management menu allows you to view, add, update, and delete employee data. You can also view employees by department and employees by manager.

### Managing Departments
The Department Management menu allows you to view, add, update, and delete department data. You can also view the total utilized budget of a department, which is the sum of salaries of all employees in the department.

### Managing Roles
The Role Management menu allows you to view, add, update, and delete role data.

## Testing
N/A

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

## Questions
- Name - Ashlee Huff
- Email - huff.n.ashlee@gmail.com
- Github - https://github.com/ash12486/