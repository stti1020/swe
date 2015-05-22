/**
 * @namespace listKunden
 */

/* global angular: false */
/*jslint es6: true */
(function() {
    'use strict';

    /**
     * @class appKundenverwaltung.listKundenController
     */
    class listKundenController {
        constructor() {
            this.kunden = [{
        'type': 'F',
        'version': 0,
        'id': 300,
        'identity': {
            'loginname': 'admin',
            'enabled': true,
            'nachname': 'Admin',
            'email': 'admin@hs-karlsruhe.de',
            'adresse': {
                'plz': '76133',
                'ort': 'Karlsruhe',
                'strasse': 'Moltkeweg',
                'hausnr': '1'
            }
        },
        'kategorie': 1,
        'seit': '2014-02-01',
        'newsletter': false,
        'agbAkzeptiert': true,
        'bestellungenUri': 'https://localhost:8443/shop/rest/bestellungen/kunde/300'
    }, {
        'type': 'P',
        'version': 0,
        'id': 301,
        'identity': {
            'loginname': 'Peter',
            'enabled': true,
            'nachname': 'Peter',
            'email': 'peter@hs-karlsruhe.de',
            'adresse': {
                'plz': '76137',
                'ort': 'Karlsruhe',
                'strasse': 'Moltkeweg',
                'hausnr': '3'
            }
        },
        'kategorie': 1,
        'seit': '2014-04-01',
        'newsletter': false,
        'agbAkzeptiert': true,
        'bestellungenUri': 'https://localhost:8443/shop/rest/bestellungen/kunde/301'
    }, {
        'type': 'P',
        'version': 0,
        'id': 302,
        'identity': {
            'loginname': 'Hans',
            'enabled': true,
            'nachname': 'Hans',
            'email': 'hans@hs-karlsruhe.de',
            'adresse': {
                'plz': '76137',
                'ort': 'Karlsruhe',
                'strasse': 'Moltkeweg',
                'hausnr': '3'
            }
        },
        'kategorie': 1,
        'seit': '2014-01-01',
        'newsletter': false,
        'agbAkzeptiert': true,
        'bestellungenUri': 'https://localhost:8443/shop/rest/bestellungen/kunde/301'
    }];
        }
    }

    // // "Property Annotation" fuer DI: fuer den Modus 'strict' und fuer Minification
    // listKundenController.$inject = [];

    /* global angular: false */
    angular.module('appKundenverwaltung').controller('listKundenController', listKundenController);
})();
