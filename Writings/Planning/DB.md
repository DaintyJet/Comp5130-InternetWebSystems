# Database Design, and Schema
The Database used by this project is the NoSQL [MongoDB](https://www.mongodb.com/), this does not require the strict schemas and table structures associated with SQL database systems. However, I will be using MongoDB like a more flexible SQL database.

This project as it is supposed to be semi-secure will use three database "collections":
1. Auth User DB. This is the database Passport will use to store all registered users and their password. I will not be making this vulnerable, as I do not want to induce added complexity with passport. 
2. User DB: Mapping of Usernames to UIDs. 
    * May store the User's password here too If I feel like it, otherwise the UIDs can be configured to be unique or not.
3. Password Storage: This database will contain a mapping of UID -> (Title, URL, Password)

> [!NOTE]
> The names used to refer to the individual collections in the Database are not final, they simply represent what the database will be responsible for and may be different in the final code.
## Auth User DB

| Username | Password Hash | Group |
| -------- | ------------- | ----- |
| SomeUsername | Some Hash | Grp   |

There will be no intentional vulnerabilities in this database. It will store the username of a user and their hash. Additionally we will store a Group Identifier used to determine if a user has the privlages to perform an admin operation (access the admin pages).

## User DB
| Username | UID |
| -------- | --- |
| SomeUsername | Some UID |

The UID will be used to determine which password stored are visible to the given user. This database should enabled some clever vulnerabilities without impacting the functionality of the main authentication table.

We can generate the UID in many ways, it can be sequential (UNIX like), or we can hash the username. As for vulnerabilities we can access a hidden field on the client side that can set the uid, we can also make it so the user creation API has an additional field where the UID can be set.

## Password DB
| UID | Tag | URL | Password |
| -------- | --- | --- | --- |
| Some UID | Tag-Ident | Optional URL | Password |
* `UID`: UID mapped to username, determines if the password is visible to the logged in user.
* `Tag`: User tag, used to give a name to the site.
* `URL`: Optional URL
* `Password`: Stored Password.
