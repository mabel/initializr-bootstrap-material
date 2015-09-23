define ->
    (href)->
        items = document.getElementsByTagName("link")
        for item in items
            if item.getAttribute('href') is href then return
        fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", href)
        document.getElementsByTagName("head")[0].appendChild(fileref)
