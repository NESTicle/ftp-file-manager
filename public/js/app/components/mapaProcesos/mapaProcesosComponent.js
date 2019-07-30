(function () {
    'use strict';

    let app = angular.module('calipsuApp');

    app.component('mapaProcesos', {
        templateUrl: '/angular/components/mapaProcesos/mapaProcesosComponent.html',
        controllerAs: 'vm',
        controller: function ($scope, $window) {
            let vm = this;
            vm.procesos = {
                Estrategicos: [
                    {
                        Order: 1,
                        Nombre: 'Direccionamiento y Planeación Estratégica',
                        Path: '/Documentacion/1.DIRECCIONAMIENTO Y PLANEACION ESTRATEGICA',
                        Subprocesos: true
                    },
                    {
                        Order: 2,
                        Nombre: 'Desarrollo Organizacional',
                        Path: '/Documentacion/2.DESARROLLO ORGANIZACIONAL',
                        Subprocesos: true
                    },
                    {
                        Order: 3,
                        Nombre: 'Gestión Comercial',
                        Path: '/Documentacion/3.GESTION COMERCIAL',
                        Subprocesos: false
                    }
                ],
                Misionales: [
                    {
                        Order: 1,
                        Nombre: 'Gestión Clínica',
                        Path: '/Documentacion/4.GESTION CLINICA',
                        Subprocesos: true
                    },
                    {
                        Order: 2,
                        Nombre: 'Gestión de la Docencia, Investigación e Innovación',
                        Path: '/Documentacion/5.GESTION DE LA DOCENCIA, INVESTIGACION E INNOVACION',
                        Subprocesos: true
                    }
                ],
                Apoyo: [
                    {
                        Order: 1,
                        Nombre: 'Gestión Ambiental',
                        Path: '/Documentacion/14. GESTION AMBIENTAL',
                        Subprocesos: false
                    },
                    {
                        Order: 2,
                        Nombre: 'Gestión de la Información',
                        Path: '/Documentacion/11.GESTION DE LA INFORMACION-',
                        Subprocesos: true
                    },
                    {
                        Order: 3,
                        Nombre: 'Gestión de la Infraestructura',
                        Path: '/Documentacion/8.GESTION DE LA INFRAESTRUCTURA',
                        Subprocesos: false
                    },
                    {
                        Order: 4,
                        Nombre: 'Gestión de la Tecnología',
                        Path: '/Documentacion/7.GESTION DE LA TECNOLOGIA',
                        Subprocesos: true
                    },
                    {
                        Order: 5,
                        Nombre: 'Gestión de las Adquisiciones y Logística',
                        Path: '/Documentacion/6.GESTION DE ADQUISICIONES Y LOGISTICA',
                        Subprocesos: true
                    },
                    {
                        Order: 6,
                        Nombre: 'Gestión de las Comunicaciones',
                        Path: '/Documentacion/10.GESTION DE LAS COMUNICACIONES-',
                        Subprocesos: false
                    },
                    {
                        Order: 7,
                        Nombre: 'Gestión de Recursos Financieros',
                        Path: '/Documentacion/13.GESTION DE RECURSOS FINANCIEROS-',
                        Subprocesos: true
                    },
                    {
                        Order: 8,
                        Nombre: 'Gestión del Talento Humano',
                        Path: '/Documentacion/9.GESTION DEL TALENTO HUMANO',
                        Subprocesos: true
                    },
                    {
                        Order: 9,
                        Nombre: 'Gestión Jurídica y Contractual',
                        Path: '/Documentacion/12.GESTION JURIDICA Y CONTRACTUAL-',
                        Subprocesos: true
                    }
                ],
                Evaluacion: [
                    {
                        Order: 1,
                        Nombre: 'Auditoría Interna',
                        Path: '/Documentacion/14.AUDITORIA INTERNA-'
                    },
                    {
                        Order: 2,
                        Nombre: 'Gestión del Mejoramiento',
                        Path: '/Documentacion/15.GESTION DEL MEJORAMIENTO-'
                    }
                ]
            };

            vm.viewSubprocesos = (proceso, tipo) => {
                if(proceso.Subprocesos === false) {
                    $window.location.href = `/ftp?path=${proceso.Path}&tipo=Documentacion`;
                    return;
                }

                $window.location.href = `/mapa?proceso=${proceso.Nombre}&tipo=${tipo}`;
            };
        }
    });
})();