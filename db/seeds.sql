--Dept Seed Data
INSERT INTO department (
    NAME
) VALUES 
("Mom Jokes"),
("Marketing Department"),
("Finance Department"),
("Human Resources");

--Roles Seed Data
INSERT INTO role_table (
    title,
    salary,
    department_id
) 
VALUES (
    "JOKE CURATOR",
    40000,
    2
),
(
    "Joke Teller",
    50000,
    4
),
(
    "Joke Listener",
    60000,
    4
),
(
    "Therapist for Joke Listener",
    70000,
    1
),
("manager", 80000, 4);

--Employee Seed Data
INSERT INTO employees (
    FIRST_NAME,
    LAST_NAME,
    role_id
) VALUES (
    "Brian",
    "Is-The-Best",
    2
),(
    "Mauria",
    "Is-The-Best",
    1
),(
    "Kathy",
    "Is-The-Best",
    2
);

--set managers in employees table needed to happen here because the IDs didn't exist yet when trying to populate in the original INSERT above.
INSERT INTO employees (
    FIRST_NAME,
    LAST_NAME,
    role_id,
    manager_id) VALUES
(
    "Greg",
    "Is-The-Worst",
    3,
    2
),
(
    "Jared",
    "Is-The-Okayest",
    1,
    1
),
(
    "Owen",
    "Is-The-Best",
    4,
    1
),
(
    "Paul",
    "Is-The-Best",
    5,
    3
)
,(
    "Charlie",
    "Is-The-Best",
    2,
    3
);