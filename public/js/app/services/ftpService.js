calipsuApp.factory('ftpService', ['server', server => {
    return {
        downloadFile: route => server.post(`/download/${route}`),
        downloadFileFromRoute: route => server.get(`/download/`, { path: route }),
        getAllFiles: route => server.get(`/ftp/${route}`),
        searchFiles: (search, directory) => server.post(`/ftp/findFiles`, { search: search, directory: directory }),
        isPasswordCorrect: password => server.post('/ftp/isPasswordCorrect', { password: password})
    };
}]);
