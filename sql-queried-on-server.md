# SQL queried on server

## Creating NoBorderJobsUserName

This table is the only one that will have the email (and for future implementation should be an encrypted one, in the future will have an User table using this Username as main ID - And this Username can be in some route too)

I create a Type for handle with the data form server

```
CREATE TABLE noborderjobsusername (
Id SERIAL PRIMARY KEY,
Emailencrypted TEXT UNIQUE NOT NULL,
Username TEXT UNIQUE NOT NULL
);
```

## Creating a user directly on DB

This query is a manual way to create a Username given an email

```
  INSERT INTO NoBorderJobsUserName (emailencrypted, username)
  VALUES ('mym@email.com', 'admin');
```
