/**
 * monkimportcsscallbacks - This callback is used to register the formats availabe in the 
 * 'Format' select list the way we want them. By default, tinymce applies classes to 'span'
 * tags that it either wraps or inserts into the active WYSIWYG element. We want to apply
 * our class tags directly to the active element. That is accomplished by using this 
 * 'importcss_selector_converter' callback which overrides the default way that tinymce
 * generates the formats.
 *
 * The limitation is that block level elements still do not behave as expected when a class
 * is applied while the block level element is the active element in the WYSIWYG editor.
 */
tinymce.PluginManager.add('monkimportcsscallbacks', function (editor) {
  editor.settings.importcss_selector_converter = function (selectorText) {
  
    var format;
    var textBlockElements = ['h1','h2','h3','h4','h5','h6','p','div','address','pre','form','blockquote','center','dir','fieldset','header','footer','article','section','hgroup','aside','nav','figure'];
    var blockElements = ['hr','table','tbody','thead','tfoot','th','tr','td','li','ol','ul','caption','dl','dt','dd','noscript','menu','isindex','samp','option','datalist','select','optgroup'];

    // Parse simple element.class1, .class1
    var selector = /^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(selectorText);
    if (!selector) {
      return;
    }

    var elementName = selector[1];
    var classes = selector[2].substr(1).split('.').join(' ');

    // element.class - Produce block formats
    if (selector[1]) {
    format = {
      title: selectorText
    };

    if (textBlockElements[elementName]) {
      // Text block format ex: h1.class1
      format.block = elementName;
    } else if (blockElements[elementName]) {
      // Non text block format ex: tr.row
      format.selector = elementName;
    } else {
      // Inline format strong.class1
      format.inline = elementName;
    }
    } else if (selector[2]) {

        format = {
          selector: 'div,p,h1,h2,h3,h4,h5,h6,td,th,li,img,a,span',
          title: selectorText.substr(1),
          classes: classes
        };

    }

    return format;

  };
});