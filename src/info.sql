CREATE DATABASE car;
\c car;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR  NOT NULL,
    user_img text DEFAULT 'nomadurlar',
    role VARCHAR DEFAULT 'user'
);

-- #######################################################

DROP TABLE IF EXISTS admin CASCADE;

CREATE TABLE admin(
    id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR  NOT NULL,
    user_img text DEFAULT 'nomadurlar',
    role VARCHAR DEFAULT 'admin'
);
-- #############################################################


DROP TABLE IF EXISTS companies CASCADE;

CREATE TABLE companies(
    id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    title VARCHAR(64) NOT NULL,
    companie_img text DEFAULT 'nomadurlar',
    admin_id  VARCHAR NOT NULL,
    CONSTRAINT fk_creted_bay_companie
    FOREIGN key(admin_id)
    REFERENCES admin(id)
);

--  #############################################################

DROP TABLE IF EXISTS cars CASCADE;

CREATE TABLE cars(
    id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    title VARCHAR(64) NOT NULL,
    car_img text DEFAULT 'nomadurlar',
    price VARCHAR(64) NOT NULL,
    tanirovkasi VARCHAR(40)  NOT NULL,
    year VARCHAR(30) NOT NULL,
    color VARCHAR(64) NOT NULL,
    mator VARCHAR(64) NOT NULL,
    distance VARCHAR(64) NOT NULL,
    gearbook VARCHAR(64) NOT NULL, 
    deseription VARCHAR NOT NULL,
    admin_id  VARCHAR NOT NULL,
    CONSTRAINT fk_creted_bay_admin
    FOREIGN key(admin_id)
    REFERENCES admin(id),
    companie_id  VARCHAR NOT NULL,
    CONSTRAINT fk_creted_bay_companie
    FOREIGN key(companie_id)
    REFERENCES companies(id)
);


-- ###################################################################

DROP TABLE IF EXISTS bays CASCADE;

CREATE TABLE bays(
    id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    user_id  VARCHAR NOT NULL,
    CONSTRAINT fk_creted_bay_user
    FOREIGN key(user_id)
    REFERENCES users(id),
    car_id  VARCHAR NOT NULL,
    CONSTRAINT fk_creted_bay_car
    FOREIGN key(car_id)
    REFERENCES cars(id)
);




-- ###################################################################

DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes(
    id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    user_id  VARCHAR NOT NULL,
    CONSTRAINT fk_creted_bay_user
    FOREIGN key(user_id)
    REFERENCES users(id),
    car_id  VARCHAR NOT NULL,
    CONSTRAINT fk_creted_bay_car
    FOREIGN key(car_id)
    REFERENCES cars(id)
);





