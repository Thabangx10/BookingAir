// Import the express library
const express = require("express");
// Import the path library
const path = require("path");
// Import the body-parser library
const bodyParser = require("body-parser");
// Create an express router
const route = express.Router();
// Import the User, Program, flights models
const { User, Program, Flights, Bookings } = require("../model"); // Make sure your model exports are correctly named

// Set up the route for the homepage
// This route matches either the root URL or /VolunteerVentures
// It sends the index.html file located in the view directory
route.get("^/$|/BookingAir", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../view/index.html"));
});

// Set up the routes for the user endpoints
const user = new User(); // Create an instance of the User class

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
route.patch("/user/:id", bodyParser.json(), (req, res) => {
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
const program = new Program(); // Create an instance of the Program class

// ------------------------------Coding Programs route-------------------------------------------
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

// Set up the routes for the flights endpoints
const flights = new Flights(); // Create an instance of the Flights class

// ------------------------------Flights route-------------------------------------------
route.get("/flights", (req, res) => {
  flights.retrieveFlights(req, res);
});
// Fetch single flight route
route.get("/flight/:id", (req, res) => {
  flights.retrieveFlight(req, res);
});
// Create flight route
route.post("/flight", bodyParser.json(), (req, res) => {
  flights.addFlight(req, res);
});
// Update flight route
route.put("/flight/:id", bodyParser.json(), (req, res) => {
  flights.updateFlight(req, res);
});
// Delete flight route
route.delete("/flight/:id", (req, res) => {
  flights.deleteFlight(req, res);
});

// Set up the routes for the bookings endpoints
const booking = new Bookings(); // Create an instance of the Bookings class

// ----------------------------------------------Bookings---------------------------------------------

// Retrieve all bookings for a specific user
route.get("/user/:id/bookings", (req, res) => {
  booking.retrieveBookings(req, res);
});

// Create booking route
route.post("/user/:id/booking", bodyParser.json(), (req, res) => {
  booking.addBooking(req, res);
});
// Update booking route
route.put("/user/:id/booking/:id", bodyParser.json(), (req, res) => {
  booking.updateBooking(req, res);
});
// Delete booking route
route.delete("/user/:id/booking/:id", (req, res) => {
  booking.deleteBooking(req, res);
});

// Export the router
module.exports = route;