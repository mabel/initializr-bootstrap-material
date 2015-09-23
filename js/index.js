requirejs.config({
	waitSeconds: 30,	
	baseUrl: 'js',
	paths: {
        jquery:    'vendor/jquery-2.1.4.min',
        bootstrap: 'vendor/bootstrap.min',
        ripples:   'vendor/ripples.min',
        material:  'vendor/material.min',
        spinlib:   'vendor/spin.min',
		spin:      'modules/spin',
		css:       'modules/css',
		nav:       'modules/nav',
		sect:      'modules/sect',
		templates: 'modules/templates',
	},

    shim: {
        bootstrap: {deps: ['jquery']},
        material:  {deps: ['bootstrap']},
        ripples:   {deps: ['material']},
        nav:       {deps: ['ripples', 'spin']},
    }
})

window.cssBundles = {
    index: [
        "css/bootstrap.min.css",
        "css/roboto.min.css",
        "css/material-fullpalette.min.css",
        "css/ripples.min.css",
    ]
}

require(['nav'])
