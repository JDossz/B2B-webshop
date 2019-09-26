# B2B-webshop

### Database
CREATE DATABASE betag;

### Projects table
CREATE TABLE projects (
    id int NOT NULL AUTO_INCREMENT,
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()
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
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()
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
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()
    userid varchar(255) NOT NULL,
    projectid varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

### Baskets table
CREATE TABLE baskets (
    id int NOT NULL AUTO_INCREMENT,
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()
    userid varchar(255) NOT NULL,
    projectid varchar(255) NOT NULL,
    projectquantity int NOT NULL,
    PRIMARY KEY (id)
);
