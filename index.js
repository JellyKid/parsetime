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
  var unix = null;
  var natural = null;
  var tzOffset = (new Date()).getTimezoneOffset() * 60;
  if(parseFloat(path) > 0){
    unix = parseFloat(path);
    natural = dateFormat((unix + tzOffset) * 1000, 'mmmm d, yyyy, h:MM TT');
  }
  if(isNaN(parseFloat(path))){
    unix = Math.round((Date.parse(path) + tzOffset)/ 1000);
    natural = path || null;
  }
  res.send(JSON.stringify({
    unix: unix,
    natural: natural
  }));
};
