let ImageItem = require('./models/ImageItem.js');
let fs = require('fs');
let mongoose = require('mongoose');
//let mongoDB ='mongodb://localhost:27017/getImageTest';
let mongoDB ='mongodb+srv://testName:testPass@cluster0.mergb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true  });

async function getImages(){
  let item_list = await ImageItem.find();
  item_list.forEach(x=>{
    fs.writeFile('./Images/'+x.Name+'.jpg',x.Data,(err)=>{

    });
  });
}
getImages();
console.log('done!');
function formatDate(date) {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}