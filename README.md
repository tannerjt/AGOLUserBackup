# AGOLUserBackup

Backup ArcGIS Online Users to a SQLite Database

## Purpose

Having a local database of your ArcGIS Online Organization is useful.  For example it:

+ Is faster than dealing with the REST API
+ Can be used when not connected to the internet
+ Can be used to store additional information (fields)
+ Can use more flexible and faster queries

## Setup

1. Download or clone this repo onto your computer
1. In project root, run `npm install`
1. Edit .env.example and provide administrative account credentials and portal ID
1. Rename .env.example to .env
1. Run `node index.js`
1. Enjoy

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

/* Active accounts that haven't logged in in last 6 months */
select username, fullName, email, datetime(lastLogin/1000, 'unixepoch') as lastLogin
from users
where lastLogin > 0
AND disabled = 0
AND datetime(lastLogin/1000, 'unixepoch') < datetime('now','-6 months')
order by lastLogin desc;

/* Total number of users that have logged in in last 14 days */
select count(username)
from users
WHERE datetime(lastLogin/1000, 'unixepoch') > datetime('now','-14 days');

/* Using unique user tags, show number of users per tag */
SELECT tag_primary, count(tags) as total
FROM users
GROUP BY tags
ORDER BY total DESC
```
