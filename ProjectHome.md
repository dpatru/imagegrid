ImageGrid is a bookmarklet creates a grid on images for drawing practice.

## To Install ##
The file [imagegridbookmarklet.min.js](http://imagegrid.googlecode.com/hg/imagegridbookmarklet.min.js) contains the compressed javascript of the bookmarklet. Copy the contents of this file into the destination (href) part of your bookmark.

An easy way to do this is:
  1. Drag the following link to your bookmarks bar: [ImageGrid](http://imagegrid.googlecode.com/hg/imagegridbookmarklet.min.js). This will create a bookmark.
  1. Click on the bookmark you've just created. This will take you to a page with some text on it beginning with "javascript:".
  1. Copy all the text (Control-a then Control-c) on the page.
  1. Edit the bookmarklet by right-clicking on the bookmark and selecting "Edit" or "Properties."
  1. Paste the text you copied into the bookmarklet's URL or Location field. Make sure you delete the existing text first.
  1. Save your changes to the bookmark.

## To Use ##
Go to a web page that contains an image you want to grid. Click the imagegrid bookmarklet.
To change the grid, just change the text at the bottom of each gridded image. Here are some examples to get you started:

| **text** | **result** |
|:---------|:-----------|
| 25       | grid 25 pixels on the side |
| 25 30    | grid 25 pixels across and 30 pixels down |
| 25 #f00  | grid 25 pixels on the side, lines are red |
| 25 #f002 | grid 25 pixels on the side, lines are red and 2 pixels wide |
| 25 #f001 #0f02 #00f3 | grid 25 pixels on the side, lines cycle: red, 1 pixel wide; green, 2 pixels wide; blue, 3 pixels wide |
| 25 #888 30 #99c3 #fff2 | grid 25 pixels across, grey lines 1 pixel wide; 30 pixels down, lines cycle: bluish 3 pixels wide; white 2 pixels wide |
| 25 0     | vertical lines 25 pixels apart |
| 0 25     | horizontal lines 25 pixels apart |

