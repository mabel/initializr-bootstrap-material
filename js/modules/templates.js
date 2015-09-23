define(function() {
  return function(id) {
    switch (id) {
      case 'index-nav':
        return function() {};
      case 'index-test2':
        return function() {
          return alert('from template');
        };
    }
    return null;
  };
});
