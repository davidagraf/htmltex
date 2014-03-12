'use strict';

(function() {
  var $toc = $('#toc'),
      depths = [],
      headerCounter = 0,
      A4_HEIGHT = 842, pageDiv,
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

  DIV_ARTICLE.children().each(function(key, value) {
    var $value = $(value), elHeight = $value.outerHeight(true);

    if ($value.hasClass('page-break') || !pageDiv) {
      pageDiv = $('<div class="page"></div>');
      DIV_ARTICLE.append(pageDiv);
    }
    pageDiv.append($value);
    if (pageDiv.prop('offsetHeight') - pageDiv.prop('scrollHeight') < 0) {
      $value.remove();
      pageDiv = $('<div class="page"></div>');
      DIV_ARTICLE.append(pageDiv);
      pageDiv.append($value);
    }
  });

})();
