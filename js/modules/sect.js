var getPagePrefix;

getPagePrefix = function() {
  var page;
  page = 'index';
  if (/cabinet/.test(window.top.location)) {
    page = 'cabinet';
  }
  if (/admin/.test(window.top.location)) {
    page = 'admin';
  }
  return page;
};

define(['css', 'templates'], function(loadCss, getTemplate) {
  return function(id, before, after) {
    var $sect, page, pref;
    if (before && !after) {
      after = before;
      before = null;
    }
    page = getPagePrefix();
    pref = "/csi/" + page + "-" + id + "/main";
    $sect = null;
    if (id === 'nav') {
      $sect = $('nav');
    } else {
      $sect = $("#" + id);
      if ($sect.length === 0) {
        $sect = $('<section>').attr('id', id).appendTo($('main'));
      }
    }
    if (typeof before === 'function') {
      before($sect);
    }
    return $.get(pref + ".html?" + (Math.random()), function(dat) {
      var count, cycle, fn, module;
      $('section').addClass('hidden');
      $sect.empty().removeClass('hidden').html(dat);
      module = pref + ".js?" + (Math.random());
      fn = getTemplate(page + "-" + id);
      if (require.defined(module)) {
        fn = require(module);
      }
      if (typeof fn === 'function') {
        fn($sect, id);
        if (typeof after === 'function') {
          after($sect);
        }
        return;
      }
      require([module]);
      count = 0;
      return cycle = setInterval(function() {
        count++;
        if (require.defined(module)) {
          clearInterval(cycle);
          fn = require(module);
          fn($sect, id);
          if (typeof after === 'function') {
            after($sect);
          }
        }
        if (count > 10) {
          alert('too many');
          return clearInterval(cycle);
        }
      }, 300);
    });
  };
});
