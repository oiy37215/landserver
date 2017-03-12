/**
 * Created by daidan on 2017/2/19.
 */
module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};
var pomelo = require('pomelo');
Handler.prototype.entry = function(msg, session, next) {
    var sql = 'insert into MyName (name) values(?)';
    var args = ['hello'];
    var dbclient = pomelo.app.get('dbclient');
    dbclient.insert(sql,args,function (err,res) {
        if(err){
            console.log(err);
        }else{
            console.log("chenggongle");
        }
    })
};