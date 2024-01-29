var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    dateDebut: {
        type: Date,
        required: true,
      },
      endpoint: {
        
          type: mongoose.Schema.Types.ObjectId,
            ref: 'Endpoint',
            required: true,
      },
      endDate: {
        type: Date,
      },
      response: {
        status: {
            type: Number,
          },
          text: {
            type: String,
          },
      },
      level: {
        type: String,
        enum: ['info', 'success', 'error', 'empty'],
        default: 'info',
      },
    });

    var Log = mongoose.model("Log", schema);
    module.exports = Log;