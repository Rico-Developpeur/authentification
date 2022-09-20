DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id int primary key NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  hashedPassword varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;


DROP TABLE IF EXISTS token_blacklist;

CREATE TABLE token_blacklist(
  token varchar(255) primary key NOT NULL
);
