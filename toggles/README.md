# Extension: toggles for the MathJax third party repository

A version of `toggles.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

# About toggles

Implements LaTeX toggles for MathJax, based on the _etoolbox_ implementation -- see
[_etoolbox_](http://mirrors.ctan.org/macros/latex/contrib/etoolbox/etoolbox.pdf) documentation on CTAN.


# Usage:

    \newtoggle{name}
    \providetoggle{name}
    \settoggle{name}{value}
    \toggletrue{name}
    \togglefalse{name}
    \iftoggle{name}{math}{math}
    \nottoggle{name}{math}{math}


References:

- toggles: https://github.com/leathrum/mathjax-ext-contrib/tree/master/toggles
- MathJax: http://www.mathjax.org/


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/toggles.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>
