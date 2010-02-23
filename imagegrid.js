(function do_imagegrid(){
  // load jQuery here if necessary.
  if (!window.jQuery || jQuery().jquery.indexOf('1.4')<0)
    return getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js', arguments.callee);//do_imagegrid);
  jQuery.noConflict();
  jQuery(document).ready(imagegrid);
  return null;

  function image_is_loaded(){
    var img=this; // function is called from jQuery.
    // thanks to Sajith Muraleedharan Pillai (Sajith M.R), http://www.sajithmr.me/javascript-check-an-image-is-loaded-or-not/
    return img.complete && (typeof img.naturalWidth=='undefined' || img.naturalHeight);
  };

  // attach script to document and call success on success
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


  function map(f,a){
    for(var i=0,r=[]; i<a.length;i++) r[i]=f(a[i]);
    return r;
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
      $('<input style="display:block" size="10" value="25 25" title="spacing #rgb+width">').change(cb).appendTo($div).change();

      // callback to determine how to draw the grid.
      function cb(){ // called when input changes

	// break up the input into strings
	var strs = $(this).val().trim().split(/[\s,]+/);

	// eat up first step size
	var xstep = parseFloat(strs.shift());
	if (!xstep) return false; // ignore invalid step

	// eat up the first styles
	var xstyles = parseStyles(strs);

	// eat up second step size and styles, defaulting to first
	var ystep = parseFloat(strs.shift()), ystyles;
	if (!ystep) { ystep=xstep; ystyles=xstyles; }
	else ystyles = parseStyles(strs);

	// draw
	ctx.drawImage($img.get(0),0,0);
	if (xstep > 0) draw_lines(ctx, w, h, xstep, xstyles, false);
	if (ystep > 0) draw_lines(ctx, h, w, ystep, ystyles, true);
	return false;
      }; // cb

      // consume from an array of strings the leading styles,
      // returning [("#rgb", linewidth)]
      function parseStyles(strs){
	var styles=[];
	while(strs.length && strs[0] && strs[0][0]=='#')
	  styles.push(parseStyle(strs.shift()));
	return styles.length? styles: [['#000',1]];
      };

      // "#rgbw" -> ['#rgb', float w]
      function parseStyle(s){
	return [s.slice(0,4), parseFloat(s.slice(4))||1];
      };

      // draw lines, invert pretends that y=x.
      function draw_lines(ctx, w, h, xstep, xstyles, invert){
	var slen = xstyles.length, on_y=0;
	for(var i=xstep-.5,j=0; i<w; i+=xstep,j++) {
	  ctx.beginPath();
	  if (!invert) {ctx.moveTo(i,0); ctx.lineTo(i,h);}
	  else {ctx.moveTo(0,i); ctx.lineTo(h,i);}
	  var style = xstyles[j%slen];
	  ctx.lineWidth=style[1];
	  ctx.strokeStyle=style[0];
	  ctx.stroke();
	}
      };
    }; // modifier
  }; // imagegrid
 })(); // do_imagegrid

