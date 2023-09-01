// Database configuration
const database = require("../config");

// bcrypt module for hashing and comparing passwords
const bcrypt = require("bcrypt");

// Middleware for creating a token
const { createToken } = require("../middleware/AuthenticatedUser");

// User class handles user-related operations
class User {
  // Method for authenticating a user
  async SignIn(req, res) {
    try {
      // Extract the email and password from the request body
      const { Email, UserPassword } = req.body;

      // Construct a SQL query to select the user from the database
      const loginQRY = `
        SELECT ID, FirstName, LastName, Email, UserPassword, Address, PhoneNumber, userRole
        FROM Users
        WHERE Email = ?;
      `;

      // Execute the query and handle the result using async/await
      const [rows] = await database.query(loginQRY, [Email]);

      if (!rows.length) {
        // If no user was found with the given email, return an error
        return res.status(401).json({
          err: "The email address is incorrect",
        });
      }

      // If a user was found, compare the password hash with the one in the database
      const passwordMatch = await bcrypt.compare(UserPassword, rows[0].UserPassword);

      if (passwordMatch) {
        // If the passwords match, create a JWT token and save it as a cookie
        const jwToken = createToken({
          Email,
          UserPassword,
        });
        res.cookie("LegitUser", jwToken, {
          maxAge: 3600000, // Token expiration time
          httpOnly: true,  // Make the cookie HTTP-only for added security
        });
        // Return a success message and the user data
        return res.status(200).json({
          msg: "Logged in",
          jwToken,
          result: rows[0], // User data from the database
        });
      } else {
        // If the passwords don't match, return an error
        return res.status(401).json({
          err: "You entered an invalid password or did not register.",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred during login.",
      });
    }
  }

// Method to retrieve all users
async retrieveUsers(req, res) {
  try {
    // SQL query to select all users
    const loginQRY = `
      SELECT ID, FirstName, LastName, Email, Address, PhoneNumber, userRole
      FROM Users;
    `;

    // Execute the query to retrieve all users
    const [rows] = await database.query(loginQRY);

    // Check if there are no users
    if (!rows.length) {
      return res.status(404).json({
        err: "No users found",
      });
    }

    // Return the retrieved user data to the client
    return res.status(200).json({ results: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: "An error occurred while retrieving users.",
    });
  }
}

// Method to retrieve user information by ID
async retrieveUser(req, res) {
  try {
    // SQL query to select user information by ID
    const loginQRY = `
      SELECT ID, FirstName, LastName, Email, Address, PhoneNumber, userRole
      FROM Users
      WHERE ID = ?;
    `;

    // Execute the query with the user ID as a parameter
    const [rows] = await database.query(loginQRY, [req.params.id]);

    if (!rows.length) {
      // If no user was found with the given ID, return a 404 status code
      return res.status(404).json({
        err: "User not found",
      });
    }

    // Return the user information as a JSON object
    return res.status(200).json({ results: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: "An error occurred while retrieving user information.",
    });
  }
}
  // Method to register a new user
  async register(req, res) {
    try {
      const data = req.body;
  
      // Ensure data.UserPassword is a valid string and meets password criteria
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (!passwordRegex.test(data.UserPassword)) {
        return res.status(400).json({
          status: 400,
          msg: 'Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.',
        });
      }
  
      // Generate a salt
      const saltRounds = 15;
      const salt = await bcrypt.genSalt(saltRounds);
  
      // Encrypt the password using the generated salt
      const hashedPassword = await bcrypt.hash(data.UserPassword, salt);
  
      // Create a user object with email and hashed password
      const user = {
        Email: data.Email,
        UserPassword: hashedPassword,
      };
  
      // Insert the user data into the database
      const query = `
        INSERT INTO Users
        SET ?;
      `;
      await database.query(query, user);
  
      // Create a token for the registered user
      const token = createToken(user);
  
      res.status(201).json({
        status: 201,
        msg: "You are now registered.",
        token: token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 500,
        msg: "Registration failed.",
      });
    }
  }  

  // Method to update user information
  async updateUser(req, res) {
    try {
      // Get the data from the request body
      let data = req.body;
      // If the user password is not null or undefined, hash the password
      if (data.UserPassword !== null || data.UserPassword !== undefined) {
        data.UserPassword = await bcrypt.hash(data.UserPassword, 15);
      }
      // Set up the SQL query
      const loginQRY = `
        UPDATE Users
        SET ?
        WHERE ID = ?;
      `;
      // Execute the query and update the user record with the given ID
      await database.query(loginQRY, [data, req.params.id]);

      // Return a success message with status code 200
      res.status(200).json({ msg: "User information updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while updating user information.",
      });
    }
  }

  // Method to delete a user
  async deleteUser(req, res) {
    try {
      // SQL query to delete a user record based on their ID
      const loginQRY = `
        DELETE FROM Users
        WHERE ID = ?;
      `;
      // Execute the query using the ID parameter passed in the request
      await database.query(loginQRY, [req.params.id]);

      // Return a success message indicating that a record was removed from the database
      res.status(200).json({ msg: "User deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while deleting the user.",
      });
    }
  }
}

// Token generation function
// function createToken(user) {
//   const token = jwt.sign({ emailAdd: user.emailAdd }, 'Air', { expiresIn: '1h' });
//   return token;
// }

class Program {
  // Fetch all coding bootcamp programs
  async retrievePrograms(req, res) {
    try {
      // SQL query to select all coding bootcamp programs
      const query = `SELECT ID, ProgramName, Location, Period, ProgramDescription, imgURL FROM codingPrograms;`;

      // Execute the query to retrieve all programs
      const [rows] = await database.query(query);

      // Return the retrieved program data to the client
      res.status(200).json({ results: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while retrieving coding bootcamp programs.",
      });
    }
  }

  // Fetch a specific program using the program id
  async retrieveProgram(req, res) {
    try {
      // SQL query to select a specific program by ID
      const query = `SELECT ID, ProgramName, Location, Period, ProgramDescription, imgURL FROM codingPrograms WHERE ID = ?;`;

      // Execute the query with the program ID as a parameter
      const [rows] = await database.query(query, [req.params.id]);

      if (!rows.length) {
        // If no program was found with the given ID, return an error
        return res.status(404).json({
          err: "Program not found",
        });
      }

      // Return the retrieved program data to the client
      res.status(200).json({ results: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while retrieving the program.",
      });
    }
  }

  // Add a new coding bootcamp program
  async addProgram(req, res) {
    try {
      // SQL query to insert a new program record
      const query = `INSERT INTO codingPrograms SET ?;`;

      // Execute the query with the request body as the data
      await database.query(query, [req.body]);

      // Return a success message
      res.status(200).json({ msg: "Coding bootcamp program saved" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while adding the program.",
      });
    }
  }

  // Update an existing program using the program id
  async updateProgram(req, res) {
    try {
      // SQL query to update an existing program record
      const query = `UPDATE codingPrograms SET ? WHERE ID = ?;`;

      // Execute the query with the request body and program id as parameters
      await database.query(query, [req.body, req.params.id]);

      // Return a success message
      res.status(200).json({ msg: "Coding bootcamp program updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while updating the program.",
      });
    }
  }

  // Delete an existing program using the program id
  async deleteProgram(req, res) {
    try {
      // SQL query to delete an existing program record
      const query = `DELETE FROM codingPrograms WHERE ID = ?;`;

      // Execute the query with the program id as a parameter
      const result = await database.query(query, [req.params.id]);

      if (result.affectedRows === 0) {
        // If no program was found with the given ID, return an error
        return res.status(404).json({
          err: "Program not found",
        });
      }

      // Return a success message
      res.status(200).json({ msg: "Coding bootcamp program deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while deleting the program.",
      });
    }
  }
}

// -------------------------------------------A class for handling flights-related operations-------------------------------------------------
class Flights {
  // Fetch all flights
  async retrieveFlights(req, res) {
    try {
      // SQL query to select all flights
      const query = `SELECT ID, DepartureCity, DepartureDate, DepartureTime, ArrivalCity, ArrivalDate, ArrivalTime, Price FROM Flights;`;

      // Execute the query to retrieve all flights
      const [rows] = await database.query(query);

      // Return the retrieved flight data to the client
      res.status(200).json({ results: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while retrieving flights.",
      });
    }
  }

  // Fetch a specific flight using the flight id
  async retrieveFlight(req, res) {
    try {
      // SQL query to select a specific flight by ID
      const query = `SELECT ID, DepartureCity, DepartureDate, DepartureTime, ArrivalCity, ArrivalDate, ArrivalTime, Price FROM Flights WHERE ID = ?;`;

      // Execute the query with the flight ID as a parameter
      const [rows] = await database.query(query, [req.params.id]);

      if (!rows.length) {
        // If no flight was found with the given ID, return an error
        return res.status(404).json({
          err: "Flight not found",
        });
      }

      // Return the retrieved flight data to the client
      res.status(200).json({ results: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while retrieving the flight.",
      });
    }
  }

  // Add a new flight
  async addFlight(req, res) {
    try {
      // SQL query to insert a new flight record
      const query = `INSERT INTO Flights SET ?;`;

      // Execute the query with the request body as the data
      await database.query(query, [req.body]);

      // Return a success message
      res.status(200).json({ msg: "Flight saved" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while adding the flight.",
      });
    }
  }

  // Update an existing flight using the flight id
  async updateFlight(req, res) {
    try {
      // SQL query to update an existing flight record
      const query = `UPDATE Flights SET ? WHERE ID = ?;`;

      // Execute the query with the request body and flight id as parameters
      await database.query(query, [req.body, req.params.id]);

      // Return a success message
      res.status(200).json({ msg: "Flight updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while updating the flight.",
      });
    }
  }

  // Delete an existing flight using the flight id
  async deleteFlight(req, res) {
    try {
      // SQL query to delete an existing flight record
      const query = `DELETE FROM Flights WHERE ID = ?;`;

      // Execute the query with the flight id as a parameter
      const result = await database.query(query, [req.params.id]);

      if (result.affectedRows === 0) {
        // If no flight was found with the given ID, return an error
        return res.status(404).json({
          err: "Flight not found",
        });
      }

      // Return a success message
      res.status(200).json({ msg: "Flight deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while deleting the flight.",
      });
    }
  }
}

// -------------------------------------------A class for handling bookings-related operations-------------------------------------------------
class Bookings {
  // Fetch bookings for a specific user
  async retrieveBookings(req, res) {
    try {
      // SQL query to select bookings for a specific user
      const query = `SELECT UserID, DepartureCity, DepartureDate, DepartureTime, ArrivalCity, ArrivalDate, ArrivalTime, Price FROM Bookings INNER JOIN Flights ON Bookings.ID = Flights.ID WHERE UserID = ?;`;

      // Execute the query with the user ID as a parameter
      const [rows] = await database.query(query, [req.params.id]);

      if (!rows.length) {
        // If no bookings were found for the user, return an error
        return res.status(404).json({
          err: "No bookings found for this user.",
        });
      }

      // Return the retrieved booking data to the client
      res.status(200).json({ results: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while retrieving bookings.",
      });
    }
  }

  // Add a new booking
  async addBooking(req, res) {
    try {
      // SQL query to insert a new booking record
      const query = `INSERT INTO Bookings SET ?;`;

      // Execute the query with the request body as the data
      await database.query(query, [req.body]);

      // Return a success message
      res.status(200).json({ msg: "Booking saved" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while adding the booking.",
      });
    }
  }

  // Update an existing booking using the booking id
  async updateBooking(req, res) {
    try {
      // SQL query to update an existing booking record
      const query = `UPDATE Bookings SET ? WHERE ID = ?;`;

      // Execute the query with the request body and booking id as parameters
      await database.query(query, [req.body, req.params.id]);

      // Return a success message
      res.status(200).json({ msg: "Booking updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while updating the booking.",
      });
    }
  }

  // Delete an existing booking using the booking id
  async deleteBooking(req, res) {
    try {
      // SQL query to delete an existing booking record
      const query = `DELETE FROM Bookings WHERE ID = ?;`;

      // Execute the query with the booking id as a parameter
      const result = await database.query(query, [req.params.id]);

      if (result.affectedRows === 0) {
        // If no booking was found with the given ID, return an error
        return res.status(404).json({
          err: "Booking not found",
        });
      }

      // Return a success message
      res.status(200).json({ msg: "Booking deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        err: "An error occurred while deleting the booking.",
      });
    }
  }
}

// Export the User, Program, Flights, and Bookings classes
module.exports = {
  User,
  Program,
  Flights,
  Bookings,
};