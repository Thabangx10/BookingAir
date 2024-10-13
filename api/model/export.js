const { User, Program, Flights, Bookings } = require('./index');

module.exports = {
  user: new User(),
  program: new Program(),
  flights: new Flights(),
  booking: new Bookings(),
};
