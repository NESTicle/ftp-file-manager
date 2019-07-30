(function () {
    'use strict';

    let app = angular.module('calipsuApp');

    app.component('procesoApoyo', {
        templateUrl: '/angular/components/procesos/apoyo/apoyoComponent.html',
        controllerAs: 'vm',
        controller: function ($scope, $window) {
            let vm = this;

            vm.procesos = [
                {
                    Order: 1,
                    Nombre: 'Gestión Ambiental',
                    Path: '/Documentacion/14. GESTION AMBIENTAL'
                },
                {
                    Order: 2,
                    Nombre: 'Gestión de la Información',
                    Path: '/Documentacion/11.GESTION DE LA INFORMACION-',
                    Img: 'gestion_informacion.png',
                    Subprocesos: [
                        {
                            Nombre: 'Gestión de la Información Asistencial y Administrativa',
                            Path: '/GESTION DE LA INFORMACION ASISTENCIAL Y ADMINISTRATIVA'
                        },
                        {
                            Nombre: 'Gestión Documental',
                            Path: '/GESTION DOCUMENTAL'
                        },
                        {
                            Nombre: 'Desarrollo de Software',
                            Path: '/DESARROLLO DEL SOFTWARE'
                        }
                    ]
                },
                {
                    Order: 3,
                    Nombre: 'Gestión de la Infraestructura',
                    Path: '/Documentacion/8.GESTION DE LA INFRAESTRUCTURA'
                },
                {
                    Order: 4,
                    Nombre: 'Gestión de la Tecnología',
                    Path: '/Documentacion/7.GESTION DE LA TECNOLOGIA',
                    Img: 'tecnologia.png',
                    Subprocesos: [
                        {
                            Nombre: 'Tecnología Biomédica',
                            Path: '/TECNOLOGIA BIOMEDICA'
                        },
                        {
                            Nombre: 'Tecnología Industrial',
                            Path: '/TECNOLOGIA INDUSTRIAL'
                        },
                        {
                            Nombre: 'Tecnologías de la Información y la Comunicación',
                            Path: '/TECNOLOGIAS DE LA INFORMACION Y LA COMUNICACIÓN'
                        }
                    ]
                },
                {
                    Order: 5,
                    Nombre: 'Gestión de las Adquisiciones y Logística',
                    Path: '/Documentacion/6.GESTION DE ADQUISICIONES Y LOGISTICA',
                    Img: 'adquisiciones_logistica.png',
                    Subprocesos: [
                        {
                            Nombre: 'Adquisiciones e inventarios',
                            Path: '/ADQUISICIONES E INVENTARIOS'
                        },
                        {
                            Nombre: 'Logística',
                            Path: '/LOGISTICA'
                        }
                    ]
                },
                {
                    Order: 6,
                    Nombre: 'Gestión de las Comunicaciones',
                    Path: '/Documentacion/10.GESTION DE LAS COMUNICACIONES-'
                },
                {
                    Order: 7,
                    Nombre: 'Gestión de Recursos Financieros',
                    Path: '/Documentacion/13.GESTION DE RECURSOS FINANCIEROS-',
                    Img: 'financieros.png',
                    Subprocesos: [
                        {
                            Nombre: 'Contabilidad',
                            Path: '/CONTABILIDAD'
                        },
                        
                        {
                            Nombre: 'Costos y Presupuesto',
                            Path: '/COSTOS Y PRESUPUESTOS'
                        },
                        {
                            Nombre: 'Facturación ',
                            Path: '/FACTURACION'
                        },
                        {
                            Nombre: 'Radicación, Glosas y Devoluciones',
                            Path: '/RADICACION, GLOSAS Y DEVOLUCIONES'
                        },
                        {
                            Nombre: 'Tesorería (Pagos, Recaudo, Cartera)',
                            Path: '/TESORERIA'
                        }
                    ]
                },
                {
                    Order: 8,
                    Nombre: 'Gestión del Talento Humano',
                    Path: '/Documentacion/9.GESTION DEL TALENTO HUMANO',
                    Img: 'talento_humano.png',
                    Subprocesos: [
                        {
                            Nombre: 'Administración del Talento Humano',
                            Path: '/ADMINISTRACION DEL TALENTO HUMANO'
                        },
                        {
                            Nombre: 'Calidad de Vida',
                            Path: '/CALIDAD DE VIDA'
                        },
                        {
                            Nombre: 'Formación y Desarrollo',
                            Path: '/FORMACION Y DESARROLLO'
                        },
                        {
                            Nombre: 'Seguridad y Salud en el Trabajo',
                            Path: '/SEGURIDAD Y SALUD EN EL TRABAJO'
                        }
                    ]
                },
                {
                    Order: 9,
                    Nombre: 'Gestión Jurídica y Contractual',
                    Path: '/Documentacion/12.GESTION JURIDICA Y CONTRACTUAL-',
                    Img: 'juridica.png',
                    Subprocesos: [
                        {
                            Nombre: 'Gestión Contractual',
                            Path: '/GESTION CONTRACTUAL'
                        },
                        {
                            Nombre: 'Gestión Jurídica',
                            Path: '/GESTION JURIDICA'
                        },
                        {
                            Nombre: 'Sarlaft',
                            Path: '/SARLAFT'
                        }
                    ]
                }
            ];

            vm.onInitApoyo = () => {
                const url = new URL($window.location.href);
                let procesoUrl = url.searchParams.get('proceso');
                let tipoProcesoUrl = url.searchParams.get('tipo');

                let procesoFiltrado = vm.procesos.filter(i => i.Nombre === procesoUrl)[0];
                console.log(procesoFiltrado);

                vm.proceso = procesoFiltrado;
                vm.proceso.Tipo = tipoProcesoUrl;

                vm.subprocesos = procesoFiltrado.Subprocesos;
            };
        }
    });
})();