
//  Namespace for SVG elements, different than normal HTML element namespace.
var SVGNameSpace = "http://www.w3.org/2000/svg";

/**
 * Makes a new SVG line object and returns it. 
 *
 * @param x1 {number} 
 * @param y1 {number}
 * @param x2 {number}
 * @param y2 {number}
 * @param color {string} the color of the line
 * @param stroke {number} the thickness of the line.
 * @returns {object}
 *
 * This has been implemented to provide an example. 
 */
function makeLine(x1, y1, x2, y2, color, stroke) {

		var e = document.createElementNS(SVGNameSpace, "line");
		e.setAttribute("x1", x1);
		e.setAttribute("y1", y1);
		e.setAttribute("x2", x2);
		e.setAttribute("y2", y2);

		e.style.stroke      = color || "#000000";
		e.style.strokeWidth = stroke || 2;

		return e;

}

/**
* Makes and returns a new SVG rectange object. 
* 
* @param x {number} the x position of the rectangle.
* @param y {number} the y position of the rectangle.
* @param w {number} the width of the rectangle.
* @param h {number} the height of the rectangle.
* @param c {string} the color of the rectangle. 
* 
* @return {object} 
*/ 
function makeRectangle(x, y, w, h, c){
		var rect = document.createElementNS(SVGNameSpace, "rect"); 

		rect.setAttribute("width", w);
		rect.setAttribute("height", h);
		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		rect.setAttribute("fill", c);
		rect.style.stroke = "#000000";
		rect.style.strokeWidth = 2;

		return rect; 
}

/**
* Makes and returns a new SVG circle object. 
* 
* @param x {number} the x position of the circle.
* @param y {number} the y position of the circle.
* @param r {number} the radius 
* @param c {number} the color 
* 
* @return {object} 
*/
function makeCircle(x, y, r, c){
		var circ = document.createElementNS(SVGNameSpace, "circle"); 

		circ.setAttribute("cx", x);
		circ.setAttribute("cy", y);
		circ.setAttribute("r", r);
		circ.setAttribute('fill', c);

		if (c == "white"){
			circ.setAttribute('fill-opacity', 0);
			circ.setAttribute('class', 'zero');
		}

		return circ;

}

/**
* Makes an SVG element. 
* 
* @param w {number} the width
* @param h {number} the height 
* 
* @return {object} 
*/
function makeSVG(w, h){
		var s = document.createElementNS(SVGNameSpace, "svg"); 
		s.setAttribute("width", w); 
		s.setAttribute("height", w); 
		s.setAttribute('xmlns', SVGNameSpace);
		s.setAttribute('xmlns:xlink',"http://www.w3.org/1999/xlink");
		return s;
}
