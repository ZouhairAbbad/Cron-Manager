const cron = require('node-cron');
const axios = require('axios');
const { createLogEntry, updateEndDate } = require('./app/controllers/controllerLog');
const Endpoint = require('./app/models/CollectionEndpoint');

// // Sheduler.js
const executeEndpoint = async (endpoint) => {
    try {
      console.log("calling", endpoint.url);
      const logEntry = await createLogEntry({
        body: {
          endpoint: endpoint._id,
        },
      });
  
      const response = await axios({
        method: endpoint.method,
        url: endpoint.url,
      });
  
      // Ajoutez des logs pour vérifier le statut de la réponse et la valeur de level
      console.log('Response status:', response.status);
  
      let level;
      if (response.status === 200) {
        level = 'success';
      } else if (response.status >= 400 && response.status < 500) {
        level = 'error';
      } else {
        level = 'info';
      }
  
      console.log('Level (before updateEndDate):', level);
  
      await updateEndDate({
        params: logEntry, // logEntry
        body: {
          status: response.status,
          text: response.statusText,
          level: level,
        },
      });
  
      console.log(`Endpoint "${endpoint.name}" exécuté avec succès.`);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de l'endpoint :`, error.message);
    }
  };

  
const jobs={}
const scheduleEndpointExecution = (endpoint) => {
    try {
        
       const job = cron.schedule(endpoint.cron, () => {
            console.log(`Planification de l'exécution de l'endpoint "${endpoint.name}"...`);
            executeEndpoint(endpoint);
        });
        jobs[endpoint.name]=job;
        console.log(`Endpoint "${endpoint.name}" scheduled successfully.`);
    } catch (error) {
        console.error(`Error scheduling endpoint "${endpoint.name}":`, error.message);
    }
};

const stopJob = (name)=>{
    const job = jobs[name];
    job.stop();
    console.log("Success Stop Job",name)
}
// Fonction pour initialiser le processus d'exécution
const init = async () => {
    try {
        // Récupère les endpoints actifs depuis la base de données en utilisant Mongoose
        const endpoints = await Endpoint.find({ isActive: true });

        if (!endpoints || endpoints.length === 0) {
            console.error("Aucun endpoint actif trouvé dans la base de données.");
            return;
        }

        // Planifie l'exécution en fonction du cron spécifié pour chaque endpoint
        endpoints.forEach((endpoint) => {
            console.log()
            scheduleEndpointExecution(endpoint);
        }
        );

        console.log("Serveur Node.js en attente d'exécution des endpoints.");
    } catch (error) {
        console.error("Erreur lors de l'initialisation :", error.message);
    }
};


module.exports = { init,scheduleEndpointExecution,stopJob };

