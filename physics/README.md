---
HTML Header:	<script type="text/x-mathjax-config">MathJax.Ajax.config.path.Contrib="https://cdn.mathjax.org/mathjax/contrib",MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){MathJax.Hub.Insert(MathJax.InputJax.TeX.Definitions.macros,{cancel:["Extension","cancel"],bcancel:["Extension","cancel"],xcancel:["Extension","cancel"],cancelto:["Extension","cancel"]})}),MathJax.Hub.Config({TeX:{equationNumbers:{autoNumber:"AMS"},extensions:["[Contrib]/physics/physics.js","[Contrib]/siunitx/siunitx.js"]}});</script><script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML-full"></script>
CSS:	https://ickc.github.io/multimarkdown-latex-css/combined-css/multimarkdown-latex.css
HTML Header Level:	1
LaTeX Header Level:	2
LaTeX Input:	mmd-article-header
LaTeX input:	mmd-natbib-plain
LaTeX Input:	mmd-load-physics-related
LaTeX Input:	mmd-load-tables-related
LaTeX Input:	mmd-load-pdfpages
LaTeX Input:	mmd-load-headings
thmd:	chapter
LaTeX Input:	mmd-load-amsthm
Title:	LaTeX Physics Package in MathJax  
Subtitle:	Mimicking Some of the Commands in LaTeX Physics Package
Keywords:	Physics Package
Revision:	0.10
Language:	English
Author:	Kolen Cheung
Email:	khcheung@berkeley.edu
Affiliation:	University of California, Berkeley
Copyright:	2015-2016 Kolen Cheung  
 	All Rights Reserved.
LaTeX Mode:	memoir
LaTeX Input:	mmd-article-begin-doc
tocd:	5
secd:	5
LaTeX Input:	mmd-load-toc-setcounter
LaTeX Input:	mmd-load-toc
LaTeX Footer:	mmd-memoir-footer
---
<!-- \begin{comment} -->
{{TOC}}
<!-- \end{comment} -->

# LaTeX Physics Package

This extension is to mimics [LaTeX Physics Package](http://www.ctan.org/pkg/physics) in MathJax.

# Commands not Working and Helps Needed

The following commands in the Physics Package is not implemented yet:

- All Matrix Macros
- So far everything done here is by string substitution. Whenever commands involving the following cannot be done simply by string substitution and hence not working:
	1. `*` modified command
	2. `[]` modified command
	3. variable no. of arguments
	4. `()`, `[]` are used instead of `{}`
- Examples of commands that doesn't work:
	- `\dv`: has properties 1-3
	- `\qty`: has property 4

As I mentioned, everything done so far is by string substitution only. If you know more about Javascript and MathJax, and want to use the [LaTeX Physics Package](http://www.ctan.org/pkg/physics) in MathJax, please consider contributing. Some hints are given in [Pull Request#16---MathJax-third-party-extensions](https://github.com/mathjax/MathJax-third-party-extensions/pull/16) but I am too stupid to understand how the above cases should be handled.

# Organization #

`physics.xlsx` is the master file[^ If you are laughing right now, you should really consider contributing. See [Commands not Working/Included][].].

- Columns A-L are copied to [test/tables.md](test/tables.md)
- Columns M-V are copied to [unpacked/physics.js](unpacked/physics.js)
- Columns M-V excluding column O are copied to [test/macro.js](test/macro.js)

Other files are built automatically by `physics.sh`. [MultiMarkdown](http://fletcherpenney.net/multimarkdown/download/), UglifyJS2, LaTeX are assumed. I used it on Mac and have no idea if the way my bash script is written is OS agnostic or not.

# Test

A test is given in [index.html](index.html) and [index.pdf](index.pdf). Compare the LaTeX output and HTML output and you will see which one is working or not.

Instead of extension, it can works as a macro too. See the test in [macro.html](test/macro.html).

{{test/tables.md}}