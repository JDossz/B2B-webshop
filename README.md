# B2B-webshop

### Database
CREATE DATABASE betag;

### Projects table
CREATE TABLE projects (
    id int NOT NULL AUTO_INCREMENT,
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    title nvarchar(255) NOT NULL,
    seo nvarchar(255) NOT NULL,
    institution nvarchar(255) NOT NULL,
    shortd nvarchar(500),
    longd nvarchar(10000),
    contact nvarchar(255) NOT NULL,
    category nvarchar(255) DEFAULT 'other',
    donation int NOT NULL DEFAULT 5,
    goal int NOT NULL,
    balance int,
    pictureurl nvarchar(255),
    link nvarchar(1000),
    PRIMARY KEY (id)
);

### Users table
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    firstname nvarchar(255) NOT NULL,
    lastname nvarchar(255) NOT NULL,
    username nvarchar(255) NOT NULL,
    emailaddress nvarchar(255) NOT NULL,
    password nvarchar(255) NOT NULL,
    admin boolean NOT NULL DEFAULT 0,
    address nvarchar(1000),
    token nvarchar(255),
    PRIMARY KEY (id)
);

### Orders table
CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    userid int NOT NULL,
    projectid int NOT NULL,
    quantity int NOT NULL,
    status tinyint  NOT NULL,
    PRIMARY KEY (id)
);

### Baskets table
CREATE TABLE baskets (
    id int NOT NULL AUTO_INCREMENT,
    insdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    userid int NOT NULL,
    projectid int,
    quantity int,
    PRIMARY KEY (id)
);
