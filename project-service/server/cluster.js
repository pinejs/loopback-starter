var cluster = require('cluster');
var workers = {};

var WorkersLen = function (){
  var len = 0;
  for(var id in workers){
     ++len;
  }
  return len;
};

var createWorker = function (){
    var worker = cluster.fork();
    workers[worker.id] = worker;
    worker.on('exit', function(code){
      delete workers[worker.id];
    });

    worker.on('message', function(msg){
      do {
          if(msg.cmd === 'suicide'){
            createWorker();
            break;
          }
      }while(false);
    });
};

function StartWorkers() {
    var n = 0;
    require('os').cpus().forEach(function(){
      createWorker();
    });
}

if(cluster.isMaster){
  StartWorkers();
  process.on('exit', function(){
    for(var id in workers){
      workers[id].kill();
    }
  });
}else{
  require('./server.js').start();
}
