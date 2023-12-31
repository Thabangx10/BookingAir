// Database configuration
const database = require("../config");

// bcrypt module
const { hash, compare, hashSync } = require("bcrypt");

const bcrypt = require("bcrypt");

// Middleware for creating a token
const { createToken } = require("../middleware/AuthenticatedUser");

// User
class User {
  // This method is responsible for authenticating a user
  SignIn(req, res) {
    // Extract the email and password from the request body
    const { Email, UserPassword } = req.body;

    // Construct a SQL query to select the user from the database
    const loginQRY = `
      SELECT ID, FirstName, LastName, Email, UserPassword, Address, PhoneNumber, userRole
      FROM Users
      WHERE Email = '${Email}';
    `;

    // Execute the query and handle the result
    database.query(loginQRY, async (err, data) => {
      if (err) throw err;
      if (!data.length || data == null) {
        // If no user was found with the given email, return an error
        res.status(401).json({
          err: "The email address is incorrect",
        });
      } else {
        // If a user was found, compare the password hash with the one in the database
        await bcrypt.compare(
          UserPassword,
          data[0].UserPassword,
          async (cErr, cResult) => {
            if (cErr) throw cErr;
            // If the passwords match, create a JWT token and save it as a cookie
            const jwToken = createToken({
              Email,
              UserPassword,
            });
            res.cookie("LegitUser", jwToken, {
              maxAge: 3600000,
              httpOnly: true,
            });
            // Return a success message and the user data
            if (cResult) {
              res.status(200).json({
                msg: "Logged in",
                jwToken,
                result: data[0],
              });
            } else {
              // If the passwords don't match, return an error
              res.status(401).json({
                err: "You entered an invalid password or did not register. ",
              });
            }
          }
        );
      }
    });
  }

  // Retrieve all users
  retrieveUsers(req, res) {
    // SQL query to select all users
    const loginQRY = `
        SELECT ID, FirstName, LastName, Email, UserPassword, Address, PhoneNumber, userRole
        FROM Users
      `;

    // Send the SQL query to the database to retrieve all users
    database.query(loginQRY, (err, data) => {
      if (err) {
        // If an error occurred while retrieving the users, throw the error
        throw err;
      } else {
        // If there are no errors, send the retrieved data to the client
        res.status(200).json({ results: data });
      }
    });
  }

  // Fetch user information from the database
  retrieveUser(req, res) {
    // SQL query to select user information by ID
    const loginQRY = `
        SELECT ID, FirstName, LastName, Email, UserPassword, Address, PhoneNumber, userRole
        FROM Users
        WHERE ID = ?;
    `;
    // Execute the query with the user ID as a parameter
    database.query(loginQRY, [req.params.id], (err, data) => {
      if (err) {
        // If there's an error, throw an exception
        throw err;
      } else {
        // If successful, return the user information as a JSON object
        res.status(200).json({ results: data });
      }
    });
  }

  async register(req, res) {
    try {
      const data = req.body;

      // Ensure data.userPass is a valid string and meets password criteria
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(data.userPass)) {
        return res.status(400).json({
          status: 400,
          msg: 'Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
        });
      }

      // Generate a salt
      const saltRounds = 15;
      const salt = await bcrypt.genSalt(saltRounds);

      // Encrypt the password using the generated salt
      const hashedPassword = await bcrypt.hash(data.userPass, salt);

      // Create a user object with email and hashed password
      const user = {
        emailAdd: data.emailAdd,
        userPass: hashedPassword,
      };

      // Insert the user data into the database
      const query = `
        INSERT INTO Users
        SET ?;
      `;
      db.query(query, user, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({
            status: 500,
            msg: "Registration failed.",
          });
        } else {
          // Create a token for the registered user
          const token = createToken(user);

          res.status(201).json({
            status: 201,
            msg: "You are now registered.",
            token: token,
          });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        msg: "Registration failed.",
      });
    }
  }

  // Login endpoint
  async login(req, res) {
    try {
      const data = req.body;

      // Retrieve the user from the database by email
      const query = `
        SELECT *
        FROM Users
        WHERE emailAdd = ?;
      `;
      db.query(query, [data.emailAdd], async (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            status: 500,
            msg: "Login failed.",
          });
        }

        if (results.length === 0) {
          return res.status(401).json({
            status: 401,
            msg: "Invalid credentials.",
          });
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(data.userPass, user.userPass);

        if (!passwordMatch) {
          return res.status(401).json({
            status: 401,
            msg: "Invalid credentials.",
          });
        }

        // Create a token for the logged-in user
        const token = createToken(user);

        res.status(200).json({
          status: 200,
          msg: "Login successful.",
          token: token,
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        msg: "Login failed.",
      });
    }
  }

  updateUser(req, res) {
    // Get the data from the request body
    let data = req.body;
    // If the user password is not null or undefined, hash the password
    if (data.UserPassword !== null || data.UserPassword !== undefined)
      data.UserPassword = hashSync(data.UserPassword, 15);
    // Set up the SQL query
    const loginQRY = `
        UPDATE Users
        SET ?
        WHERE ID = ?;
        `;
    // Execute the query and update the user record with the given ID
    database.query(loginQRY, [data, req.params.id], (err) => {
      if (err) throw err;
      // Return a success message with status code 200
      res.status(200).json({ msg: "A row was affected" });
    });
  }
  // This method deletes a user record from the database based on their ID
  deleteUser(req, res) {
    // SQL query to delete a user record based on their ID
    const loginQRY = `
    DELETE FROM Users
    WHERE ID = ?;
    `;
    // Execute the query using the ID parameter passed in the request
    database.query(loginQRY, [req.params.id], (err) => {
      if (err) throw err;
      // Return a success message indicating that a record was removed from the database
      res.status(200).json({ msg: "A record was removed from a database" });
    });
  }
}

// Token generation function
// function createToken(user) {
//   const token = jwt.sign({ emailAdd: user.emailAdd }, 'Air', { expiresIn: '1h' });
//   return token;
// }

// -------------------------------------------A class for handling programs-related operations-------------------------------------------------
class Program {
  // Fetch all coding bootcamp programs
  retrievePrograms(req, res) {
    const query = `SELECT ID, ProgramName, Location, Period, ProgramDescription, imgURL FROM codingPrograms;`;
    database.query(query, (err, results) => {
      if (err) throw err;
      res.status(200).json({ results: results });
    });
  }

  // Fetch a specific program using the program id
  retrieveProgram(req, res) {
    const query = `SELECT ID, ProgramName, Location, Period, ProgramDescription, imgURL FROM codingPrograms WHERE ID = ?;`;
    database.query(query, [req.params.id], (err, results) => {
      if (err) throw err;
      res.status(200).json({ results: results });
    });
  }

  // Add a new coding bootcamp program
  addProgram(req, res) {
    const query = `INSERT INTO codingPrograms SET ?;`;
    database.query(query, [req.body], (err) => {
      if (err) {
        res.status(400).json({ err: "Unable to insert a new record." });
      } else {
        res.status(200).json({ msg: "Coding bootcamp program saved" });
      }
    });
  }

  // Update an existing program using the program id
  updateProgram(req, res) {
    const query = `UPDATE codingPrograms SET ? WHERE ID = ?;`;
    database.query(query, [req.body, req.params.id], (err) => {
      if (err) {
        res.status(400).json({ err: "Unable to update record." });
      } else {
        res.status(200).json({ msg: "Coding bootcamp program updated" });
      }
    });
  }

  // Delete an existing program using the program id
  deleteProgram(req, res) {
    const query = `DELETE FROM codingPrograms WHERE ID = ?;`;
    database.query(query, [req.params.id], (err, results) => {
      if (err) {
        res.status(400).json({ err: "The record was not found." });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ err: "Program not found." });
      } else {
        res.status(200).json({ msg: "A coding bootcamp program was deleted." });
      }
    });
  }
}

// -------------------------------------------A class for handling flights-related operations-------------------------------------------------
class Flights {
  // Fetch all products
  retrieveFlights(req, res) {
    const loginQRY = `SELECT ID, DepartureCity, DepartureDate, DepartureTime, ArrivalCity, ArrivalDate, ArrivalTime, Price
          FROM Flights;`;
    // Run the SQL query
    database.query(loginQRY, (err, results) => {
      if (err) throw err;
      // Return the query results
      res.status(200).json({ results: results });
    });
  }
  // Fetch a specific product using the product id
  retrieveFlight(req, res) {
    const loginQRY = `SELECT ID, DepartureCity, DepartureDate, DepartureTime, ArrivalCity, ArrivalDate, ArrivalTime, Price
      FROM Flights
          WHERE ID = ?;`;
    // Run the SQL query with a parameterized query
    database.query(loginQRY, [req.params.id], (err, results) => {
      if (err) throw err;
      // Return the query results
      res.status(200).json({ results: results });
    });
  }
  // Add a new product
  addFlight(req, res) {
    const loginQRY = `
          INSERT INTO Flights
          SET ?;
          `;
    // Run the SQL query with the request body as the data
    database.query(loginQRY, [req.body], (err) => {
      if (err) {
        // Return an error if the query fails
        res.status(400).json({ err: "Unable to insert a new record." });
      } else {
        // Return a success message if the query succeeds
        res.status(200).json({ msg: "Flights saved" });
      }
    });
  }
  // Update an existing product using the product id
  updateFlight(req, res) {
    const loginQRY = `
          UPDATE Flights
          SET ?
          WHERE ID = ?
          `;
    // Run the SQL query with the request body and product id as parameters
    database.query(loginQRY, [req.body, req.params.id], (err) => {
      if (err) {
        // Return an error if the query fails
        res.status(400).json({ err: "Unable to update a record." });
      } else {
        // Return a success message if the query succeeds
        res.status(200).json({ msg: "Flights updated" });
      }
    });
  }
  // Delete an existing product using the product id
  deleteFlight(req, res) {
    const loginQRY = `
          DELETE FROM Flights
          WHERE ID = ?;
          `;
    // Run the SQL query with the product id as a parameter
    database.query(loginQRY, [req.params.id], (err) => {
      if (err) res.status(400).json({ err: "The record was not found." });
      // Return a success message if the query succeeds
      res.status(200).json({ msg: "Flight was deleted." });
    });
  }
}

// -----------------------------------------CART---------------------------------------------------------------

class Bookings {
  retrieveBookings(req, res) {
    const loginQRY = `SELECT UserID, DepartureCity, DepartureDate, DepartureTime, ArrivalCity, ArrivalDate, ArrivalTime, Price
        FROM Bookings
        INNER JOIN Flights ON Bookings.ID = Flights.ID=${req.params.id};`;

    database.query(loginQRY, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ err: "The Cart is empty" });
      } else res.status(200).json({ results: data });
    });
  }

  addBooking(req, res) {
    const loginQRY = `
        INSERT INTO Bookings
        SET ?;
        `;
    database.query(loginQRY, [req.body], (err) => {
      if (err) {
        res.status(400).json({ err: "Could not add to the Booking" });
      } else {
        res.status(200).json({ message: "Added to the Booking" });
      }
    });
  }

  deleteBooking(req, res) {
    const loginQRY = `
        DELETE FROM Bookings
        WHERE ID = ?; `;
    database.query(loginQRY, [req.params.id], (err) => {
      if (err) res.status(400).json({ err: "The flight was not found." });
      res.status(200).json({ message: "A flight was deleted." });
    });
  }

  updateBooking(req, res) {
    const loginQRY = `
        UPDATE Bookings
        SET ?
        WHERE ID = ?
        `;
    database.query(loginQRY, [req.body, req.params.id], (err) => {
      if (err) {
        res.status(400).json({ err: "Unable to update a record." });
      } else {
        res.status(200).json({ message: "Flight updated" });
      }
    });
  }
}

// Export the user and product class
module.exports = {
  User,
  Program,
  Flights,
  Bookings,
};
