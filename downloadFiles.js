let ImageItem = require('./models/ImageItem.js');
let fs = require('fs');
let mongoose = require('mongoose');
//let mongoDB ='mongodb://localhost:27017/getImageTest';
let mongoDB ='mongodb+srv://testName:testPass@cluster0.mergb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true  });

async function getImages(){
  let item_list = await ImageItem.find({IsDownloaded:{ $exists: false }});
  item_list.forEach(x=>{
    fs.writeFile('./Images/'+x.Name+'.jpg',x.Data,(err)=>{
console.log('2' + err);
    });
    x.IsDownloaded=true;
    x.save((err)=>{console.log('1' + err);});
    console.log('done' + x.Name);
  });
}
getImages();
console.log('done!');
