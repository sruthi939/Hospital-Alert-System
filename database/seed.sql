-- Seed an initial nurse user
-- Password is 'password123' hashed with bcrypt
-- Use this for testing the login page
INSERT INTO Users (name, email, password_hash, role, staffId) 
VALUES ('Nurse Anjali', 'nurse@hospital.com', '$2a$10$X8O5Y/TzK.KqXvFmZk5W6.o7O6Q5C5nZ.9B7V.h.9H7v/Z0v6n.hG', 'NURSE', 'NUR12345');
