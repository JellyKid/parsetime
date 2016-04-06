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
  if(/\d{10,13}/.test(path)){
    var multiplier = /\d{10}/.test(path) ? 1000 : 1;
    unix = parseFloat(path);
    natural = dateFormat(unix * multiplier, 'mmmm d, yyyy');
  } else {
    unix = Date.parse(path) / 1000;
    natural = path || null;
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
