-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     middle_name VARCHAR(50),
--     phone VARCHAR(20),
--     email VARCHAR(100) UNIQUE,
--     base_location_state VARCHAR(50),
--     base_location_area VARCHAR(100)
-- );


-- INSERT INTO users (username, password, first_name, last_name, middle_name, phone, email, base_location_state, base_location_area)
-- VALUES
-- ('xreed', 'hashed_password1', 'Xenia', 'Reed', 'Marie', '555-123-4567', 'xenia.reed@example.com', 'California', 'Los Angeles'),
-- ('jdoe91', 'hashed_password2', 'John', 'Doe', NULL, '555-987-6543', 'john.doe91@example.com', 'Texas', 'Houston'),
-- ('sblack23', 'hashed_password3', 'Sarah', 'Black', 'Anne', '555-234-1122', 'sblack23@example.com', 'New York', 'Brooklyn'),
-- ('mkhan88', 'hashed_password4', 'Mohammed', 'Khan', 'Rafiq', '555-345-9988', 'mkhan88@example.com', 'Illinois', 'Chicago'),
-- ('laustin77', 'hashed_password5', 'Laura', 'Austin', NULL, '555-776-2233', 'laustin77@example.com', 'Florida', 'Miami');




desc users



drop table users;

SELECT * FROM users;



