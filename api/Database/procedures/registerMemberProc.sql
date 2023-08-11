USE the_jitu_community_club;
GO

CREATE OR ALTER PROCEDURE registerMemberProc
    @id VARCHAR(255),
    @first_name VARCHAR(255),
    @last_name VARCHAR(255),
    @email VARCHAR(255),
    @phone_number VARCHAR(255),
    @gender VARCHAR(255),
    @cohort_number INT,
    @description VARCHAR(500)
AS
BEGIN
    INSERT INTO registerMemberTable (id, first_name, last_name, email, phone_number, gender, cohort_number, description) 
    VALUES (@id, @first_name, @last_name, @email, @phone_number, @gender, @cohort_number, @description);
END
GO

CREATE OR ALTER PROCEDURE getMemberByEmailProc
    @email VARCHAR(255)
AS
BEGIN
    SELECT * FROM registerMemberTable WHERE email = @email;
END
GO