# Employee Tracker

## Description

The Employee Tracker app allows companies to manage their employees, departments, and roles. The app is run through the command line and allows users to view, add departments, and roles. Users can also view,s add, and update employees.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation

1. Clone the repo to your IDE - check out the repo here: [Employee Tracker Repo](https://github.com/SeeYouThursday/Employee-Tracker)
2. Run npm i to install dependencies
   - "console-table-printer": "^2.11.2",
   - "console.table": "^0.10.0",
   - "dotenv": "^16.3.1",
   - "express": "^4.18.2",
   - "inquirer": "^8.2.4",
   - "mysql2": "^3.6.3"
3. Create a .env file in the root directory and add your MySQL password in the following format:
   - password="yourpassword"
   - user="yourusername"
   - database="employees_db"
4. Run node index to start the app

## Usage

1. Run node index to start the app
2. Select from the menu to view, add, or update employees, departments, or roles
3. Follow the prompts to complete your selection
4. Use the provided tables in the CLI to make your selections.
5. Select Quit to end the app.

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Questions

If you have any questions, please reach out to me at the following: [email](galyenb@vcu.edu)
