module.exports = function (io) {
  /* 
        判断源头
    */

  io.use((socket, next) => {
    console.log('我是一个中间件');
    return false;
    next();
  })

  // io.origins((origin, callback) => {
  //   console.log(origin);
  //   return callback(origin, false);
  // });

  // io.on('connection', socket=>{
  //     socket.emit('fromService', '进入咯11111')
  // })

  io.of('/chat').on('connection', socket => {
    socket.use()
    socket.on('fromClient', function (data) {
      console.log(data);
    })

    socket.emit('fromService', '进入咯222222');
    socket.on('disconnect', function (data) {
      onlineFlag = false;
      console.log(data + ' - disconnect');
    });
  });
};