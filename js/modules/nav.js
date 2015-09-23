define(['css', 'sect'], function(loadCss, loadSection) {
  var page;
  page = getPagePrefix();
  window.cssBundles[page].forEach(function(el) {
    return loadCss(el);
  });
  return $(function() {
    var after, setActive;
    after = function() {
      var $active, hash, href;
      $('nav a[href^=#csi-]').click(function() {
        var href;
        href = $(this).attr('href').substring(5);
        loadSection(href);
        return setActive(this);
      });
      $active = $('nav li.active a');
      href = $active.attr('href').substring(5);
      hash = window.location.hash.trim();
      if (hash && $("nav [href=" + hash + "]").length) {
        href = hash.substring(5);
        $active = $("nav [href=" + hash + "]");
      }
      return loadSection(href, function() {
        setActive($active);
        $.material.init();
        require('spin').stop();
        return $('nav, main').removeClass('hidden');
      });
    };
    loadSection('nav', after);
    return setActive = function(anch) {
      $('.navbar-collapse li').removeClass('active');
      return $(anch).closest('.navbar-collapse > ul > li').addClass('active');
    };
  });
});
