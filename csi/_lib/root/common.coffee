document.addEventListener "DOMContentLoaded", ->
    startSpinner()
    configureSystem()
    cssBundle.forEach (el)->
        loadCss el
    loadI18n()

loadCss = (href)->
    items = document.getElementsByTagName("link")
    for item in items
        if item.getAttribute('href') is href then return
    fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", href)
    document.getElementsByTagName("head")[0].appendChild(fileref)

loadMenu = ()->
    useCase = 'index'
    path = window.location.pathname
    if /cabinet/.test path then useCase = 'cabinet'
    if /admin/.test path then useCase = 'admin'
    url = "/csi/#{useCase}-menu/main.html"
    xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = ()->
        return unless xmlhttp.readyState is XMLHttpRequest.DONE and xmlhttp.status is 200
        parent  = document.getElementsByTagName('nav')[0]
        parent.innerHTML = xmlhttp.responseText
        System.import 'menu'
            .then ()->
                System.import 'gui'
            #    if typeof window.onLoad is 'function' then window.onLoad()
    xmlhttp.open "GET", url, true
    xmlhttp.send()

window.i18n = {}

getDict = (lang)->
    url = "/i18n/#{lang}.txt"
    xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = ()->
        if xmlhttp.readyState is XMLHttpRequest.DONE
            switch xmlhttp.status
                when 200
                    arr = xmlhttp.responseText.split '\r\n'
                    arr.forEach (el)->
                        arrr = el.split '='
                        return unless arrr.length is 2
                        window.i18n[arrr[0].trim()] = arrr[1].trim()
                    loadMenu()
                when 404 then getDict 'en'
                else loadMenu()
    xmlhttp.open "GET", url, true
    xmlhttp.send()

loadI18n = ->
    lng = window.navigator.userLanguage or window.navigator.language
    lng = lng.trim().match(/^[a-z]{2}/)[0]
    getDict lng

window.spinner = new Spinner
    lines:     13
    length:    20
    width:     10
    radius:    30
    rotate:    0
    corners:   1
    direction: 1
    speed:     1
    trail:     60
    zIndex:    2e9
    shadow:    false
    hwaccel:   false
    color:     '#000'
    className: 'spinner'
    top:       '50%'
    left:      '50%'

startSpinner = ->
    window.spinner.spin document.body

configureSystem = ->
    window.define  = System.amdDefine
    window.require = window.requirejs = System.amdRequire
    System.config
        baseURL: '/js'
        paths:
            'jquery':     'vendor/jquery.min.js'
            'bootstrap':  'vendor/bootstrap.min.js'
            'bs-table':   'vendor/bootstrap-table.min.js'
            'material':   'vendor/material.min.js'
            'ripples':    'vendor/ripples.min.js'
            'markdown':   'vendor/marked.min.js'
            'underscore': 'vendor/underscore-min.js'
            'backbone':   'vendor/backbone-min.js'
            'bb-bind':    'vendor/Backbone.ModelBinder.min.js'
            'gui':        'modules/gui.js'
            'menu':       'modules/menu.js'
            'crutches':   'modules/crutches.js'
            'validator':  'modules/validator.js'

    System.meta =
            'menu':      {deps: ['jquery', 'markdown']}
            'bootstrap': {deps: ['jquery']}
            'material':  {deps: ['bootstarp']}
            'ripples':   {deps: ['bootstarp']}
            'bs-table':  {deps: ['bootstarp']}
            'validator': {deps: ['backbone']}
            'backbone':  {deps: ['underscore']}
            'bb-bind':   {deps: ['backbone', 'jquery']}

