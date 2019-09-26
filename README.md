# B2B-webshop

### Database
CREATE DATABASE betag;

### Projects table
CREATE TABLE projects (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255),
    institution varchar(255),
    shortd varchar(255),
    longd varchar(255),
    contact varchar(255),
    category varchar(255),
    picture varchar(255),
    link varchar(255),
    PRIMARY KEY (id)
);

### Users table
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    firstname varchar(255),
    lastname varchar(255),
    emailaddress varchar(255),
    password varchar(255),
    address varchar(255),
    PRIMARY KEY (id)
);

### Orders table
CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    firstname varchar(255),
    lastname varchar(255),
    address varchar(255),
    PRIMARY KEY (id)
);
