mathjax-extension-longdiv
=========================

MathJax TeX extension for long division notation.

# Extension: longdiv for the MathJax third party repository

A version of `longdiv.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (see [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

# About longdiv

Provides `\longdiv` macro to render long-division notation.

# Usage:

    \longdiv{dividend}{divisor}


References:

- longdiv : https://github.com/pkra/mathjax-extension-longdiv
- MathJax: http://www.mathjax.org/
- David Carlisle's original code: http://html5mathml.googlecode.com/svn/trunk/longdiv-mj-mml2.html


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/longdiv.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>
