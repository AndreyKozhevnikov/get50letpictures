let ImageItem = require('./models/ImageItem.js');
var fs = require('fs'),
   request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
   
  });
};
let mongoose = require('mongoose');
let mongoDB ='mongodb://localhost:27017/getImageTest';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true  });

download('http://194.190.129.43/ships/foto/50letpobedy1.jpg', 'google3.png', function(){
  let item = new ImageItem();
  item.Name='Image-'+formatDate(new Date());
  item.Data =fs.readFileSync('google3.png');
  item.save();
  console.log('done');
});

function formatDate(date) {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}