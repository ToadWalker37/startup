const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

let vehicles = new Array();

// GetVehicles
apiRouter.get('/vehicles', (_req, res) => {
  res.send(JSON.stringify(vehicles));
});

// AddVehicle
apiRouter.post('/vehicle-add', (req, res) => {
  res.send(JSON.stringify(addVehicles(req.body)));
});

// DeleteVehicle
apiRouter.post('/vehicle-delete', (req, res) => {
  res.send(JSON.stringify(deleteVehicles(req.body)));
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function addVehicles(vehicle) {
  vehicles.push(vehicle);
  return vehicles;
}

function deleteVehicles(vehicle) {
  let vehicleIndex = vehicles.indexOf(vehicle);
  const vehiclesIterator = vehicles.entries();
  vehicles = [];
  for (let vehicleInList of vehiclesIterator) { if (vehicleInList[1].ListingID.localeCompare(vehicle.ListingID) !== 0) { vehicles.push(vehicleInList[1]); } }
  return vehicles;
}