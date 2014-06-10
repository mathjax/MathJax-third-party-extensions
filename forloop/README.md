# Extension: forloop for the MathJax third party repository

A version of `everymath.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

# About forloop

Implements simple for-loop iteration for MathJax, with special handling for arrays.

# Usage:

    \forloop[step]{start}{stop}{counter}{code}
    \ForArray[step]{start}{stop}{counter}{code}


The `\forloop` macro does *not* work well with `array` environments, because
the `&` and `\\` special sequences do not work correctly in the LaTeX code
block.  For that reason, the `\ForArray` macro is provided -- it formats the
table based on the loop and constructs its own internal `mtable` for the
MathJax internal representation directly, with default spacing and styling.

Loops can be nested if needed.  The `\ForArray` macro should not be nested
to a depth more than 2 -- in this case, the inner loop adds entries to rows
of the array, and the outer loop adds the rows to the array.

If you want delimiters (such as square brackets or parentheses) around an
array built with `\ForArray`, these will need to be added explicitly in
the surrounding LaTeX code.

This extension requires (and loads automatically) the `counters` extension,
also available in this repository.  If you use a local copy of this
extension, you will need to decide also whether to use a local copy of
the `counters` extension, and if so, change the URL in the `Require()`
method call at the beginning of this extension script.

Provides `\everymath` macro to place tokens at beginning of all math
environments.

References:

- forloop: https://github.com/leathrum/mathjax-ext-contrib/tree/master/forloop
- MathJax: http://www.mathjax.org/


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/forloop.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>



