var moment = require('moment');

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
  if(!path){
    res.redirect(302,'../index.html');
    return;
  }
  var unix = null;
  var natural = null;
  if(parseFloat(path) >= 0){ ///numeral input
    unix = parseFloat(path);
    natural = moment.unix(unix).utc().format('MMMM DD, YYYY, h:mm A');
  }
  if(isNaN(parseFloat(path)) && moment(path).isValid()){///natural input
    unix = parseFloat(moment.utc(path).format('X'));
    natural = path || null;
  }
  res.send(JSON.stringify({
    unix: unix,
    natural: natural
  }));
};
