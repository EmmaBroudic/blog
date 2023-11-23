CREATE TABLE "article" (
    Article_ID SERIAL PRIMARY KEY,
    Admin_ID INT,
    Article_title VARCHAR(300),
    Article_text VARCHAR(4000),
    Article_image VARCHAR(300),
    Article_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Admin_ID) REFERENCES admin (Admin_ID)
);