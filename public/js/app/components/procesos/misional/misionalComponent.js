(function () {
    'use strict';

    let app = angular.module('calipsuApp');

    app.component('procesoMisional', {
        templateUrl: '/angular/components/procesos/misional/misionalComponent.html',
        controllerAs: 'vm',
        controller: function ($scope, $window) {
            let vm = this;
            vm.visualizarLineaTrabajo = false;

            vm.procesos = [
                {
                    Order: 1,
                    Nombre: 'Gestión Clínica',
                    Path: '/Documentacion/4.GESTION CLINICA',
                    Img: 'gestion_clinica.png',
                    Subprocesos: [
                        {
                            Nombre: 'Admisiones y autorizaciones',
                            Path: 'ADMISIONES Y AUTORIZACIONES'
                        },
                        {
                            Nombre: 'Atención Domiciliaria',
                            Path: 'ATENCION DOMICILIARIA'
                        },
                        {
                            Nombre: 'Ayudas Diagnósticas',
                            Descripcion: '(Aplica para Ecografías, rayos X, mamografías, endoscopias, colonoscopias, electrocardiogramas, pruebas de esfuerzo, ayudas oftalmológicas (angiografías, campos visuales, procedimientos láser, fotografía color), ayudas audiológicas)',
                            Path: 'AYUDAS DIAGNOSTICAS'
                        },
                        {
                            Nombre: 'Cirugía',
                            Path: 'CIRUGIA'
                        },
                        {
                            Nombre: 'Complementación Terapéutica',
                            Descripcion: '(Aplica para los,, diagnóstico cardiovascular; fisioterapia; productos ópticos, ecocardiografía, terapia ocupacional, terapia alternativa, fonoaudiología,  fototerapia, fotodinámica, radiología intervencionista, banco de sangre, terapia respiratoria, hemodiálisis, diálisis peritoneal, electrofisiología, marcapasos y arritmia cardiaca.)',
                            Path: 'COMPLEMENTACION TERAPEUTICA'
                        },
                        {
                            Nombre: 'Consulta Externa',
                            Descripcion: '(CE general, especializada, Salud Oral , Programas especiales, Otras disciplinas)',
                            Path: 'CONSULTA EXTERNA'
                        },
                        {
                            Nombre: 'Internación (Clínica, Quirúrgica)',
                            Path: 'INTERNACION'
                        },
                        {
                            Nombre: 'Referencia y contrarreferencia',
                            Path: 'REFERENCIA Y CONTRARREFERENCIA'
                        },
                        {
                            Nombre: 'Servicio Farmacéutico',
                            Path: 'SERVICIO FARMACEUTICO',
                        },
                        {
                            Nombre: 'Trasplantes',
                            Descripcion: '(Biobanco - servicios de laboratorio terapia celular)',
                            Path: 'TRASPLANTES'
                        },
                        {
                            Nombre: 'UCE-UCI',
                            Path: 'UCE-UCI'
                        },
                        {
                            Nombre: 'Urgencias',
                            Path: 'URGENCIAS'
                        },
                    ],
                    LineasTrabajo: [
                        {
                            Nombre: 'Esterilización',
                            Path: 'ESTERILIZACION'
                        },
                        {
                            Nombre: 'Vigilancia de Salud Pública y Control de Infecciones',
                            Path: 'VIGILANCIA DE SALUD PUBLICA Y CONTROL DE INFECCIONES'
                        },
                        {
                            Nombre: 'Toxicología',
                            Path: 'TOXICOLOGIA'
                        },
                        {
                            Nombre: 'Modelo del Cuidado y Seguridad del Paciente',
                            Path: 'MODELO DEL CUIDADO Y SEGURIDAD DEL PACIENTE'
                        },
                        {
                            Nombre: 'Disciplinas',
                            Path: 'DISCIPLINAS'
                        },
                        {
                            Nombre: 'Especialidades',
                            Path: 'ESPECIALIDADES'
                        },
                    ]
                },
                {
                    Order: 2,
                    Nombre: 'Gestión de la Docencia, Investigación e Innovación',
                    Path: '/Documentacion/5.GESTION DE LA DOCENCIA, INVESTIGACION E INNOVACION',
                    Img: 'docencia.png',
                    Subprocesos: [
                        {
                            Nombre: 'Gestión de Ensayos Clínicos',
                            Path: '/GESTION DE ENSAYOS CLINICOS'
                        },
                        {
                            Nombre: 'Gestión de la Docencia Servicio',
                            Path: '/GESTION DE LA DOCENCIA SERVICIO'
                        },
                        {
                            Nombre: 'Gestión de la Investigación e Innovación',
                            Path: '/GESTION DE LA INVESTIGACION E INNOVACION'
                        }
                    ]
                }
            ];

            vm.onInitMisional = () => {
                const url = new URL($window.location.href);
                let procesoUrl = url.searchParams.get('proceso');
                let tipoProcesoUrl = url.searchParams.get('tipo');

                let procesoFiltrado = vm.procesos.filter(i => i.Nombre === procesoUrl)[0];

                vm.proceso = procesoFiltrado;
                vm.proceso.Tipo = tipoProcesoUrl;

                vm.subprocesos = procesoFiltrado.Subprocesos;
            };

            vm.visualizarLineasTrabajo = () => {
                vm.visualizarLineaTrabajo = !vm.visualizarLineaTrabajo;
            };
        }
    });
})();