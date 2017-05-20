# Extension: preamble for the MathJax third party repository

A version of `preamble.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

# About preamble

Allows TeX preamble section in MathJax configuration.

# Usage:

    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      TeX: {
        preamble: [
          "TeX preamble definition"
        ]
      }
    });
    </script>


The `preamble` option accepts a comma-separated list
of strings containing TeX definitions or similar code. 

Backslashes must be escaped since the TeX definitions
are within JavaScript strings -- for example, 
the TeX definition `\def\RR{\mathbf{R}}`
must be entered as the JavaScript string
`"\\def\\RR{\\mathbf{R}}"`.

If any TeX code within the preamble strings generates output, 
the extension issues a MathJax warning.

References:

- preamble: https://github.com/leathrum/mathjax-ext-contrib/tree/master/preamble
- MathJax: http://www.mathjax.org/


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/preamble.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>
