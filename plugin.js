/*! 
monkimportcsscallbacks
@version: 1.0.0
@date: 29-10-2013
@author: MonkDev

This callback is used to register the formats availabe in the 'Format' select 
list the way we want them. By default, tinymce applies classes to 'span' tags that 
it either wraps or inserts into the active WYSIWYG element. We want to apply our class 
tags directly to the active element. That is accomplished by using this 
'importcss_selector_converter' callback which overrides the default way that tinymce 
generates the formats.

The limitation is that block level elements still do not behave as expected when a class is 
applied while the block level element is the active 
element in the WYSIWYG editor.
*/
tinymce.PluginManager.add('monkimportcsscallbacks', function (editor) {
  editor.settings.importcss_selector_converter = function (selectorText) {
    var format;

    // Leverage importcss' function for generating formats based on the selector text.
    format = this.convertSelectorToFormat(selectorText);

    // Parse the selector text (e.g. element.class1, .class1).
    var selector = /^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(selectorText);
    if (!selector) {
      return;
    }    

    // If the class has no html element prefix, then make it available for many elements.
    if (!selector[1] && selector[2]) {
      format.selector = 'div,p,h1,h2,h3,h4,h5,h6,td,th,li,img,a,span';
      delete format.inline;
    }

    return format;
  };
});