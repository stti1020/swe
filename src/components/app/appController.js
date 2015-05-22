/**
 * @fileOverview {@link app.AppController Controller f&uuml;r das (neue) Routing}
 * @author <a href="mailto:Juergen.Zimmermann@HS-Karlsruhe.de">J&uuml;rgen Zimmermann</a>
 */

/*jslint es6: true */
(function() {
    'use strict';

    /**
     * @class app.AppController
     * @desc Controller, um das Routing zu konfigurieren
     */
    class AppController {
        constructor($router, $location) {
            console.info('AppController CREATED');

            this.loc = $location;

            $router.config([
                {path: '/', redirectTo: '/home'},

                {path: '/home', component: 'home'},

                {path: '/createArtikel', component: 'createArtikel'},
                {path: '/listArtikel', component: 'listArtikel'},
                {path: '/warenkorb', component: 'warenkorb'},

                {path: '/bestaetigung', component: 'bestaetigung'},

                {path: '/detailsKunde', component: 'detailsKunde'},
                {path: '/listKunden', component: 'listKunden'},
                {path: '/registrieren', component: 'registrieren'},
                {path: '/registrierePrivatkunde', component: 'registrierePrivatkunde'},
                {path: '/registriereFirmenkunde', component: 'registriereFirmenkunde'},
                {path: '/updateKunde', component: 'updateKunde'}
            ]);
        }
        isActive(checkPath) {
            return checkPath === this.loc.url();
       }
    }

    // "Property Annotation" fuer DI: fuer den Modus 'strict' und fuer Minification
    AppController.$inject = ['$router', '$location'];

    /* global angular: false */
    angular.module('app').controller('AppController', AppController);
})();
