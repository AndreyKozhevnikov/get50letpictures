'use strict';
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ImageItemSchema = new Schema({
  Name: {type: String, required: true, max: 100},
  Data: {type: Buffer},
  IsDownloaded: {type:Boolean},
});

module.exports = mongoose.model('ImageItem', ImageItemSchema);
