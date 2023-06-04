--Create a table for koalas:
CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"Name" VARCHAR (100) NOT NULL,
	"Age" INTEGER,
	"Gender" VARCHAR (10) NOT NULL,
	"Ready for Transfer" BOOLEAN NOT NULL,
	"Notes" VARCHAR (200) NOT NULL
);

--Populate koalas table with koalas:
INSERT INTO "koalas" 
	("Name", "Age", "Gender", "Ready for Transfer", "Notes")
	VALUES
	('Scotty', 4, 'M', TRUE, 'Born in Guatemala'),
	('Jean', 5, 'F',TRUE, 'Allergic to lots of lava'),
	('Ororo', 7, 'F', FALSE, 'Loves listening to Paula (Abdul)'),
	('Logan', 15, 'M', FALSE, 'Loves the sauna'),
	('Charlie', 9, 'M', TRUE, 'Favorite band is Nirvana'),
	('Betsy', 4, 'F', TRUE, 'Has a pet iguana');