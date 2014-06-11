# Extension: sqrtspacing for the MathJax third party repository

A version of `sqrtspacing.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

# About sqrtspacing

This extension improves the visual rendering of square roots by adding a little bit of padding between the root and a non-whitespace math symbol that precedes it or follows. This unglues visually the roots from the math around them. Works for both HTML_CSS and SVG renderers.

References:

- sqrtspacing: https://github.com/evgenystan/MathJax-third-party-extensions/tree/master/sqrtspacing
- MathJax: http://www.mathjax.org/


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["[Contrib]/sqrtspacing.js"],
     });
     </script>

# Using with MathJax 2.3 or earlier versions of MathJax 

You may download a version that can be used with earlier versions of MathJax from here:
	https://github.com/evgenystan/sqrtspacing

The file needs to be placed in the [MathJax]\extensions\sqrtspacing\ folder and loaded with the following configuration:

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["sqrtspacing/sqrtspacing.js"],
     });
     </script>

It is possible to load MathJax from CDN and host extensions locally. See 
	http://docs.mathjax.org/en/latest/configuration.html#using-a-local-configuration-file-with-the-cdn 
for details.