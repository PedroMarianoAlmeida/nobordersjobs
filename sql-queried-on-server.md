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
INSERT INTO no_border_jobs_curators (username) VALUES ('desired_username');
```

## Table Job Posts

The most important table form the project... where are the actual jobs posts
I do not create a link to the job button for now, because a lot of jobs that I see is to talk with someone on Linkedin... so this can be explained on the body (the body is Rich Text to be a nice format)

### Creating the table

```
CREATE TABLE no_border_jobs_jobspost (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    company TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    username VARCHAR(255) NOT NULL REFERENCES noborderjobsusername(username),
    BLOB TEXT NOT NULL UNIQUE
);
```
