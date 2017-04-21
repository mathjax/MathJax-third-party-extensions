# Extension: InputToDataAttr.js

This extension will take the source TeX or AsciiMath expression and add it as
a data-tex or data-asciimath attribute on the main MathJax Frame span.

## Purpose

When copy-pasted into a online WYSIWYG HTML editor, the HTML-CSS outputted by
MathJax can cause problems.  By exposing the original input expression as an 
attribute on the surrounding span, this extension allows an editor plugin to 
look for spans with a data-tex or data-asciimath attribute and convert them into 
a usable and editable format.

## Using the MathJax CDN

The MathJax CDN hosts a copy of this extension via the [MathJax third party 
extension 
repository](https://github.com/mathjax/MathJax-third-party-extensions). To use 
the CDN copy, you need MathJax v2.4 (or higher) and configure the third party 
extension repository as described in the [MathJax 
documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party 
extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/InputToDataAttr.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
     });
     </script>
