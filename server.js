var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pty = require("node-pty");

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/client.html');
});
app.get('/client.js', function (req, res) {
    res.sendfile(__dirname + '/client.js');
});
app.get('/hterm.js', function (req, res) {
    res.sendfile(__dirname + '/hterm.js');
});

app.get('/socket.io.js', function (req, res) {
    res.sendfile(__dirname + '/socket.io.js');
});

io.sockets.on('connection', function (socket) {
    var term = pty.spawn(process.env.SHELL, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });
    term.on('data', function(data) {
        socket.emit("data", data);
    });
    term.on('exit', function(){
        socket.emit("exit", "1");
    });
    socket.on('data', function (data) {
        term.write(data);
    });
    socket.on("resize", function(data){
        term.resize(data.cols, data.rows);
    });
    socket.on('disconnect', function() {
        term.destroy();
    });

});

server.listen(3000);
