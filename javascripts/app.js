CONFIG.BACKEND_HOST =  "http://"+ CONFIG.BACKEND_DOMAIN+":1337/"

angular.module('seil-bms-angularjs', ['ngMaterial','ui.router','ngResource','angular-jwt','satellizer'])

.config(function($mdThemingProvider) {
    // Extend the red theme with a different color and make the contrast color black instead of white.
  // For example: raised button text will be black instead of white.
  var darkAmberMap = $mdThemingProvider.extendPalette('amber', {
    '500': '#c79100',
    // 'contrastDefaultColor': 'dark'
  });

  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('darkAmber', darkAmberMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('blue')
    .warnPalette('darkAmber')
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