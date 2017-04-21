# Extension: forminput for the MathJax third party repository

A version of `forminput.js` for the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions), including a compressed version (using YUI, see the [MathJax-dev tools](https://github.com/mathjax/mathjax-dev)).

# About forminput

Provides HTML `<input>` tag in MathJax math expression
with `\FormInput` macro.

# Usage:

    \FormInput[size][class][value]{name}


HTML `id` and `name` attributes given by value in required parameter, 
other attributes given by corresponding optional parameters.

*MUST* use either *native* MathML rendering or MathJax HTML/CSS 
rendering -- will *NOT* work if MathML rendering is handled by a plug-in, 
such as MathPlayer in Internet Explorer.


References:

- forminput: https://github.com/leathrum/mathjax-ext-contrib/tree/master/forminput
- MathJax: http://www.mathjax.org/


## Using the MathJax CDN {#CDN}

The MathJax CDN hosts a copy of this extension via the [MathJax third party extension repository](https://github.com/mathjax/MathJax-third-party-extensions). To use the CDN copy, you need MathJax v2.4 (or higher) and configure the third party extension repository as described in the [MathJax documentation](http://docs.mathjax.org/). 

Then add the extension to your configuration like any other third party extension from the MathJax CDN. For example, your inline configuration might be

     <script type="text/x-mathjax-config>
     MathJax.Hub.Config({
       extensions: ["tex2jax.js","[Contrib]/forminput.js"],
       jax: ["input/TeX","output/HTML-CSS"],
       tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
       TeX: {extensions: ["AMSmath.js","AMSsymbols.js"]}
     });
     </script>










# History:

*29 Jan 2012* -- Tom Leathrum  
Moved to GitHub repo, further history tracking there  
*28 Dec 2011* -- Tom Leathrum  
a few minor tweaks -- changed macro name from `\Input` to `\FormInput`, added value attribute optional parameter  
*23 Dec 2011* -- Davide Cervonne  

