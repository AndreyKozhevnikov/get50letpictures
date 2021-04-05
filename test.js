var fs = require('fs'),
   request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('http://194.190.129.43/ships/foto/50letpobedy1.jpg', 'google.png', function(){
  console.log('done');
});