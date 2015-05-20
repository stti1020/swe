/**
 * @namespace appUtil
 */

/* global angular: false */
/*jslint es6: true */
'use strict';

angular.module('appUtil', ['ngResource', 'ngNewRouter', 'ngAnimate']);
/**
 * @fileOverview Konstante und Hilfsfunktionen
 * @author <a href="mailto:Juergen.Zimmermann@HS-Karlsruhe.de">J&uuml;rgen Zimmermann</a>
 */

/*jslint es6: true */

'use strict';

(function () {
  'use strict';

  /* global angular: false */
  angular.module('appUtil')
  /**
   * @name BASE_URI
   * @constant
   * @memberOf appUtil
   * @desc Konstante mit der Basis-URI des RESTful Web Service
   */
  // constant() stellt Konstante fuer config() bereit, d.h. wenn die App geladen wird
  .value('BASE_URI', 'https://localhost:8443/shop/rest')

  // globale Variable _ aus lodash oder Underscore
  /* global _: false */
  .value('_omit', _.omit).value('_contains', _.contains);
})();
/**
 * @fileOverview {@link appUtil.iamService Service f&uuml;r Identity und Access Management (IAM)}
 * @author <a href="mailto:Juergen.Zimmermann@HS-Karlsruhe.de">J&uuml;rgen Zimmermann</a>
 */

// Der Einfachheit halber ist der RESTful Web Service mit BASIC-Authentifizierung implementiert und
// nicht mit FORM-based Authentifizierung oder mit OAuth2

/*jslint es6: true */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    // Cookies inspizieren:
    // Chrome: [Chrome Menu] > Tools > Entwicklertools > Resources > Cookies > localhost
    //         https://developers.google.com/chrome-developer-tools
    // Firefox: durch das Add-on "Web Developer" https://addons.mozilla.org/en-US/firefox/addon/web-developer

    // Cookies in AngularJS sind keine sicheren Cookies, d.h. das Attribut 'secure' ist nicht gesetzt
    // http://en.wikipedia.org/wiki/HTTP_cookie#Secure_cookie

    // Authentifizierung mit einem Login-Formular:
    // http://www.espeo.pl/authentication-in-angularjs-application

    /**
     * @class appUtil.IamService
     * @desc Service f&uuml;r Identity und Access Management (IAM)
     */

    var IamService = (function () {
        function IamService($resource, BASE_URI, $location, $window) {
            _classCallCheck(this, IamService);

            console.info('IamService CREATED');

            this.$resource = $resource;
            this.loginUri = '' + BASE_URI + '/iam/login';
            this.logoutUri = '' + BASE_URI + '/iam/logout';
            this.$location = $location;
            this.btoa = $window.btoa;

            /**
             * @name basicAuth
             * @type String
             * @memberOf appUtil.IamService
             * @desc Base64-String mit den Daten f&uuml;r die BASIC-Authentifizierung
             */
            this.basicAuth = null;

            /**
             * @name identity
             * @type Object
             * @memberOf appUtil.iamService
             * @desc Objekt mit den Login-Daten
             */
            this.identity = null;
        }

        _createClass(IamService, [{
            key: 'login',

            /**
             * @name login
             * @function
             * @memberOf appUtil.IamService
             * @desc Einloggen mit Loginname und Passwort
             * @param {String} loginname Loginname
             * @param {String} password Password
             * @param {Function} success Callback-Function f&uuml;r erfolgreiches Einloggen
             * @param {Function} error Callback-Function f&uuml;r ein fehlgeschlagenes Login
             * @returns {void}
             */
            value: function login(loginname, password, success, error) {
                this.basicAuth = 'Basic ' + this.btoa(loginname + ':' + password);
                console.info('iamService.login(): loginname = ' + loginname + ', password=' + password + ', ' + ('loginUri=' + this.loginUri + ', basicAuth=' + this.basicAuth));

                // $resource:   http://docs.angularjs.org/api/ngResource/service/$resource
                // "A factory which creates a resource object that lets you interact with RESTful server-side data sources.
                // The returned resource object has action methods which provide high-level behaviors without the need
                // to interact with the low level $http service. Requires the ngResource module to be installed."

                var loginResource = this.$resource('' + this.loginUri, {}, { login: { method: 'GET', headers: { Authorization: this.basicAuth } } });
                loginResource.login(null, success, error);
            }
        }, {
            key: 'getLoginname',

            /**
             * @name getLoginname
             * @function
             * @memberOf appUtil.IamService
             * @desc Ermitteln des Loginnamens
             * @returns {String} Loginname
             */
            value: function getLoginname() {
                return this.identity.loginname;
            }
        }, {
            key: 'getBasicAuth',

            /**
             * @name getBasicAuth
             * @function
             * @memberOf appUtil.IamService
             * @desc Ermitteln des Base64-Strings f&uuml;r BASIC-Authentifizierung
             * @returns {String} Base64-String f&uuml;r BASIC-Authentifizierung
             */
            value: function getBasicAuth() {
                return this.basicAuth;
            }
        }, {
            key: 'setBasicAuth',

            /**
             * @name setBasicAuth
             * @function
             * @memberOf appUtil.IamService
             * @desc Setzen des Base64-Strings f&uuml;r BASIC-Authentifizierung
             * @param {String} newBasicAuth Neuer Base64-String f&uuml;r BASIC-Authentifizierung
             * @returns {void}
             */
            value: function setBasicAuth(newBasicAuth) {
                this.basicAuth = newBasicAuth;
            }
        }, {
            key: 'isLoggedIn',

            /**
             * @name isLoggedIn
             * @function
             * @memberOf appUtil.IamService
             * @desc Ermitteln, ob der aktuelle User eingeloggt ist oder nicht
             * @returns {boolean} true, falls der aktuelle User eingeloggt ist; false sonst
             */
            value: function isLoggedIn() {
                return this.identity !== null;
            }
        }, {
            key: 'saveIdentity',

            /**
             * @name inRolle
             * @function
             * @memberOf appUtil.IamService
             * @desc Pufferung des Identity-Objekts nach erfolgreichem Login
             * @param {String} loginResponse Response-Objekt nach erfolgreichem Login
             * @returns {void}
             */
            value: function saveIdentity(loginResponse) {
                delete loginResponse.password;
                delete loginResponse.passwordWdh;
                delete loginResponse.expirationDate;
                delete loginResponse.enabled;
                this.identity = loginResponse;
                console.log('Identity: ' + angular.toJson(this.identity, true));
            }
        }, {
            key: 'inRolle',

            /**
             * @name inRolle
             * @function
             * @memberOf appUtil.IamService
             * @desc Ermitteln, ob der aktuelle User die angegebene Rolle hat oder nicht
             * @param {String} rolle Die zu pr&uuml;fende Rolle
             * @returns {boolean} true, falls der aktuelle User die angegebene Rolle hat; false sonst
             */
            value: function inRolle(rolle) {
                /* eslint no-undefined: 0 */
                if (this.identity === null || this.identity.rollen === undefined) {
                    return false;
                }
                return this.identity.rollen[rolle];
            }
        }, {
            key: 'reset',

            /**
             * @name reset
             * @function
             * @memberOf appUtil.IamService
             * @desc Zur&uuml;cksetzen des Base64-Strings f&uuml;r BASIC-Authentifizierung und des Identity-Objekts
             * @returns {void}
             */
            value: function reset() {
                this.basicAuth = null;
                this.identity = null;
            }
        }, {
            key: 'logout',

            /**
             * @name logout
             * @function
             * @memberOf appUtil.IamService
             * @desc Logout mit {@link appUtil.iamService.reset Zur&uuml;cksetzen der Daten}
             *       und Weiterleitung zur Startseite
             * @returns {void}
             */
            value: function logout() {
                console.clear();
                this.reset();
                var logoutResource = this.$resource(this.logoutUri, {}, { logout: { method: 'POST' } });
                logoutResource.logout();
                this.$location.path('/');
            }
        }]);

        return IamService;
    })();

    // "Property Annotation" fuer DI: fuer den Modus 'strict' und fuer Minification
    IamService.$inject = ['$resource', 'BASE_URI', '$location', '$window'];

    /* global angular: false */
    angular.module('appUtil').service('iamService', IamService);
})();
/**
 * @namespace appArtikelverwaltung
 */

/*jslint es6: true */
/* global angular: false */
'use strict';

angular.module('appArtikelverwaltung', ['appUtil']);
/**
 * @namespace appBestellverwaltung
 */

/* global angular: false */
/*jslint es6: true */
'use strict';

angular.module('appBestellverwaltung', ['appArtikelverwaltung']);
/**
 * @namespace appKundenverwaltung
 */

/* global angular: false */
/*jslint es6: true */
'use strict';

angular.module('appKundenverwaltung', ['appUtil']);
/**
 * @namespace app
 */

// globale Variable: angular
// eigenes Modul: app
// benutzte Module: ngResource, ngRoute, ...

/*jslint es6: true */
'use strict';

(function () {
    'use strict';

    /* global angular: false */
    angular.module('app', ['appBestellverwaltung', 'appKundenverwaltung']);
})();
/**
 * @fileOverview {@link app.AppController Controller f&uuml;r das (neue) Routing}
 * @author <a href="mailto:Juergen.Zimmermann@HS-Karlsruhe.de">J&uuml;rgen Zimmermann</a>
 */

/*jslint es6: true */
'use strict';

(function () {
    'use strict';

    /**
     * @class app.ComponentLoaderConfig
     * @desc Konfiguration f&uuml;r das Laden der Komponenten
     * @param {Object} $componentLoaderProvider Injizierter ComponentLoaderProvider fuer den Router (ab AngularJS 1.4)
     * @returns {void}
     */
    // config() in AngularJS erfordert Functions, keine Emulation durch Klassen
    function ComponentLoaderConfig($componentLoaderProvider) {
        console.info('ComponentLoaderConfig CREATED');

        // name ist der Name der Komponente bei der Konfiguration von $router im AppController
        /* eslint complexity: [2, 10] */
        $componentLoaderProvider.setTemplateMapping(function (name) {
            var subdir = '';
            switch (name) {
                // --------------------------------------
                // artikelverwaltung
                // --------------------------------------
                case 'createArtikel':
                case 'listArtikel':
                case 'warenkorb':
                    subdir = 'artikelverwaltung/';
                    break;

                // --------------------------------------
                // bestellverwaltung
                // --------------------------------------
                case 'bestaetigung':
                    subdir = 'bestellverwaltung/';
                    break;

                // --------------------------------------
                // kundenverwaltung
                // --------------------------------------
                case 'detailsKunde':
                case 'listKunden':
                case 'registrierePrivatkunde':
                case 'updateKunde':
                    subdir = 'kundenverwaltung/';
                    break;

                default:
                    break;
            }

            console.log('Component Name: ' + name + ' -> /components/' + subdir + '' + name + '/' + name + '.html');
            return '/components/' + subdir + '' + name + '/' + name + '.html';
        });
    }

    // "Property Annotation" fuer DI: fuer den Modus 'strict' und fuer Minification
    ComponentLoaderConfig.$inject = ['$componentLoaderProvider'];

    /* global angular: false */
    angular.module('app').config(ComponentLoaderConfig);
})();
/**
 * @fileOverview {@link app.AppController Controller f&uuml;r das (neue) Routing}
 * @author <a href="mailto:Juergen.Zimmermann@HS-Karlsruhe.de">J&uuml;rgen Zimmermann</a>
 */

/*jslint es6: true */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
    'use strict';

    /**
     * @class app.AppController
     * @desc Controller, um das Routing zu konfigurieren
     */

    var AppController = function AppController($router) {
        _classCallCheck(this, AppController);

        console.info('AppController CREATED');

        $router.config([{ path: '/', redirectTo: '/home' }, { path: '/home', component: 'home' }, { path: '/createArtikel', component: 'createArtikel' }, { path: '/listArtikel', component: 'listArtikel' }, { path: '/warenkorb', component: 'warenkorb' }, { path: '/bestaetigung', component: 'bestaetigung' }, { path: '/detailsKunde', component: 'detailsKunde' }, { path: '/listKunden', component: 'listKunden' }, { path: '/registrierePrivatkunde', component: 'registrierePrivatkunde' }, { path: '/updateKunde', component: 'updateKunde' }]);
    };

    // "Property Annotation" fuer DI: fuer den Modus 'strict' und fuer Minification
    AppController.$inject = ['$router'];

    /* global angular: false */
    angular.module('app').controller('AppController', AppController);
})();