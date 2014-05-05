# XyJax single-file version for the MathJax third party repository


A single-file version of XyJax for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

Note that this file combines the original `xypic.js` and `fp.js` and modifies the `MathJax.loadComplete` call at the end of the extension to `MathJax.Ajax.loadComplete("[contrib]/xyjax/xypic.js");`. This URL structure requires MathJax v2.4 and a configured third party path variable (see [the instructions](#CDN) below).
        

# About XyJax

XyJax is an almost Xy-pic compatible extension for MathJax. This extension enables you to draw various graphs and diagrams. See http://sonoisa.github.io/xyjax/xyjax.html for more details. 

References:

- XyJax: https://github.com/sonoisa/XyJax
- MathJax: http://www.mathjax.org/
- Xy-pic: http://www.tug.org/applications/Xy-pic/


## Installation instructions

For general installation instructions, see https://github.com/sonoisa/XyJax/blob/master/README.md.

## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this single-file version of XyJax via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the XyJax extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/xyjax.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>
f