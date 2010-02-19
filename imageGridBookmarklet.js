(function(){
   get_jQuery();
   /* getScript()
    * more or less stolen form jquery core and adapted by paul irish */
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
  	 success();
       }
     };
     head.appendChild(script);
   };
   function get_jQuery(){
     if (!window.jQuery) getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js', get_jQueryUI);
     else get_jQueryUI();
   };
   function get_jQueryUI(){
     if (!jQuery.ui) getScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js', image_grid);
     else image_grid();
   };
   function image_grid(){
     jQuery.noConflict();
     function filterImages(){return this.width>0 && this.height>50;};
     function div(tag){return document.createElement(tag || 'div');};
     jQuery(document).ready(function($){
       // filter out the links.
       for(var images = $('a img').filter(filterImages).unwrap();
	   images.length; images = $('a img').filter(filterImages).unwrap());
       $('img').filter(filterImages).each(function(){
	 var image=this, $i=$(image), iw=$i.width(), ih=$i.height(), d=div(), c=document.createElement('canvas'), d2=div();
	 var display = $i.css('display');
	 if (!display || display=='inline') display='inline-block';
	 $(d).css({display:display, position:$i.css('position'), left:$i.left, top:$i.top, width:image.width, height:image.height});
	 c.width=iw; c.height=ih;
	 image.parentNode.replaceChild(d, image);
	 d.appendChild(d2); d2.appendChild(c);
	 d2.style.position='relative'; d2.style.left=d2.style.top='10px';
	 var x=div(), y=div(), xcontainer=div(), ycontainer=div();
	 xcontainer.appendChild(x); ycontainer.appendChild(y);
	 d2.appendChild(xcontainer); d2.appendChild(ycontainer);
	 var xcs=xcontainer.style, ycs=ycontainer.style;
	 xcs.height=ycs.width='10px'; xcs.width=(iw+10)+'px'; ycs.height=(ih+10)+'px';
	 xcs.position=ycs.position='absolute'; xcs.background=ycs.background='yellow';
	 xcs.left=ycs.top='0px'; xcs.top=ycs.left='-10px';
	 var xs=x.style, ys=y.style;
	 xs.position=ys.position='absolute';
	 xs.width=ys.width=xs.height=ys.height='10px';
	 xs.background=ys.background='red';
	 xs.top=ys.left='0px'; ys.top=xs.left='0px';
	 var ctx=c.getContext('2d');
	 var xform = div('form'), xposition = div('input'), yform = div('form'), yposition = div('input');
					    $(xform).append(xposition).css({position:'absolute', left: (iw+10)+'px'}).submit(function(){xs.left=$(xposition).val(); update(); return false;}).appendTo(xcontainer);
					    $(yform).append(yposition).css({position:'absolute', top: (ih+10)+'px'}).submit(function(){ys.top=$(yposition).val(); update(); return false; }).appendTo(ycontainer);
	 function update(){
	   ctx.drawImage(image,0,0);
	   ctx.lineWidth=1;
	   ctx.strokeStyle='#000';
	   var xstep=$(x).position().left, ystep=$(y).position().top;
	   $(xposition).val(xstep); $(yposition).val(ystep);
	   //	   console.log('xstep:'+xstep);
	   ctx.beginPath();
	   if (xstep) for(var i=xstep+.5; i<iw; i+=xstep) {ctx.moveTo(i,0); ctx.lineTo(i,ih); }
	   if (ystep) for(var i=ystep+.5; i<ih; i+=ystep) {ctx.moveTo(0,i); ctx.lineTo(iw,i);}
	   ctx.stroke();
	 };
	 $(x).draggable({axis:'x',containment:xcontainer, drag:update, stop:update});
	 $(y).draggable({axis:'y',containment:[-10,0,-10,image.height+10], drag:update, stop:update});
	 update();
       });
     });
   };
 })();
