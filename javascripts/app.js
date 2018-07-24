CONFIG.BACKEND_HOST =  "http://"+ CONFIG.BACKEND_DOMAIN+":1337/"

angular.module('seil-bms-angularjs', ['ngMaterial','ui.router','ngResource','angular-jwt','satellizer'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('blue')
    .dark();
})
.config(function Config($httpProvider, jwtOptionsProvider) {
	jwtOptionsProvider.config({
	  tokenGetter: ['options', function(options) {
	    // Skip authentication for any requests ending in .html
	    if (options.url.substr(options.url.length - 5) == '.html') {
	      return null;
	    }

	    return localStorage.getItem('satellizer_token');
    }],
    whiteListedDomains: [CONFIG.BACKEND_DOMAIN]
	});

	$httpProvider.interceptors.push('jwtInterceptor');
})
.config(function($authProvider){
	$authProvider.oauth2({
      name: 'iitbsso',
      url: '/auth/provider',
      clientId: 'HkRquN6lSDR8HFIAwclxuznLQjjMmAuNUJp3G7pQ',
      redirectUri: window.location.origin,
      authorizationEndpoint: 'https://gymkhana.iitb.ac.in/sso/oauth/authorize',
      optionalUrlParams: ['scope'],
      scope:['ldap'],
      scopePrefix:'',
      scopeDelimiter: ' '
    });
})