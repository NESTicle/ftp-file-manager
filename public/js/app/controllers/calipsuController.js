(function () {
    'use strict';

    angular.module('calipsuApp').controller('calipsuController', calipsuController);
    calipsuController.$inject = ['ftpService', '$window', '$scope'];

    function calipsuController(ftpService, $window, $scope) {
        var vm = this;

        vm.data = [];
        vm.breadcrumb = [];
        vm.actualRoute = '';
        vm.mapaProceso = true;
        vm.processing = false;
        vm.searching = false;

        // Sort
        vm.reverse = false;
        vm.propertyName = 'name';

        vm.routing = item => {
            vm.processing = true;
            if (item === undefined || item === null) return;

            // Encontrar el Index del Item del Breadcrumb
            let index = vm.breadcrumb.findIndex(i => i === item);

            // Eliminar los items que van despues del Index
            vm.breadcrumb.splice(index + 1, vm.breadcrumb.length - (index + 1));

            // Volver a Buscar en el Ftp
            let path = encodeURIComponent(vm.breadcrumb.join('/'));

            ftpService.getAllFiles(path).then(response => {
                if (response.status === 200) {
                    vm.data = response.data;
                    vm.processing = false;
                } else {
                    vm.printConsoleErrors(response, 'vm.routing');
                }
            });
        };

        vm.getFilesFromFtp = (route, replace = false) => {
            if (replace) vm.breadcrumb = [];

            vm.mapaProceso = false;
            vm.processing = true;

            if (typeof route === 'object')
                vm.breadcrumb = route;
            else
                vm.breadcrumb.push(route);

            let path = encodeURIComponent(vm.breadcrumb.join('/'));

            ftpService.getAllFiles(path).then(response => {
                if (response.status === 200) {
                    vm.data = response.data; //.sort((a, b) => b.type - a.type || b.name - a.name);
                    vm.processing = false;
                } else {
                    vm.printConsoleErrors(response, 'vm.getFilesFromFtp');
                }
            });
        };

        vm.downloadFile = file => {
            vm.processing = true;
            let downloadFile = `${vm.breadcrumb.join().replace(/,/g, '/')}/${file}`;

            if (file.split('.').pop() === 'pdf') {
                vm.processing = false;

                let path = downloadFile.split('/').pop();
                vm.viewPdfFile(path);
                return;
            }

            ftpService.downloadFile(encodeURIComponent(downloadFile)).then(response => {
                if (response.status === 200) {
                    vm.processing = false;
                    console.log('Descargando archivo...');

                    $window.location.href = `http://${$window.location.host}/download?path=${response.data}`;
                } else {
                    vm.printConsoleErrors(response, 'vm.getSpecificFileFromFtp');
                }
            });
        };

        vm.viewPdfFile = file => {
            $window.open(`http://200.24.59.120:85/CalipsuVisor/FileViewer/VerArchivoPdfJs?fileName=${file}`);
        };

        vm.changeRoute = item => {
            switch (item.type) {
                case '-':
                    vm.downloadFile(item.name);
                    break;
                case 'd':
                    vm.getFilesFromFtp(item.name);
                    break;
            }
        };

        vm.getFilesInit = () => {
            const url = new URL($window.location.href);
            let params = url.searchParams.get('path');

            let vieneDeMapaProceso = url.searchParams.get('tipo');
            if (vieneDeMapaProceso) {
                let arrayParams = params.split('/').filter(x => x !== '');
                vm.getFilesFromFtp(arrayParams, true);

                return;
            }

            vm.getFilesFromFtp(params, true);
        };

        vm.searchFiles = search => {
            let actualDirectory = `${vm.breadcrumb.join('/')}`;
            vm.processing = true;
            vm.searching = true;

            if (!search) {
                vm.searching = false;

                vm.getFilesInit();
                return;
            }

            ftpService.searchFiles(search, actualDirectory).then(response => {
                if (response.status === 200) {
                    if (response.data && response.data.length > 0) {
                        vm.data = response.data.map(x => {
                            let list = x.path.split('/').filter(x => x && x !== 'docs');
                            let simple = list.splice(0, list.length - 1).join('/');

                            x.simplePath = simple;
                            return x;
                        });
                    }

                    vm.processing = false;
                } else {
                    vm.printConsoleErrors(response, 'vm.getFilesFromFtp');
                }
            });
        };

        vm.isPasswordCorrect = password => {
            if (!password) return;

            return ftpService.isPasswordCorrect(password).then(response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    vm.printConsoleErrors(response, 'vm.isPasswordCorrect');
                }
            });
        }

        vm.loginPlanMejoramiento = () => {
            swal({
                title: 'Administración',
                text: 'Actualmente esta sección se encuentra restringida, por favor ingrese la contraseña para poder visualizar el contenido',
                icon: 'info',
                content: {
                    element: 'input',
                    attributes: {
                        placeholder: "Ingrese la contraseña",
                        type: "password",
                    }
                },
                button: {
                    text: 'Ingresar',
                    closeModal: false,
                },
            }).then(password => {
                if (!password) throw null;

                return vm.isPasswordCorrect(password);
            }).then(result => {
                if (result) {
                    $window.location.href = `/ftp?path=Planes de Mejoramiento`;
                } else {
                    swal({
                        title: 'Error',
                        text: 'La contraseña que ha escrito es incorrecta',
                        icon: 'warning',
                    });
                }

            });
        }

        vm.sortByColumn = column => {
            vm.reverse = (column !== null && vm.propertyName === column) ? !vm.reverse : false;
            vm.propertyName = column;
        };

        vm.printConsoleErrors = (response, method) => {
            swal({
                title: 'Error',
                text: 'Se han encontrado errores',
                icon: 'error'
            });

            console.error('Información del Error', response);
            console.log(`Controller: calipsuController | Método: ${method}`);

            vm.processing = false;
        };
    };
})();
