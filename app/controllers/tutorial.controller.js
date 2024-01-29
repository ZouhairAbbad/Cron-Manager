const Endpoint = require("../models/CollectionEndpoint");
const {scheduleEndpointExecution, stopJob } = require("../../scheduler")
// const Endpoint = db.endpoints;

// Create and Save a new Endpoint
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.method || !req.body.url || !req.body.cron) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Endpoint
  const endpoint = new Endpoint({
    name: req.body.name,
    method: req.body.method,
    url: req.body.url,
    cron: req.body.cron,
    isActive: req.body.isActive || true,
  });

  // Save Endpoint in the database
  await endpoint.save().then(data => {
    res.send({
      endpoint: data,
      message: "User created successfully!!",
      
  });
  if (endpoint.isActive) {
    scheduleEndpointExecution(endpoint);
  }
    })
    .catch(err => {
      res.status(500).send({
        message: "Some error occurred while creating the Endpoint."
      });
    });
};

// Retrieve all Endpoints from the database.
exports.findAll = async (req, res) => {
  try {
      const users = await Endpoint.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
  // var requestOptions = {
  //   method: 'GET',
  //   redirect: 'follow'
  // };
  
  // try {
  //   let response = await fetch("http://localhost:8080/api/", requestOptions)
  //   console.log(response)
    
  // } catch (error) {
  //   console.error(error)
  //   return null
  // }
  
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
};

// Find a single Endpoint with an id
// exports.findOne = async (req, res) => {
//   try {
//       const user = await Endpoint.findById(req.params.name);
//       res.status(200).json(user);
//   } catch (error) {
//       res.status(404).json({ message: error.message });
//   }
// };

exports.findOne = async (req, res) => {
  try {
    const endpoint = await Endpoint.findOne({ name:req.params.name });
    console.log('name',req.params.name)
    if (!endpoint) {
      return res.status(404).json({ message: "Endpoint not found" });
    }
    res.status(200).json(endpoint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Endpoint by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });

  }
  const updateData = {
    ...req.body,
    isActive: req.body.isActive || true, // Set the default value or use the provided value
  };
  const id = req.params.id;

  Endpoint.findByIdAndUpdate(id,updateData, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Endpoint with id=${id}. Maybe Endpoint was not found!`
        });
      } else res.send({ message: "Endpoint was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Endpoint with id=" + id
      });
    });
};

exports.updateIsActive = async (req, res) => {
  const id = req.params.id;
  const { isActive } = req.body;

  try {
    // Find the resource by ID
    const endpoint = await Endpoint.findByIdAndUpdate(
      id,
      { isActive }, // Update the isActive field
      { new: true, useFindAndModify: false }
    );

    if (!endpoint) {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (isActive) {
      scheduleEndpointExecution(endpoint);
    }
    else{
      stopJob(endpoint.name)
    }
    // Respond with the updated resource
    res.status(200).json({ message: "isActive updated successfully", endpoint });
  } catch (error) {
    console.error("Error updating isActive:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// exports.update = async (req, res) => {
//   const { name } = req.params;

//   try {
//     const updatedEndpoint = await Endpoint.findOneAndUpdate(
//       { name },
//       { $set: req.body },
//       { new: true, useFindAndModify: false }
//     );

//     if (!updatedEndpoint) {
//       return res.status(404).json({ message: "Endpoint not found" });
//     }

//     return res.status(200).json(updatedEndpoint);
//   } catch (error) {
//     console.error("Error updating endpoint:", error);
//     return res.status(500).json({ message: "Error updating the endpoint" });
//   }
// };


// Delete a Endpoint with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Endpoint.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Endpoint with id=${id}. Maybe Endpoint was not found!`
        });
      } else {
        res.send({
          message: "Endpoint was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Endpoint with id=" + id
      });
    });
};

// Delete all Endpoints from the database.
exports.deleteAll = (req, res) => {
  Endpoint.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Endpoints were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all endpoints."
      });
    });
};


