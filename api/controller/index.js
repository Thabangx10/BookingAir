// Import the express library
const express = require("express");
// Import the path library
const path = require("path");
// Import the body-parser library
const bodyParser = require("body-parser");
// Create an express router
const route = express.Router();
// Import the User, Program, flights models
const { User, Program, Flights, Bookings } = require("../model");
// Create instances of the User, Program, flights models
const user = new User();
const program = new Program();
const flights = new Flights();
const booking = new Bookings();

// Set up the route for the homepage
// This route matches either the root URL or /VolunteerVentures
// It sends the index.html file located in the view directory
route.get("^/$|/VolunteerVentures", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../view/index.html"));
});

// Set up the routes for the user endpoints


// ------------------------------Login route-------------------------------------------
route.post("/login", bodyParser.json(), (req, res) => {
  user.SignIn(req, res);
});
// Retrieve all users route
route.get("/users", (req, res) => {
  user.retrieveUsers(req, res);
});
// Fetch single user route
route.get("/user/:id", (req, res) => {
  user.retrieveUser(req, res);
});
// Update user route
route.put("/user/:id", bodyParser.json(), (req, res) => {
  user.updateUser(req, res);
});
// Create user route
route.post("/register", bodyParser.json(), (req, res) => {
  user.register(req, res);
});
// Delete user route
route.delete("/user/:id", (req, res) => {
  user.deleteUser(req, res);
});




// Set up the routes for the program endpoints
// ------------------------------Volunteer Programs route-------------------------------------------

route.get("/programs", (req, res) => {
  program.retrievePrograms(req, res);
});
// Fetch single program route
route.get("/program/:id", (req, res) => {
  program.retrieveProgram(req, res);
});
// Create program route
route.post("/program", bodyParser.json(), (req, res) => {
    program.addProgram(req, res);
});
// Update program route
route.put("/program/:id", bodyParser.json(), (req, res) => {
    program.updateProgram(req, res);
});
// Delete program route
route.delete("/program/:id", (req, res) => {
    program.deleteProgram(req, res);
});


// ------------------------------Flights route-------------------------------------------
route.get("/flights", (req, res) => {
    flights.retrieveFlights(req, res);
  });
  // Fetch single flights route
  route.get("/flight/:id", (req, res) => {
    flights.retrieveFlight(req, res);
  });
  // Create flights route
  route.post("/flight", bodyParser.json(), (req, res) => {
    flights.addFlight(req, res);
  });
  // Update flights route
  route.put("/flight/:id", bodyParser.json(), (req, res) => {
    flights.updateFlight(req, res);
  });
  // Delete flights route
  route.delete("/flight/:id", (req, res) => {
    flights.deleteFlight(req, res);
  });


// ----------------------------------------------Bookings---------------------------------------------

// Retrieve all bookings
route.get("/user/:id/bookings", (req, res) => {
  booking.retrieveBookings(req, res);
});

// Create booking route
route.post("/user/:id/booking", bodyParser.json(), (req, res) => {
  booking.addBooking(req, res);
});
// Update bookings route
route.put("/user/:id/booking/:id", bodyParser.json(), (req, res) => {
  booking.updateBooking(req, res);
});
// Delete booking route
route.delete("/user/:id/booking", (req, res) => {
  booking.deleteBooking(req, res);
});





// Export the router
module.exports = route;
