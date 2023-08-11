USE the_jitu_community_club;

DROP TABLE IF EXISTS registerMemberTable;

CREATE TABLE registerMemberTable (
    id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    cohort_number VARCHAR(30) NOT NULL,
    description VARCHAR(500) NOT NULL,
    date_registered DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
GO
