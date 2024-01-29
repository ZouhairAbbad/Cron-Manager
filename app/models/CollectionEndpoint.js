var mongoose = require('mongoose');
const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Assurez-vous que le champ 'name' est unique
      },
      method: {
        type: String,
        required: true,
        enum : validMethods,
      },
      url: {
        type: String,
        required: true,
      },
      cron: {
        type: String,
        required: true,
        validate: {
          validator: (value) => /\S+ \S+ \S+ \S+ \S+/.test(value), // Valider l'expression Cron
          message: props => `${props.value} n'est pas une expression Cron valide!`
        },
      },
      isActive: {
        type: Boolean,
        default: true, // Vous pouvez ajuster la valeur par défaut en fonction de vos besoins
      },
    });

    var Endpoint = mongoose.model("Endpoint", schema);
    module.exports = Endpoint;