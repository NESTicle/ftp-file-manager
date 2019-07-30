(function () {
    'use strict';

    let app = angular.module('calipsuApp');

    app.component('procesoEstrategico', {
        templateUrl: '/angular/components/procesos/estrategico/estrategicoComponent.html',
        controllerAs: 'vm',
        controller: function ($scope, $window) {
            let vm = this;
            vm.procesos = [
                {
                    Order: 1,
                    Nombre: 'Direccionamiento y Planeación Estratégica',
                    Path: '/Documentacion/1.DIRECCIONAMIENTO Y PLANEACION ESTRATEGICA',
                    Img: 'direccionamiento.png',
                    Subprocesos: [
                        {
                            Nombre: 'Planeación Estratégica',
                            Path: '/PLANEACION ESTRATEGICA'
                        },
                        {
                            Nombre: 'Gestión de Proyectos',
                            Path: '/GESTION DE PROYECTOS'
                        },
                        {
                            Nombre: 'Responsabilidad Social',
                            Path: '/RESPONSABILIDAD SOCIAL'
                        }
                    ]
                },
                {
                    Order: 2,
                    Nombre: 'Desarrollo Organizacional',
                    Path: '/Documentacion/2.DESARROLLO ORGANIZACIONAL',
                    Img: 'desarrollo_organizacional.png',
                    Subprocesos: [
                        {
                            Nombre: 'Arquitectura Empresarial',
                            Path: '/ARQUITECTURA EMPRESARIAL'
                        },
                        {
                            Nombre: 'Gestión de Riesgos',
                            Path: '/GESTION DE RIESGOS'
                        }
                    ]
                },
                {
                    Order: 3,
                    Nombre: 'Gestión Comercial',
                    Path: '/Documentacion/3.GESTION COMERCIAL',
                    Img: 'gestion_comercial.png',
                    Subprocesos: []
                }
            ];

            vm.onInitEstrategico = () => {
                const url = new URL($window.location.href);
                let procesoUrl = url.searchParams.get('proceso');
                let tipoProcesoUrl = url.searchParams.get('tipo');

                let procesoFiltrado = vm.procesos.filter(i => i.Nombre === procesoUrl)[0];

                vm.proceso = procesoFiltrado;
                vm.proceso.Tipo = tipoProcesoUrl;

                vm.subprocesos = procesoFiltrado.Subprocesos;
            };
        }
    });
})();