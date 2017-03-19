var http = require('http');
var fs = require('fs');

function serveStaticFile(res, path, contentType, responsiveCode) {
    if (!responsiveCode) {
        responsiveCode = 200;
    }
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, {"content-type": "text/plain"});
            res.end("500 - Internal Error");
        } else {
            res.writeHead(responsiveCode, {"content-type": contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "");
    switch (path) {
        case "":
            serveStaticFile(res, "/public/index.html", "text/html");
            break;
        case "/public/style/bootstrap.css":
            serveStaticFile(res, "/public/style/bootstrap.css", "text/css");
            break;
        case "/public/style/main.css":
            serveStaticFile(res, "/public/style/main.css", "text/css");
            break;
        case "/public/image/linus-torvalds.jpg":
            serveStaticFile(res, "/public/image/linus-torvalds.jpg", 
                    "image/jpeg");
            break;
        default:
            serveStaticFile(res, "/public/404.html", "text/html", 404);
            break;
    }
}).listen(3000);

console.log("Nodejs Server started at localhost:3000, " +
        "press ctrl-c to terminated");
