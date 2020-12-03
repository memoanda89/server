
class Sockets {
     
constructor(io,myMessage,UserOnline){
     
    this.io =io;
    this.UserOnline = UserOnline;
   this.socketEvents(myMessage);
   this.ultimoNumero = 0;
  
}

getUserOnline() {
 
    return this.io.eio.clientsCount;
}


    socketEvents(myMessage){
     
        this.io.on('connection',function(socket){
            this.UserOnline++;
            socket.emit('numberOfOnlineUsers',this.UserOnline);
            console.log('usuario conectado');
            

    socket.on('send-message',function(data){
        
        myMessage.push(data);
        socket.emit('text-event',myMessage);
        socket.broadcast.emit('text-event',myMessage);
    })
    socket.on('disconnect',function(data){
        this.UserOnline--;
        socket.emit('numberOfOnlineUsers',this.UserOnline);
        console.log('usuario desconectado');
    })
})
      
    }
}
module.exports = Sockets;