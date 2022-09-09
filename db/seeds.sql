USE employees;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 101, 10),
        ("Mark", "Tanner", 102, 20),
        ("Vian" "Charbonneau", 100, 30),
        ("Heather", "Lark", 103, 40);
       
INSERT INTO role(title, salary, department_id)
VALUES ("Engineer", 76000, 1),
        ("Developer", 66000, 2),
        ("Manager", 56000, 3),
        ("Intern", 26000, 4);

INSERT INTO department(name)
VALUES ("Engineering"),
        ("Marketing"),
        ("Human Resorces"),
        ("Engineering");