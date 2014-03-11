'use strict';

(function() {
  var $toc = $('#toc'),
      depths = [],
      headerCounter = 0,
      A4_HEIGHT = 842, pageHeight, pageDiv,
      DIV_ARTICLE = $('article'),

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
    $toc.append('<a href="#header' + headerCounter++ + '">' + newtext + '</a><br/>');
  });

  pageHeight = Infinity;
  DIV_ARTICLE.children().each(function(key, value) {
    var $value = $(value), elHeight = $value.outerHeight(true);

    if ($value.hasClass('page-break') || pageHeight + elHeight > A4_HEIGHT) {
      pageHeight = 0;
      pageDiv = $('<div class="page"></div>');
      DIV_ARTICLE.append(pageDiv);
    }
    pageHeight += elHeight;
    console.log(pageHeight);
    pageDiv.append($value);
  });

})();
