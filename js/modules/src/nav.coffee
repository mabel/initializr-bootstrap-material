define ['css', 'sect'], (loadCss, loadSection)->
    page = getPagePrefix()
    window.cssBundles[page].forEach (el)->
            loadCss el
    $ ->
        after = ->
            $ 'nav a[href^=#csi-]'
                .click ->
                    href = $(@).attr('href').substring 5
                    loadSection href
                    setActive @
            $active = $ 'nav li.active a'
            href = $active.attr('href').substring 5
            hash = window.location.hash.trim()
            if hash and $("nav [href=#{hash}]").length
                href = hash.substring 5
                $active = $("nav [href=#{hash}]")
            loadSection href, ->
                setActive $active
                $.material.init()
                require('spin').stop()
                $('nav, main').removeClass 'hidden'
        loadSection 'nav', after

        setActive = (anch)->
            $('.navbar-collapse li').removeClass 'active'
            $(anch).closest('.navbar-collapse > ul > li').addClass 'active'

