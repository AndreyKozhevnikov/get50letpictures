let ImageItem = require('./models/ImageItem.js');
var request = require('request');

var download = function(uri,isBack ){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

   request({url:uri, encoding:null}, function (error, response, body) {
   
      let item = new ImageItem();
      item.Name='Image2-'+formatDate(new Date());
      if(isBack){
        item.Name=item.Name+"b";
      }
      item.Data =body;
      item.save((err)=>{});
      console.log('done2');
        // handle errors etc.
    }); 

   
  });
};
let mongoose = require('mongoose');
//let mongoDB ='mongodb://localhost:27017/getImageTest';
//let mongoDB ='mongodb+srv://testName:<testPass>@cluster0.mergb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//let mongoDB ='mongodb+srv://testName:<testPass>@cluster0.mergb.mongodb.net/test';
//let mongoDB ='mongodb+srv://testName:testPass@cluster0.mergb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let mongoDB=process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true  },(err)=>{
  console.log(err);
});

download('http://194.190.129.43/ships/foto/50letpobedy1.jpg',false);
download('http://194.190.129.43/ships/foto/50letpobedy2.jpg',true);

function formatDate(date) {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  let hour =''+ d.getHours();
  let mins ='' + d.getMinutes();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (mins.length < 2) mins = '0' + mins;
  return [year, month, day,hour,mins].join('-');
}