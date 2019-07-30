(function () {
    'use strict';

    let app = angular.module('calipsuApp');

    app.component('fileIcon', {
        templateUrl: '/angular/components/fileIcon/fileIconComponent.html',
        bindings: {
            file: '<'
        },
        controllerAs: 'vm',
        controller: function () {
            this.$onInit = () => {
                this.init();
            };

            this.$onChanges = () => {
                this.init();
            };

            this.init = () => {
                let icon = '',
                    color = '';

                // Si es una carpeta asignarle el valor
                if(this.file.type === 'd')
                {
                    this.fileIcon = 'mdi-folder';
                    this.iconColor = '#ff8100';
                    return;
                }

                let fileFormat = this.file.name.toLowerCase().split('.').pop();
                switch (fileFormat) {
                    case 'doc':
                    case 'docx':
                    case 'wpd':
                    case 'odt':
                        icon = 'mdi-file-word-box';
                        color = '#3498db';
                        break;
                    case 'ods':
                    case 'xlr':
                    case 'xls':
                    case 'xlsx':
                    case 'xlsm':
                        icon = 'mdi-file-excel-box';
                        color = '#27ae60';
                        break;
                    case 'txt':
                        icon = 'mdi-message-text';
                        color = '#7f8c8d';
                        break;
                    case 'ppt':
                    case 'pptx':
                    case 'pps':
                    case 'odp':
                    case 'ppsx':
                        icon = 'mdi-file-powerpoint-box';
                        color = '#f39c12';
                        break;
                    case 'pdf':
                        icon = 'mdi-file-pdf-box';
                        color = '#c0392b';
                        break;
                    case 'mp4':
                    case 'mpeg':
                    case 'mpg':
                    case 'avi':
                        icon = 'mdi-video';
                        color = '#34495e';
                        break;
                    case 'mp3':
                    case 'wma':
                    case 'flac':
                    case 'ogg':
                    case 'wav':
                        icon = 'mdi-speaker';
                        color = '#2c3e50';
                        break;
                    case 'zip':
                    case 'rar':
                    case '7z':
                        icon = 'mdi-zip-box';
                        color = '#bdc3c7';
                        break;
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                    case 'bmp':
                    case 'gif':
                    case 'tif':
                    case 'tiff':
                        icon = 'mdi-image';
                        color = '#f952ae';
                        break;
                    case 'js':
                    case 'cs':
                    case 'html':
                    case 'css':
                    case 'xml':
                    case 'cshtml':
                        icon = 'mdi-code-array';
                        color = '#9b59b6';
                        break;
                    default:
                        icon = 'mdi-file';
                        color = '#212529';
                        break;
                }

                this.fileIcon = icon;
                this.iconColor = color;
            };
        }
    });
})();