CREATE TABLE "category" (
    Category_ID SERIAL PRIMARY KEY,
    Article_ID INT,
    Category_Name VARCHAR(100),
    Category_Tags VARCHAR(200),
    Article_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Article_ID) REFERENCES article (Article_ID)
);