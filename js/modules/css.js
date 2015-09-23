define(function() {
  return function(href) {
    var fileref, i, item, items, len;
    items = document.getElementsByTagName("link");
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      if (item.getAttribute('href') === href) {
        return;
      }
    }
    fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", href);
    return document.getElementsByTagName("head")[0].appendChild(fileref);
  };
});
