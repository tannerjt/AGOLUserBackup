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
