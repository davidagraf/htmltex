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
  },

  pageFull = function() {
    return pageDiv.prop('offsetHeight') - pageDiv.prop('scrollHeight') < 0;
  },

  appendParaPart = function(curP, part) {
    curP.append(part);
    if (pageFull()) {
      curP.contents().last().remove();
      pageDiv = $('<div class="page"></div>');
      DIV_ARTICLE.append(pageDiv);
      curP = $('<p/>'); 
      pageDiv.append(curP);
      curP.append(part);
    }
    return curP;
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
    var $value = $(value), elHeight = $value.outerHeight(true),
        curP;

    if ($value.hasClass('page-break') || !pageDiv) {
      pageDiv = $('<div class="page"></div>');
      DIV_ARTICLE.append(pageDiv);
    }
    pageDiv.append($value);
    if (pageFull()) {
      $value.remove();
      if (value.tagName.toLowerCase() === 'p') {
        curP = $('<p/>');
        pageDiv.append(curP);

        $value.contents().each(function(i, v){
          if (v instanceof Text) {
            $.each($(v).text().trim().split(' '), function(j,w) {
              curP = appendParaPart(curP, ' ' + w);
            });
          } else {
            curP = appendParaPart(curP);
          }
        });
      } else {
        pageDiv = $('<div class="page"></div>');
        DIV_ARTICLE.append(pageDiv);
        pageDiv.append($value);
      }
    }
  });

})();
