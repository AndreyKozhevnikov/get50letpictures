let ImageItem = require('./models/ImageItem.js');
let mongoUri = require('./models/mongoUriStore.js');
let fs = require('fs');
let mongoose = require('mongoose');
//let mongoDB ='mongodb://localhost:27017/getImageTest';
let mongoDB =mongoUri();
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true  });

async function getImages(){
  let item_list;
  try{
  item_list = await ImageItem.find({IsDownloaded:{ $exists: false }},(err)=>{
    if (err){
      console.log(err);
    }
  });
  console.log('count: '+item_list.length);
  }catch(err){
    if (err){
      console.log(err);
    }
  }
if (item_list!=null){
  console.log('startforeach');
  fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
  
  item_list.forEach(x=>{
    fs.writeFile('./Images/'+x.Name+'.jpg',x.Data,(err)=>{
     if (err){
       console.log(err);
     }
    });
    x.IsDownloaded=true;
    x.save((err)=>{
      if (err){
        console.log(err);
      }
    });
    console.log('done - ' + x.Name);
    });
  }
  console.log('done!');
  process.exit(1);
}
getImages();



