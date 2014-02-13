/* global mathjs:true */

'use strict';

(function() {
  var $toc = $('#toc');

  $(':header').each(function(key, value) {
    $toc.append('<p>' + $(value).text() + '</p>');
  });
})();
