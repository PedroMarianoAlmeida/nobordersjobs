# SQL queried on server

## NoBorderJobsUserName

### Creating the table

This table is the only one that will have the email (and for future implementation should be an encrypted one, in the future will have an User table using this Username as main ID - And this Username can be in some route too)

I create a Type for handle with the data form server

```
CREATE TABLE noborderjobsusername (
Id SERIAL PRIMARY KEY,
Emailencrypted TEXT UNIQUE NOT NULL,
Username TEXT UNIQUE NOT NULL
);
```

### Creating a user directly on DB

This query is a manual way to create a Username given an email (now implemented in postNewUserName function)

```
  INSERT INTO NoBorderJobsUserName (emailencrypted, username)
  VALUES ('mym@email.com', 'admin');
```

### Deleting a user

```
DELETE FROM NoBorderJobsUserName
WHERE id = 5;
```

## Table no_border_jobs_curators

It is a list of all curators, has a 1:1 relationship with the username field on **noborderjobsusername**
Since the amount of curators will be way less than the user (my expectation at least 😊), I am creating this separate table to the query run fast

### Create

```
CREATE TABLE no_border_jobs_curators (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE REFERENCES noborderjobsusername(username)
);
```

### Add a user

```
INSERT INTO noborderjobscurators (username) VALUES ('desired_username');
```
