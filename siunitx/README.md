# Extension: siunitx for the MathJax third party repository

An implementation of the [siunitx package for LaTeX](http://www.ctan.org/pkg/siunitx) for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions).

## #About siunitx

The siunitx package allows to typeset physical quantities consistently using the syntax `\SI{299e6}{\metre\per\second}`. This extension provides the same syntax in MathJax. Please see the [documentation for siunitx on CTAN](http://www.ctan.org/pkg/siunitx) for details about siunitx.

References:

- MathJax: http://www.mathjax.org/
- siunitx on CTAN: http://www.ctan.org/pkg/siunitx
- W3C note on Units in MathML: http://www.w3.org/TR/mathml-units/

### Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/).

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/siunitx/siunitx.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js", "sinuitx.js"]}
     });
     </script>

### Example

We have an [example page](https://github.com/burnpanck/MathJax-third-party-extensions/blob/add-siunitx-tex-extension/siunitx/sample-siunitx.html)
([see it live](http://rawgit.com/burnpanck/MathJax-third-party-extensions/add-siunitx-tex-extension/siunitx/sample-siunitx.html))
and a [listing of extracted code samples from the siunitx documentation](https://github.com/burnpanck/MathJax-third-party-extensions/blob/add-siunitx-tex-extension/siunitx/test/siunitx.dtx.html)
([live here](http://rawgit.com/burnpanck/MathJax-third-party-extensions/add-siunitx-tex-extension/siunitx/test/siunitx.dtx.html))
that highlight a number of uses of this extension and provides static images rendered with `pdflatex`
and the `siunitx` package for comparison.
