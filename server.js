const http = require('http');
const host = '127.0.0.1';
const port = 3006;
const fs = require('fs');


const server = http.createServer((req, res) =>{
    const urlPath = req.url;
    const os = require('os');
    const host = os.hostname();
    const patform = os.patform;
    const arch = os.arch();
    const cpus = os.cpus();
    const network = os.networkInterfaces();
    const uptime = os.uptime();
    const osinfo = JSON.stringify({
         hostname: host,
         platform: patform,
         architecture: arch,
         numberOfCPUS: cpus,
         networkInterfaces: network,
         uptime: uptime
    });
    if(urlPath === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        fs.readFile('./pages/index.html', (err, data) => {
            if (err) throw err;
            res.write(data);
          });
    }else if(urlPath === '/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        fs.readFile('./pages/about.html', (err, data) => {
            if (err) throw err;
            res.write(data);
          });
    }
    else if(urlPath === '/sys'){
        res.statusCode = 201;
        res.setHeader('Content-Type','text/plain');
        fs.writeFile('./pages/osinfo.json',
        `${osinfo}`,
        function (err) {
            
            if (err) throw err;
            res.end('your os info has been saved sucessfully');
          });
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        fs.readFile('./pages/404.html', (err, data) => {
            if (err) throw err;
            res.write(data);
          });
    }
});

server.listen(port,host,() =>{
    console.log(`Running from ${host}:${port}`);
});