const Log = require("../models/CollectionLog");
const Endpoint = require('../models/CollectionEndpoint');

// Create and Save a new Log entry
exports.createLogEntry = async (req) => {
    try {
     // Assuming req.body contains endpointId for the association
      
  
      const logEntry = new Log({
        dateDebut: new Date(),
        endpoint: req.body.endpoint,
         endDate:null,

        // Other log fields from req.body
      });
  
      await logEntry.save();
      //res.status(201).json({ logEntry, message: "Log entry created successfully!" });
      return logEntry._id
    } catch (error) {
      console.error("Error creating log entry:", error);
      //res.status(500).json({ message: "Internal server error" });
      return null
    }
  };

 
  // exports.findLogByEndpointId = (req, res) => {
  //   const endpointId = req.params.endpointId; // Assuming the logId is in the URL parameter
  
  //   Log.find({endpoint: endpointId})
  //     .populate('endpoint')
  //     .exec((err, log) => {
  //       if (err) {
  //         console.error("Error retrieving Log:", err);
  //         return res.status(500).json({ error: 'Internal Server Error' });
  //       }
  
  //       if (!log) {
  //         return res.status(404).json({ message: 'Log not found' });
  //       }
  
  //       // Log entry with populated 'endpoint' field
  //       res.status(200).json(log);
  //     });
  // };

  exports.findLogsByEndpointId = async (req, res) => {
    try {
      const endpointId = req.params.endpointId;
  
      // Recherche des logs associés à l'endpointId
      const logs = await Log.find({ endpoint: endpointId }).populate('endpoint');
  
      // Vérifie si des logs ont été trouvés
      if (!logs || logs.length === 0) {
        return res.status(404).json({ message: 'Logs not found for the specified endpointId' });
      }
  
      // Répond avec la liste des logs
      res.status(200).json(logs);
    } catch (error) {
      console.error("Error retrieving logs by endpointId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  exports.updateEndDate = (req) => {
    const logId = req.params.logId; // Assuming the logId is in the URL parameter
    const  endDate  = new Date();
    const response = {
      status: req.body.status,
      text: req.body.text,
      level: req.body.level, // Ajoutez le champ level
    };
  
    // if (!endDate) {
    //   return res.status(400).json({ message: 'endDate is required in the request body' });
    // }
  
    Log.findByIdAndUpdate(
      logId,
       {endDate , response } ,
      { new: true, useFindAndModify: false }
    )
      .exec((err, updatedLog) => {
        if (err) {
          console.error('Error updating endDate:', err);
          //return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (!updatedLog) {
          //return res.status(404).json({ message: 'Log not found' });
        }
  
        //res.status(200).json(updatedLog);
      });
  };



  