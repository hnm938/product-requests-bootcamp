# Product Database Requests 
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Description
This is a SQL Node.JS CLI application,
made for the UofT Bootcamp module 13.

Most people starting any kind of business need 
a database to store important information, this apps
allows the user to view, create, update and delete JSON
information in a SQL database.

## Dependencies
- MySQL2 @ v3.4.5
![npm bundle size](https://img.shields.io/bundlephobia/min/mysql2)


## Tech Stack

**Client:** Node.js

**Server:** Node, Express

**Database:** MySQL

## Run Locally

#### Clone the project

```bash
  git clone https://github.com/hnm938/product-requests-bootcamp.git
```

#### Go to the project directory

```bash
  cd product-requests
```

#### Install dependencies

```bash
  npm install
```

#### Create Database
##### Login to database account

```bash
mysql -u root -p
```

##### Drop and Create new table

```bash
DROP DATABASE IF EXISTS ecommerce_db;
```

```bash
CREATE DATABASE ecommerce_db;
```

#### Update .env file with database information.

#### Run the application

```bash
  node sever.js
```

