(function do_imagegrid(){
  if (!window.jQuery || jQuery().jquery.indexOf('1.4')<0)
    return getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js', arguments.callee);//do_imagegrid);
  jQuery.noConflict();
  jQuery(document).ready(imagegrid);
  function image_is_loaded(){
    var img=this; // function is called from jQuery.
    // thanks to Sajith Muraleedharan Pillai (Sajith M.R), http://www.sajithmr.me/javascript-check-an-image-is-loaded-or-not/
    return img.complete && (typeof img.naturalWidth=='undefined' || img.naturalHeight);
  };
  function getScript(url,success){
    var head = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0], done = false;
    var script = document.createElement("script");
    script.src = url;
    /* Attach handlers for all browsers */
    script.onload = script.onreadystatechange = function(){
      if ( !done && (!this.readyState ||
		     this.readyState == "loaded" ||
		     this.readyState == "complete") ) {
  	done = true;
  	if (success) success();
      }
    };
    head.appendChild(script);
  };
  function imagegrid($){
    // wrap all images
    $('img').load(modifier).filter(image_is_loaded).each(modifier);
    function modifier(){
      var $img=$(this), img=this, h=img.height, w=img.width;
      // filter out the images that are too small
      if (h<50 || w<50) return;
      // remove links from images
      while($img.parent('a').length) $img.unwrap();
      // if the image has no parent, skip it
      if (!$img.parent()) return;
      // container div to replace the image
      var $div=$('<div>');
      // place the container div in the same spot as the image
      for(var s=['display','position','left','top'], i=0; i<s.length; i++)
	$div.css(s[i], $img.css(s[i]));
      if ($img.css('display')=='inline') $div.css('display','inline-block');
      // canvas to hold image and gridlines, it's context is use to draw in the callback cb
      var canvas=$('<canvas height="'+h+'" width="'+w+'">').appendTo($div).get(0);
      var ctx = canvas.getContext('2d');
      // swap image with container div
      img.parentNode.replaceChild($div.get(0),img);
      // input to specify grid
      $('<input style="display:block" size="10" value="25 25">').change(cb).appendTo($div).change();
      function cb(){ // called when input changes
	var xy = $(this).val().match(/(\d+\.?\d*)/g);
	if (!xy || !xy.length) return;
	var xstep = parseFloat(xy[0]);
	var ystep = xy.length > 1? parseFloat(xy[1]): xstep;
	ctx.drawImage($img.get(0),0,0);
	ctx.beginPath(); ctx.strokeStyle="#000"; ctx.lineWidth=1;
	if (xstep > 0) for (var i=xstep-.5; i<w; i+=xstep) {ctx.moveTo(i,0); ctx.lineTo(i,h);} // add .5 px to center the line on a pixel, otherwise a whole step will paint 2 pixels wide.
	if (ystep > 0) for (var i=ystep-.5; i<h; i+=ystep) {ctx.moveTo(0,i); ctx.lineTo(w,i);}
	ctx.stroke();
      };
    };
  };
})();


