/*!
 * (c) YYYY Foo (foo@example.net)
 */

(function () {
  'use strict';

  var nowScale = 1.0;
  var minScale = 1.0;

  function updateZoomProperty(itemId, pinchZoom) {
    nowScale = nowScale * pinchZoom;
    if (nowScale < minScale) {
      nowScale = minScale;
    }
    $(itemId).css("transform", "scale(" + nowScale + ")");
    $(itemId).css("transform-origin", "0 0");
  }
  function activateSwipe(itemId) {
    var $target = $(itemId).contents().find('body');
    var $parent = $('body');
    var initialScale = $parent.width() / $target.width();
    minScale = initialScale;
    updateZoomProperty(itemId, initialScale);

    $target.swipe({
      /*
      pinchIn:function(event, direction, distance, duration, fingerCount, pinchZoom) {
        updateZoomProperty(pinchZoom);
      },
      pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom) {
        updateZoomProperty(pinchZoom);
      },*/
      pinchStatus: function(event, phase, direction, distance, duration, fingerCount, pinchZoom) {
        //console.log("Pinch zoom scale: " + pinchZoom +
          //", Distance pinched: " + distance +
          //", Direction: " + direction +
          //          ", finger: " + fingerCount
        //);
        if (fingerCount === 2) {
          updateZoomProperty(itemId, pinchZoom);
        }
      },
      fingers: 2,
      pinchThreshold: 0
    });
  }

  $(function() {
    activateSwipe('#blueframe');
  });

}());
