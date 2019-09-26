# B2B-webshop

### Database
CREATE DATABASE betag;

### Projects table
CREATE TABLE projects (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    institution varchar(255) NOT NULL,
    shortd varchar(255),
    longd varchar(255),
    contact varchar(255) NOT NULL,
    category varchar(255),
    price int,
    picture varchar(255),
    link varchar(255),
    PRIMARY KEY (id)
);

### Users table
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    emailaddress varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    admin int,
    address varchar(255),
    token varchar(255),
    PRIMARY KEY (id)
);

### Orders table
CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    userid varchar(255) NOT NULL,
    projectid varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
