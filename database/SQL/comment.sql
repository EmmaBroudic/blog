CREATE TABLE "comment" (
    Com_ID SERIAL PRIMARY KEY,
    Article_ID INT,
    Admin_ID INT,
    User_ID INT,
    Text_Com VARCHAR(400),
    Com_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Article_ID) REFERENCES article (Article_ID),
    FOREIGN KEY (Admin_ID) REFERENCES admin (Admin_ID),
    FOREIGN KEY (User_ID) REFERENCES bloguser (User_ID)
);