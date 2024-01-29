module.exports = app => {
  const endpoints = require("../controllers/tutorial.controller.js");
  const logs = require("../controllers/controllerLog.js");

  var router = require("express").Router();

  // Create a new Endpoint
  router.post("/create", endpoints.create);

  // Retrieve all Endpoints
  router.get("/", endpoints.findAll);

  // Retrieve a single Endpoint with name
  router.get("/:name", endpoints.findOne);

  // Update a Endpoint with name
  router.put("/:id", endpoints.update);

  // Update a isActive
  app.put('/api/:id/updateIsActive', endpoints.updateIsActive);

  // Delete a Endpoint with id
  router.delete("/:id", endpoints.delete);

  // deleteAll a Endpoint
  router.delete("/", endpoints.deleteAll);


 // router.get('/logs', logs.findAll);
  router.get('/logs/:endpointId', logs.findLogsByEndpointId);

  //router.get("/logs/:EndpointId", logs.findLogByEndpointId);

  //router.put('/logs/:logId/updateEndDate', logs.updateEndDate);

  app.use("/api", router);
};
