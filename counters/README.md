#Extension: counters for the MathJax third party repository

A version of `counters.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

# About counters

Implements LaTeX counters for MathJax.

##Usage:

    \newcounter{name}[depend]
    \setcounter{name}{number}
    \addtocounter{name}{number}
    \arabic{name}
    \alph{name}
    \Alph{name}
    \roman{name}
    \Roman{name}
    \value{name}

The `\value` macro is only valid in the number argument for `\setcounter` and 
`\addtocounter`.

The extension does not implement the `\fnsymbol` or `\usecounter` macros, which only make sense in the context of LaTeX features which MathJax does not support. Similarly, the extension does not implement the standard LaTeX counters, such as page, section, figure, and enumi.


References:

- counters: https://github.com/leathrum/mathjax-ext-contrib/tree/master/counters
- MathJax: http://www.mathjax.org/


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/counters.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>
