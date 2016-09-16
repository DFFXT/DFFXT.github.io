/*动态布局

 */
(function(){
	ul_font.style.width=ul_font.parentNode.offsetWidth+'px';
	var styleList=getComputedStyle(ul_font.parentNode);
	var ul_parent_padding_left=styleList['padding-left'];
	var ul_parent_padding_bottom=styleList['padding-bottom'];
	ul_font.style.marginLeft='-'+ul_parent_padding_left;
	ul_font.style.marginTop=ul_parent_padding_bottom;

})();

