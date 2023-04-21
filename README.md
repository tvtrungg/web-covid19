# web-covid19
## A COVID Management System Web Site final project for the Web Development class at HCUMS 

# Introduction
The web site come with provided account:
* Admin (tier 1)

In our project, there are 3 tier and 3 role for each user(already included admin):
* Admin (tier 1)
* Staff (tier 2 manager)
* Customer (tier 3 user)  

For the detailed functionalities, please refer to the requirements.pdf file for more informations (the file is in Vietnamese, no English version for the moment).

Technologies used:

* Front-end: HTML, CSS, Javascript, Handlebars
* Back-end: Node.js, Express.js, MongoDB

# Prerequisites
1. Install npm and Node.js
2. Allow invalid certificate in the browser (go to flags in the address bar and search for "Allow invalid certificates" and click "Enabled" )

# Run
* The project comes with a pre-built script file to run all the necessary services.


* For Windows:

    i. Locate to client folder

    ii. Run this command in cmd:
    ```
    npm start
    ```

# Database & Accounts

The website uses Prisma as a Proxy server to store all the data from DBMS. The database is hosted in DBMS and can be access through the server.

The website currently uses test data to test the functionalities with the following accounts:

* For Food Ordering Web Site:

    * Admin (only 1 account):
        - username: admin
        - password: admin
    * Staff :
        - username: staff1
        - password: 123
    * Customer :
        - username: customer1
        - password: 123
    



# Contribution
Special thanks to the following people for their contribution:

- Nguyen Huynh Man - 20126041
- Thieu Vinh Trung - 20126062
