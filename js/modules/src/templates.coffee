define ->
    (id)->
        switch id
            when 'index-nav' then return ->
            when 'index-test2' then return -> alert 'from template'
        return null
