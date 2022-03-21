drop table imports; 
drop table articles; 

CREATE TABLE IF NOT EXISTS imports(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	importDate DATETIME,
	rawContent TEXT
);

CREATE TABLE IF NOT EXISTS articles(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	externalId VARCHAR(500),
	importDate datetime,
	title TEXT,
	description TEXT,
	publicationDate DATETIME,
	link TEXT,
	mainPicture TEXT
);


CREATE UNIQUE INDEX external_idx_articles_externalId 
ON articles (externalId);