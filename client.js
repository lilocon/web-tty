hterm.defaultStorage = new lib.Storage.Local();
hterm.defaultStorage.clear();
var term = new hterm.Terminal();
term.onTerminalReady = function() {
    var socket = io.connect("ws://localhost:3000/");
    var tio = term.io.push();
    tio.onVTKeystroke = function(str) {
        socket.emit("data", str);
    };
    tio.sendString = tio.onVTKeystroke;
    tio.onTerminalResize = function(cols, rows) {
        socket.emit("resize", {cols:cols, rows: rows});
    };
    term.installKeyboard();
    socket.on("data", function(data){
        term.io.print(data);
    });
    socket.on("exit", function(data){
        term.uninstallKeyboard();
        term.io.showOverlay("Connection Closed", null);
    })
};

term.decorate(document.getElementById("terminal"));
