// This script loads jQuery if needed and then tries to load the main code from googlecode.
(function(){
   var jq = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
   if (!window.jQuery) getScript(jq, get_imagegrid);
   else get_imagegrid();
   function get_imagegrid(){
     var ig = 'http://imagegrid.googlecode.com/hg/imagegrid.js';
     getScript(ig, null);
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
})();