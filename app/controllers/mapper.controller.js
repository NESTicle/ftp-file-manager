const fs = require('fs');
const ftp = require('ftp');

exports.Mapping = (req, res) => {
  let path = `/docs/`;
  ftpPathMapper(path);
};

let ftpPathMapper = async (folder) => {
  let listaArchivosCarpetas = await returnPathDocumentList(folder).then(list => list);

  let json = JSON.stringify(listaArchivosCarpetas);
  fs.writeFileSync(`./mapper/new_mapper.json`, json);
};

let returnPathDocumentList = async (path) => {
  return await new Promise((resolve, reject) => {
    let ftpClient = new ftp();

    ftpClient.on('ready', () => {
      ftpClient.list(path, (err, files) => {
        console.log('Current Path:', path);
        console.log('Files:', files);

        if (err)
          reject(err);

          Promise.all(files.map(async (file) => {
            let folderPath = `${path}/${file.name}/`.replace('//', '/');

            let currentRes = {
              name: file.name,
              type: file.type,
              size: file.size,
              path: folderPath,
              Subcarpeta: []
            };

            if (currentRes.type === 'd')
              currentRes.Subcarpeta = await returnPathDocumentList(folderPath);

            return currentRes;
          })).then(s => {
            resolve(s);
          });

        // if (files.length > 0) {
          
        // }
      });
    }).connect({
      host: "10.240.8.229",
      port: 21,
      user: "usrapli",
      password: "usr4pl1$",
      keepalive: 1000000,
      connTimeout: 1000000,
    });

    ftpClient.on('error', err => {
      console.error(err);
    })
  })
};
