var pomelo = require('pomelo');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'landserver');
//配置全局
app.configure('production|development',function () {
    app.loadConfig("mysql", app.getBase() + "/config/mysql.json"); // 添加配置
});
// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });

});
//配置register的连接
app.configure('production|development', 'register', function(){
    app.set('connectorConfig',
        {
            connector : pomelo.connectors.hybridconnector,
            useProtobuf : true
        });

});
//为服务器配置数据库
app.configure('production|development','connector|register',function () {
    var dbclient = require("./app/dao/mysql/mysql.js").init(app); // 初始化dbclient
    app.set("dbclient", dbclient);// dbclient 为外部数据库接口，app,get("dbclient") 来使用
});
// start app
app.start();
process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
