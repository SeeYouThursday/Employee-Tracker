INSERT INTO department (
    NAME
) VALUES 
("Mom Jokes"),
("Marketing Department"),
("Finance Department"),
("Human Resources");

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

-- --set managers in employees table needed to happen here because the IDs didn't exist yet when trying to populate in the original INSERT above.
-- UPDATE employees
-- SET manager_id = NULL
-- WHERE `ID` < 4;

-- UPDATE employees
-- SET manager_id = 3
-- WHERE `ID` > 6;

-- UPDATE employees
-- SET manager_id = 1
-- WHERE `ID` > 4 && `ID` < 7;

-- UPDATE employees
-- SET manager_id = 2
-- WHERE `ID` = 4;

--THE ABOVE WAS DEPRECATED BY THE SECOND INSERT FOR BETTER READABILITY.
