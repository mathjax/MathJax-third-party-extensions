# Extension: knowl for the MathJax third party repository

A version of `knowl.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).


# About knowl

Implements "knowls" for MathJax. See [AIM documentation](http://www.aimath.org/knowlepedia/) for knowls. 

Also requires `knowl.js` script and stylesheet from AIM, and jQuery library:

    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script> 
    <link href="http://aimath.org/knowlstyle.css" rel="stylesheet" type="text/css" /> 
    <script type="text/javascript" src="http://aimath.org/knowl.js">
    </script>

# Usage in TeX:

    \knowl{url}{math}

# Usage in MathML

    <maction actiontype="knowl" data-src="url">...</maction>

Example:

    <maction actiontype="knowl" data-src="gamma.html">
      <mi mathvariant="normal">&Gamma;</mi>
    </maction>

References:

- knowl: https://github.com/leathrum/mathjax-ext-contrib/tree/master/knowl
- MathJax: http://www.mathjax.org/


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/knowl.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>
