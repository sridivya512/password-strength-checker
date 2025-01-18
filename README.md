# Password Strength Checker

The Password Strength Checker is a web application that helps users create secure passwords by providing real-time feedback on password strength. It integrates with the Have I Been Pwned (HIBP) API to check if a password has been part of a data breach. The app promotes strong password practices by:
- Alerting users if a password has appeared in a known data breach.
- Offering real-time feedback on password criteria (length, uppercase/lowercase letters, numbers, special characters) to guide users towards stronger passwords.

By encouraging secure password habits, this project helps protect online accounts and reduce the risk of cyberattacks.

## Features
- **Password Strength Meter**: Provides instant feedback on password strength based on length, character diversity, and complexity.
- **Have I Been Pwned (HIBP) Integration**: Checks if a password has been exposed in a data breach.
- **Secure Password Storage**: Uses bcrypt for password hashing to securely store user passwords.
- **Registration and Login**: Allows users to register and log in securely, with error handling for duplicate usernames.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Password Hashing**: bcrypt.js
- **API Integration**: Have I Been Pwned (HIBP)

## How It Works
1. **Registration**: 
   - User enters a username and password.
   - Password strength is evaluated, and the HIBP API is used to check if the password has been compromised.
   - If the password is strong and has not been breached, it is hashed and securely stored in the database.
2. **Login**:
   - User enters credentials.
   - The entered password is compared with the stored hashed password using bcrypt.
   - If the password matches, the user is logged in; otherwise, an error message is shown.

## Installation
To run the Password Strength Checker locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/password-strength-checker.git
2. Navigate into the project directory:
   ```bash
   cd password-strength-checker
3. Install dependencies: Run the following command to install all the necessary dependencies for both frontend and backend:
   ```bash
   npm install
4. Set up the MySQL database: Create a MySQL database and set up the tables by running the setup.sql script in your MySQL client.
   ```SQL
   SOURCE setup.sql;
5. Configure environment variables: In the root directory, create a .env file with the following variables: Replace the placeholders (your-database-host, your-database-username, etc.) with your actual MySQL database details.
    ```
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
6. Start the server: Run the following command to start the server. By default, the server will run on http://localhost:3000.
    ```bash    
    npm start
7.  Access the application: Open your browser and go to http://localhost:3000 to view the Password Strength Checker app.


