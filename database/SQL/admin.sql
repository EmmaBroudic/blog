CREATE TABLE "admin" (
    Admin_ID SERIAL PRIMARY KEY,
    Admin_Surname VARCHAR(50),
    Admin_First_Name VARCHAR(50),
    Admin_Nickname VARCHAR(50),
    Admin_Email VARCHAR(100) UNIQUE,
    Admin_Password VARCHAR(100),
    Admin_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);