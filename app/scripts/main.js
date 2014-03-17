/* global Text */

'use strict';

(function() {
  var $toc = $('#toc'),
      depths = [],
      headerCounter = 0,
      pageDiv,
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
      insertNewPage();
      curP = $('<p/>');
      pageDiv.append(curP);
      curP.append(part);
    }
    return curP;
  },

  insertNewPage = function() {
    var outerPageDiv = $('<div class="outer-page"></div>');
    pageDiv = $('<div class="page"></div>');
    outerPageDiv.append(pageDiv);
    DIV_ARTICLE.append(outerPageDiv);
  },

  setHeaderFooter = function() {
    var $outerPages = $('.outer-page'), totalPages = $outerPages.length;
    $outerPages.each(function(page, v) {
      $(v).append('<div class="header">header</div>')
          .append('<div class="footer">' + (page+1) + '/' + totalPages + '</div>');

      $(':header:not(.clean)', v).each(function(key, value) {
        $('[data-header="' + $(value).attr('id') + '"]').append('<span class="tocpage">' + (page+1) + '</span>');
      });
    });
  }
  ;

  $(':header:not(.clean)').each(function(key, value) {
    var depth = +value.nodeName.substring(1),
        newtext = genNumbers(depth) + ' ' + $(value).text();
    $(value).text(newtext);
    $(value).attr('id', 'header' + headerCounter);
    $toc.append('<a data-header="header' + headerCounter + '" href="#header' + headerCounter++ + '">' + newtext + '</a><br/>');
  });

  DIV_ARTICLE.children().each(function(key, value) {
    var $value = $(value), curP, newPageInserted = false;

    if (!pageDiv || $value.hasClass('page-break')) {
      insertNewPage();
      newPageInserted = true;
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
            curP = appendParaPart(curP, v);
          }
        });
      } else if (!newPageInserted) {
        insertNewPage();
        pageDiv.append($value);
      }
    }

  });

  setHeaderFooter();


})();
