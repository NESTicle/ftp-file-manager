(function () {
    'use strict';

    let app = angular.module('calipsuApp');

    app.component('otrosDocumentos', {
        templateUrl: '/angular/components/procesos/otros-documentos/otrosDocumentosComponent.html',
        controllerAs: 'vm',
        controller: function () {
            let vm = this;

            vm.items = [
                {
                    Nombre: 'Consentimientos Informados',
                    Path: '/Documentacion/- CONSENTIMIENTOS INFORMADOS/'
                },
                {
                    Nombre: 'Instrucciones para el Usuario Ambulatorio',
                    Path: '/Documentacion/- INSTRUCCIONES PARA EL USUARIO AMBULATORIO/'
                },
                {
                    Nombre: 'Modelos Vigentes para Documentar',
                    Path: '/Documentacion/- MODELOS VIGENTES PARA DOCUMENTAR'
                },
            ];
        }
    });
})();