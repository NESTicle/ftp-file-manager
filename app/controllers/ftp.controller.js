const ftp = require('ftp');
const fs = require('fs');

exports.GetAllFiles = (req, res) => {
    let path = req.params.route;
    let route = path.charAt(0) === '/' ? `/docs${path}` : `/docs/${path}`;
    let ftpClient = new ftp();

    ftpClient.on('ready', () => {
        ftpClient.list(route, (err, list) => {
            if (err) {
                return res.status(500).send({
                    data: null,
                    message: `La carpeta solicitada no existe - ${err}`
                }).end();
            }

            if (list && list.length > 0) {
                list.map(i => {
                    if (i.type !== 'd')
                        i.size = bytesToSize(i.size);

                    return i;
                });
            }

            res.status(200).json({
                status: 200,
                data: list
            });
            res.end();
            ftpClient.destroy();
        });
    }).connect({
        host: "10.240.8.229",
        port: 21,
        user: "usrapli",
        password: "usr4pl1$",
    });

    ftpClient.on('close', (err) => {
        if (err) {
            return res.status(500).send({
                data: null,
                message: `Hubo un error al cerrar la conexión con el servidor ftp ${err}`
            }).end();
        }
    });
};

exports.FindFile = (req, res) => {
    let searchParam = req.body.search;
    let json = JSON.parse(fs.readFileSync(`./mapper/mapper.json`, 'utf8'));

    if (!json) {
        res.status(500).json({
            status: 200,
            message: 'Se ha encontrado un error, el archivo json no existe'
        });
    }

    let filtered = findStringInJson(json, searchParam.trim().toLowerCase());

    if(filtered && filtered.length > 0) {
        filtered.map(i => {
            if (i.type !== 'd')
                i.size = bytesToSize(i.size);

            return i;
        });
    }

    res.status(200).json({
        status: 200,
        data: filtered
    }).end();
};

exports.IsPasswordCorrect = (req, res) => {
    let password = req.body.password;

    if (!password) {
        res.status(500).json({
            status: 500,
            message: 'No se ha diligenciado la contraseña'
        });
    }

    let isPasswordCorrect = password === 'calidadips';
    res.status(200).json({
        status: 200,
        data: isPasswordCorrect
    }).end();
};

let findStringInJson = (source, name) => {
    let itemList = [];

    for (key in source) {
        let item = source[key];

        if (item.name.trim().toLowerCase().includes(name) && item.type !== 'd')
            itemList.push(item);

        if (item.Subcarpeta && item.Subcarpeta.length > 0) {
            let subresult = findStringInJson(item.Subcarpeta, name.trim().toLowerCase()).filter(i => i.type !== 'd');

            if (subresult !== undefined && subresult.length > 0) {
                subresult.map(a => {
                    itemList.push(a);
                });
            }
        }
    }

    return itemList;
}

let bytesToSize = bytes => {
    if (bytes === 0) return '-';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;

    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}