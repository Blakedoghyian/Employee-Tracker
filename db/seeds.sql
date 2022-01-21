INSERT INTO departments (name)
VALUES 
('Executive Operations'),
('Coaching Staff'),
('Team');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Owner', 150000, 1),
('General Manager', 90000, 1),
('Head Coach', 75000, 2),
('Assistant Coach', 65000, 2),
('Center', 75000, 3),
('Forward', 75000, 3),
('Defensemen', 75000, 3),
('Goaltender', 75000, 3);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES
('Tom', 'Gaglardi', 1, null),
('Jim', 'Nill', 2, 1),
('Rick', 'Bowness', 3, 2),
('Derek', 'Laxdal', 4, 3),
('Todd', 'Nelson', 4, 3),
('John', 'Stevens', 4, 3),
('Jamie', 'Benn', 5, 3),
('Roope', 'Hintz', 6, 3),
('Joe', 'Pavelski', 6, 3),
('Miro', 'Heiskanen', 7, 3),
('John', 'Klingberg', 7, 3),
('Esa', 'Lindell', 7, 3),
('Brayden', 'Holtby', 8, 3),
('Jake', 'Oettinger', 8, 3),
('Anton', 'Khudobin', 8, 3);