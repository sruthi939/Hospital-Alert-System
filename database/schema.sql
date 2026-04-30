CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('NURSE', 'DOCTOR', 'ADMIN') DEFAULT 'NURSE',
    staffId VARCHAR(50) UNIQUE, -- Employee ID
    phone VARCHAR(20),
    dob DATE,
    gender VARCHAR(20),
    address TEXT,
    department VARCHAR(100),
    designation VARCHAR(100),
    shift VARCHAR(50),
    experience VARCHAR(50),
    license_no VARCHAR(100),
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code_type VARCHAR(50) NOT NULL,
    floor VARCHAR(50) NOT NULL,
    ward VARCHAR(50) NOT NULL,
    room VARCHAR(50) NOT NULL,
    status ENUM('ACTIVE', 'ACCEPTED', 'IN_PROGRESS', 'RESOLVED') DEFAULT 'ACTIVE',
    initiator_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (initiator_id) REFERENCES Users(id)
);

CREATE TABLE Responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alert_id INT,
    responder_id INT,
    response_status ENUM('ACCEPTED', 'ON_SITE', 'RESOLVED') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alert_id) REFERENCES Alerts(id),
    FOREIGN KEY (responder_id) REFERENCES Users(id)
);
