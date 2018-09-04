# AGOLUserBackup

Backup ArcGIS Online Users to a SQLite Database

## Purpose

Having a local database of your ArcGIS Online Organization is useful.  For example it:

+ Is faster than dealing with the REST API
+ Can be used when not connected to the internet
+ Can be used to store additional information (fields)
+ Can use more flexible and faster queries

## Setup

1. Edit .env.example and provide administrative account credentials and portal ID
2. Rename .env.example to .env
3. Run `node index.js`
4. Enjoy

## Useful SQL Queries

Personally, I use [JADE](https://github.com/sunnygoyal/jade) for working locally with SQLite.  

```sql
/* Total users in each role */
SELECT role, count(role) as total_users
FROM users
GROUP BY role
ORDER BY total_users desc;

/* Total disabled accounts */
select count(disabled) as 'Disabled Accounts'
from users
where disabled = 1;

/* Total users who have never logged in */
select count(disabled) as 'Disabled Accounts'
from users
where disabled = 1;

/* Users with < 30% remaining credits */
select *
from users
where (availableCredits / assignedCredits) < 0.3;
```
