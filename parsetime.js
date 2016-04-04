var dateFormat = require('dateformat');

function parsePath(path) {
  return path.replace(/(\/)|(\%20)/g,function(match,p1,p2){
    if(p1){
      return '';
    }
    if(p2){
      return ' ';
    }
  });
}


module.exports = function(req,res){
  var path = parsePath(req.path);
  if(/\d{10}/.test(path)){
    unix = Number.parseFloat(path);
    natural = dateFormat(unix * 1000, 'mmmm d, yyyy');
    console.log(new Date(unix * 1000));
  } else {
    unix = Date.parse(path) / 1000;
    natural = path;
  }
  if(isNaN(unix) && natural === 'Invalid Date'){
    unix = null;
    natural = null;
  }
  res.send(JSON.stringify({
    unix: unix,
    natural: natural
  }));
};
