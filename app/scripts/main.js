'use strict';

(function() {
  var $toc = $('#toc'),
      depths = [],
      headerCounter = 0,

  genNumbers = function(depth) {
    var i;
    depths.splice(depth, Infinity);

    for (i = 0; i < depth; ++i) {
      if (!depths[i]) {
        depths[i] = 0;
      }
    }

    ++depths[depth - 1];

    return depths.join('.');
  }
  ;

  $(':header:not(.clean)').each(function(key, value) {
    var depth = +value.nodeName.substring(1),
        newtext = genNumbers(depth) + ' ' + $(value).text();
    $(value).text(newtext); 
    $(value).attr('id', 'header' + headerCounter);
    $toc.append('<a class="tocentry" href="#header' + headerCounter++ + '">' + newtext + '</a><br/>');
  });
})();
