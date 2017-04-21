mathjax-extension-TeX-img
=========================

MathJax TeX extension to embed images in math.

# Extension: img.js, leveraging mglyph in TeX input

This extension implements a TeX macro for embedding images
in mathematical formula. It leverages the standard MathML 
mglyph tag which is designed for this purpose. 


# About img

Provides a macro for embedding images in math.


# Usage:

    \img[valign=<vertical alignment>,width=<width>,height=<height>]{URL}

or

    \img[<vertical alignment>][<width>][<height>]{URL}

This adds an `\img` macro for inserting images into a MathJax expression.  
Apart from the URL for the image, it takes three optional parameters:
The vertical alignment value, the width, and the height of the image.
Leave them out to get default values.

With no vertical-align value, the image will sit on the baseline.  With 
not width or height, the image will be its natural size.  With one of 
the width or height specified, the image will be scaled to match that 
dimension while keeping the aspect ratio the same. If both are given, 
then image will be scaled to match both dimensions, without regard to 
the original aspect ratio.


References:

- img: https://github.com/pkra/mathjax-extension-tex-img
- MathJax: http://www.mathjax.org/
- Original discussion https://groups.google.com/d/msg/mathjax-users/SXjY3rQXOzc/YGcc48HwDR4J


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
       extensions: ["tex2jax.js","[Contrib]/img.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
     });
     </script>
