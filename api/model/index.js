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

  // Create a new user and save their information in the database
  async register(req, res) {
    // Get user information from the request body
    let detail = req.body;
    // Hash the user's password using bcrypt with a cost factor of 15
    detail.UserPassword = await hash(detail.UserPassword, 15);
    // Set user information that will be used for authentication
    let user = {
      Email: detail.Email,
      UserPassword: detail.UserPassword,
    };
    // SQL query to insert a new user into the database
    const loginQRY = `
        INSERT INTO Users
        SET ?;
    `;
    // Execute the query with user information as a parameter
    database.query(loginQRY, [detail], (err) => {
      if (err) {
        // If there's an error, return an error message
        res.status(401).json({ err });
      } else {
        // If successful, create a JSON Web Token and save it in a cookie with a duration of 1 hour
        const jwToken = createToken(user);
        res.cookie("LegitUser", jwToken, {
          maxAge: 3600000,
          httpOnly: true,
        });
        // Return a success message
        res.status(200).json({ msg: "A user record was saved." });
      }
    });
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





// -------------------------------------------A class for handling programs-related operations-------------------------------------------------
class Program {
  // Fetch all products
  retrievePrograms(req, res) {
    const loginQRY = `SELECT ID, ProgramName, Location, 
        Period, ProgramDescription, imgURL
        FROM VolunteerPrograms;`;
    // Run the SQL query
    database.query(loginQRY, (err, results) => {
      if (err) throw err;
      // Return the query results
      res.status(200).json({ results: results });
    });
  }
  // Fetch a specific product using the program id
  retrieveProgram(req, res) {
    const loginQRY = `SELECT ID, ProgramName, Location, 
    Period, ProgramDescription, imgURL
    FROM VolunteerPrograms
        WHERE ID = ?;`;
    // Run the SQL query with a parameterized query
    database.query(loginQRY, [req.params.id], (err, results) => {
      if (err) throw err;
      // Return the query results
      res.status(200).json({ results: results });
    });
  }
  // Add a new program
  addProgram(req, res) {
    const loginQRY = `
        INSERT INTO VolunteerPrograms
        SET ?;
        `;
    // Run the SQL query with the request body as the data
    database.query(loginQRY, [req.body], (err) => {
      if (err) {
        // Return an error if the query fails
        res.status(400).json({ err: "Unable to insert a new record." });
      } else {
        // Return a success message if the query succeeds
        res.status(200).json({ msg: "VolunteerPrograms saved" });
      }
    });
  }
  // Update an existing product using the product id
  updateProgram(req, res) {
    const loginQRY = `
        UPDATE VolunteerPrograms
        SET ?
        WHERE ID = ?
        `;
    // Run the SQL query with the request body and product id as parameters
    database.query(loginQRY, [req.body, req.params.id], (err) => {
      if (err) {
        // Return an error if the query fails
        res.status(400).json({ err: "Unable to update record." });
      } else {
        // Return a success message if the query succeeds
        res.status(200).json({ msg: "VolunteerPrograms updated" });
      }
    });
  }
  // Delete an existing product using the product id
  deleteProgram(req, res) {
    const loginQRY = `
        DELETE FROM VolunteerPrograms
        WHERE ID = ?;
        `;
    // Run the SQL query with the product id as a parameter
    database.query(loginQRY, [req.params.id], (err) => {
      if (err) res.status(400).json({ err: "The record was not found." });
      // Return a success message if the query succeeds
      res.status(200).json({ msg: "A VolunteerPrograms was deleted." });
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

        database.query(loginQRY,(err, data) =>{
            if(err){
                console.log(err);
                res.status(400).json({err: "The Cart is empty"});
            } 
            else res.status(200).json({results: data})
        })
    }

    addBooking(req, res) {
        const loginQRY = 
        `
        INSERT INTO Bookings
        SET ?;
        `;
        database.query(loginQRY,[req.body],
            (err)=> {
                if(err){
                    res.status(400).json({err: "Could not add to the Booking"});
                }else {
                    res.status(200).json({message: "Added to the Booking"});
                }
            }
        );   
    }

    deleteBooking(req, res) {
        const loginQRY = 
        `
        DELETE FROM Bookings
        WHERE ID = ?; `
        database.query(loginQRY,[req.params.id], (err)=> {
            if(err) res.status(400).json({err: "The flight was not found."});
            res.status(200).json({message: "A flight was deleted."});
        })
    }

    updateBooking(req, res) {
        const loginQRY = 
        `
        UPDATE Bookings
        SET ?
        WHERE ID = ?
        `;
        database.query(loginQRY,[req.body, req.params.id],
            (err)=> {
                if(err){
                    res.status(400).json({err: "Unable to update a record."});
                }else {
                    res.status(200).json({message: "Flight updated"});
                }
            }
        );    

    }

}






// Export the user and product class
module.exports = {
  User,
  Program,
  Flights,
  Bookings
};
