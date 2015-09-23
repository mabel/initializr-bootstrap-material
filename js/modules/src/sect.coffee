getPagePrefix = ->
    page = 'index'
    if /cabinet/.test window.top.location then page = 'cabinet'
    if /admin/.test   window.top.location then page = 'admin'
    return page

define ['css', 'templates'], (loadCss, getTemplate)->
    (id, before, after)->
        if before and not after then after = before; before = null
        page = getPagePrefix()
        pref = "/csi/#{page}-#{id}/main"
        $sect = null
        if id is 'nav' then $sect = $ 'nav'
        else
            $sect = $ "##{id}"
            if $sect.length is 0
                $sect = $ '<section>'
                    .attr 'id', id
                    .appendTo $ 'main'
        if typeof before  is 'function' then before($sect)
        $.get "#{pref}.html?#{Math.random()}", (dat)->
            $('section').addClass 'hidden'
            $sect.empty().removeClass('hidden').html dat
            module = "#{pref}.js?#{Math.random()}"
            fn = getTemplate "#{page}-#{id}"
            if require.defined module
                fn = require module
            if typeof fn is 'function'
                fn $sect, id
                if typeof after is 'function' then after $sect
                return
            require [module]
            count = 0
            cycle = setInterval ->
                    count++
                    if require.defined module
                        clearInterval cycle
                        fn = require module
                        fn $sect, id
                        if typeof after is 'function' then after $sect
                    if count > 10 then alert 'too many'; clearInterval cycle
                , 300

