-- DDL

CREATE DATABASE if not exists users;

-- Table for users
CREATE TABLE users.users
(
    id       INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    login    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL

)
    ENGINE = InnoDB;

-- Table: for roles
CREATE TABLE users.roles
(
    id   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(100) NOT NULL
)
    ENGINE = InnoDB;

-- Table for mapping user and roles - user_roles
CREATE TABLE users.user_roles
(
    user_id INT NOT NULL,
    role_id INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users.users (id),
    FOREIGN KEY (role_id) REFERENCES users.roles (id),

    UNIQUE (user_id, role_id)
)
    ENGINE = InnoDB;

-- DML
INSERT INTO users.users
VALUES (1, 'admin', '$2a$10$HFneOueUO3z5chv3uNjlLe47umaXEUhWx8hl7UM.vaWvsyGIpW4U.'); -- PASSWORD = 1
INSERT INTO users.users
VALUES (2, 'user', '$2a$10$HFneOueUO3z5chv3uNjlLe47umaXEUhWx8hl7UM.vaWvsyGIpW4U.'); -- PASSWORD = 1


INSERT INTO users.roles
VALUES (1, 'ROLE_USER');
INSERT INTO users.roles
VALUES (2, 'ROLE_ADMIN');

INSERT INTO users.user_roles
VALUES (1, 2);
INSERT INTO users.user_roles
VALUES (2, 1);

