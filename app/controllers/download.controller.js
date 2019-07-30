const fs = require('fs');
const ftp = require('ftp');
const path = require('path');
const mime = require('mime');
const urlencode = require('urlencode');

exports.DownloadFile = (req, res) => {
    let route = `/docs/${req.params.route}`;
    let fileName = route.split('/').pop();
    let ftpClient = new ftp();

    ftpClient.on('ready', () => {
        ftpClient.get(route, (err, stream) => {
            if (err) {
                return res.status(500).send({
                    data: null,
                    message: `Ha ocurrido un error al intentar descargar el archivo solicitado ${err}`
                }).end();
            }

            stream.once('close', () => {
                ftpClient.end();
            });

            if (!fs.existsSync('public/files/')) {
                fs.mkdirSync('public/files/');
            }

            let downloadFile = `public/files/${fileName}`;
            let file = fs.createWriteStream(downloadFile);
            stream.pipe(file);

            stream.on('finish', () => {
                res.status(200).json({
                    status: 200,
                    data: fileName
                });
                res.end();
            });
        });
    }).connect({
        host: "10.240.8.229",
        port: 21,
        user: "usrapli",
        password: "usr4pl1$",
    });

    ftpClient.on('close', err => {
        if (err) throw err;
        console.log('Conexion Cerrada: Download');
    });
};

exports.DownloadFromRoute = (req, res) => {
    let fileName = req.query.path;
    let filePath = `./public/files/${fileName}`;

    res.download(filePath, fileName), err => {
        if(err)
        {
            res.status(500).json({
                status: 500,
                error: err
            });
            res.end();
        }
    };
};