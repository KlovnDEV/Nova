CREATE DATABASE IF NOT EXISTS essentialmode;
USE `essentialmode`;

INSERT INTO `addon_account` (name, label, shared) VALUES
	('society_nightclub', 'Nightclub', 1);

INSERT INTO `addon_inventory` (name, label, shared) VALUES
	('society_nightclub', 'Nightclub', 1),
    ('society_nightclub_fridge', 'Nightclub (frigo)', 1);

INSERT INTO `datastore` (name, label, shared) VALUES
	('society_nightclub', 'Nightclub', 1);

INSERT INTO `items` (`name`, `label`, `limit`) VALUES
	('soda', 'Coca-cola', 5),
	('juice', 'Tropicana', 5),
	('powerade', 'Powerade', 2),
	('beer', 'Bière', 2),
	('tequila', 'Don Juan', 2),
	('whiskey', 'Jack Daniels', 2),
	('jager', 'Jägermeister', 2),
    ('vodka', 'Eristoff', 2),
    ('rhum', 'Havana Club', 2),
    ('martini', 'Martini', 2),
    ('icetea', 'Lipton IceTea', 5),
    ('energy', 'Redbull', 5),
    ('limonade', '7up', 5),
    ('ice', 'Glace', 5),
    ('menthe', 'Menthe', 10),
    ('jagerbomb', 'Jägerbomb', 5),
    ('whiskycoca', 'Whisky-coke', 5),
    ('vodkaenergy', 'Vodka-energy', 5),
    ('vodkafruit', 'Vodka-fruit', 5),
    ('rhumfruit', 'Rhum-fruit', 5),
    ('teqpaf', "Teq'paf", 5),
    ('rhumcoca', 'Rhum-coke', 5),
    ('mojito', 'Mojito', 5);

INSERT INTO `jobs` (name, label, whitelisted) VALUES
	('nightclub', 'Nightclub', 1);

INSERT INTO `job_grades` (job_name, grade, name, label, salary, skin_male, skin_female) VALUES
	('nightclub', 0, 'interim', 'Interim', 0, '{}', '{}'),
    ('nightclub', 1, 'security', 'Sécurité', 0, '{}', '{}'),
    ('nightclub', 2, 'barman', 'Barman', 0, '{}', '{}'),
    ('nightclub', 3, 'dancer', 'Danceur', 0, '{}', '{}'),
    ('nightclub', 4, 'chefsecurity', 'Chef Sécurité', 0, '{}', '{}'),
    ('nightclub', 5, 'viceboss', 'Manager', 0, '{}', '{}'),
    ('nightclub', 6, 'boss', 'Patron', 0, '{}', '{}');