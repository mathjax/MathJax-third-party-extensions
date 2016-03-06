HTML Header:	<script type="text/x-mathjax-config">
		MathJax.Ajax.config.path["Contrib"] = "https://cdn.mathjax.org/mathjax/contrib";
		MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
			MathJax.Hub.Insert(MathJax.InputJax.TeX.Definitions.macros,{
				cancel: ["Extension","cancel"],
				bcancel: ["Extension","cancel"],
				xcancel: ["Extension","cancel"],
				cancelto: ["Extension","cancel"]
			});
		});
		MathJax.Hub.Config({
			TeX: {
				equationNumbers: { autoNumber: "AMS"},
				extensions: ["[Contrib]/physics/physics.js"]
			}
		});
	</script>
	<script type="text/javascript"
		src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
	</script>  
LaTeX input:	mmd-article-header  
LaTeX input:	kolen-header  
Title:	LaTeX Physics Package in MathJax  
Subtitle:	Mimicking Some of the Commands in LaTeX Physics Package
Keywords:	Physics Package
Revision:	0.9  
Author:	Kolen Cheung  
Email:	khcheung@berkeley.edu  
Affiliation:	University of California, Berkeley  
Copyright:	2015 Kolen Cheung  
	All Rights Reserved.  
Language:	English  
Base Header Level:	2  
LaTeX Mode:	memoir  
LaTeX input:	mmd-article-begin-doc  
LaTeX footer:	mmd-memoir-footer  

<!--
	\setcounter{tocdepth}{5}
	\tableofcontents
	\begin{comment}
-->
**Table of Contents**

{{TOC}}
<!--\end{comment}-->

# LaTeX Physics Package

In LaTeX, when you `\usepackage{physics}`, you used the [LaTeX Physics Package](http://www.ctan.org/pkg/physics).
This extension is to mimick that in MathJax.

# Commands not Working/Included

- Matrix Macros are not implemented yet
- Commands are not working whenever any one of these is true:
	- `*` modified command
	- `[]` modified command
	- variable no. of arguments
	- Best example containing all of the above: `\dv`, from `\dv{}` to `\dv*[]{}{}`
- Different names with the same commands are not implemented yet, but easy to be done.

# MathJax Macro

The extension is equivalent to the following macro:


<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  TeX: {
    Macros: {
pqty: ["{\( #1 \)}",1],
bqty: ["{\[ #1 \]}",1],
Bqty: ["{\\{ #1 \\}}",1],
abs: ["{\\vert #1 \\vert}",1],
norm: ["{\\vert\\vert #1 \\vert\\vert}",1],
eval: ["{#1 \\vert}",1],
order: ["{\\mathcal{O} \( #1 \)}",1],
comm: ["{\[ #1 , #2 \]}",2],
acomm: ["{\\{ #1 , #2 \\}}",2],
vb: ["{\\boldsymbol{ #1 }}",1],
va: ["{\\vec{\\boldsymbol{ #1 }}}",1],
vu: ["{{\\boldsymbol{\\hat{ #1 }}}}",1],
vdot: ["{\\boldsymbol\\cdot}"],
cross: ["{\\boldsymbol\\times}"],
grad: ["{\\boldsymbol\\nabla}"],
div: ["{\\grad\\vdot}"],
curl: ["{\\grad\\cross}"],
laplacian: ["{\\nabla^2}"],
tr: ["{\\text{tr }}"],
Tr: ["{\\text{Tr }}"],
rank: ["{\\text{rank }}"],
erf: ["{\\text{erf }}"],
Res: ["{\\text{Res}}"],
pv: ["{\\mathcal{P}}"],
PV: ["{\\text{P.V.}}"],
Re: ["{\\text{Re} \\{ #1 \\}}",1],
Im: ["{\\text{Im} \\{ #1 \\}}",1],
qq: ["{\\quad\\text{ #1 }\\quad}",1],
qc: ["{\\text{,}\\quad}"],
qcc: ["{\\quad\\text{c.c.}\\quad}"],
qif: ["{\\quad\\text{if}\\quad}"],
qthen: ["{\\quad\\text{then}\\quad}"],
qelse: ["{\\quad\\text{else}\\quad}"],
qotherwise: ["{\\quad\\text{otherwise}\\quad}"],
qunless: ["{\\quad\\text{unless}\\quad}"],
qgiven: ["{\\quad\\text{given}\\quad}"],
qusing: ["{\\quad\\text{using}\\quad}"],
qassume: ["{\\quad\\text{assume}\\quad}"],
qsince: ["{\\quad\\text{since}\\quad}"],
qlet: ["{\\quad\\text{let}\\quad}"],
qfor: ["{\\quad\\text{for}\\quad}"],
qall: ["{\\quad\\text{all}\\quad}"],
qeven: ["{\\quad\\text{even}\\quad}"],
qodd: ["{\\quad\\text{odd}\\quad}"],
qinteger: ["{\\quad\\text{integer}\\quad}"],
qand: ["{\\quad\\text{and}\\quad}"],
qor: ["{\\quad\\text{or}\\quad}"],
qas: ["{\\quad\\text{as}\\quad}"],
qin: ["{\\quad\\text{in}\\quad}"],
dd: ["{\\text{d}}"],
dv: ["{\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}}",2],
pdv: ["{\\frac{\\partial{ #1 }}{\\partial{ #2 }}}",2],
var: ["{\\delta}"],
fdv: ["{\\frac{\\delta{ #1 }}{\\delta{ #2 }}}",2],
ket: ["{\\vert { #1 } \\rangle}",1],
bra: ["{\\langle { #1} \\vert}",1],
braket: ["{\\langle {#1} \\vert { #2} \\rangle}",2],
ketbra: ["{\\vert { #1 } \\rangle\\langle { #2} \\vert}",2],
ev: ["{\\langle {#1 } \\rangle}",1],
mel: ["{\\langle{ #1 }\\vert{ #2 }\\vert{#3}\\rangle}",3]
    }
  }
});
</script>


# Test

You can use the following table to test which commands in the Physics packages are available and working. Note, some of the commands are not working yet.

|Automatic Bracing|Code|
|---|---|
|\\(\pqty{a}\\)|`\pqty{}`|
|\\(\bqty{a}\\)|`\bqty{}`|
|\\(\Bqty{a}\\)|`\Bqty{}`|
|\\(\abs{a}\\)|`\abs{}`|
|\\(\norm{a}\\)|`\norm{}`|
|\\(\eval{a}_1^2\\)|`\eval{}_1^2`|
|\\(\order{x}\\)|`\order{}`|
|\\(\comm{A}{B}\\)|`\comm{A}{B}`|
|\\(\acomm{A}{B}\\)|`\acomm{A}{B}`|

|Vector Notation|Code|
|---|---|
|\\(\vb{a}\\)|`\vb{}`|
|\\(\vb{\psi}\\)|`\vb{}`|
|\\(\vb*{a}\\)|`\vb*{}`|
|\\(\vb*{\psi}\\)|`\vb*{}`|
|\\(\va{a}\\)|`\va{}`|
|\\(\va{\psi}\\)|`\va{}`|
|\\(\va*{a}\\)|`\va*{}`|
|\\(\va*{\psi}\\)|`\va*{}`|
|\\(\vu{a}\\)|`\vu{}`|
|\\(\vu{\psi}\\)|`\vu{}`|
|\\(\vu*{a}\\)|`\vu*{}`|
|\\(\vu*{\psi}\\)|`\vu*{}`|
|\\(\vdot\\)|`\vdot`|
|\\(\cross\\)|`\cross`|
|\\(\grad(\psi)\\)|`\grad()`|
|\\(\grad[\psi]\\)|`\grad[]`|
|\\(\grad{\psi}\\)|`\grad{}`|
|\\(\div(\psi)\\)|`\div()`|
|\\(\div[\psi]\\)|`\div[]`|
|\\(\div{\psi}\\)|`\div{}`|
|\\(\curl(\psi)\\)|`\curl()`|
|\\(\curl[\psi]\\)|`\curl[]`|
|\\(\curl{\psi}\\)|`\curl{}`|
|\\(\laplacian(\psi)\\)|`\laplacian()`|
|\\(\laplacian[\psi]\\)|`\laplacian[]`|
|\\(\laplacian{\psi}\\)|`\laplacian{}`|

|Operators|Code|
|---|---|
|\\(\sin x\\)|`\sin `|
|\\(\sin(x)\\)|`\sin()`|
|\\(\sin[2](x)\\)|`\sin[2]()`|
|\\(\tr\rho\\)|`\tr`|
|\\(\Tr\rho\\)|`\Tr`|
|\\(\rank M\\)|`\rank `|
|\\(\erf(x)\\)|`\erf()`|
|\\(\Res[f(z)]\\)|`\Res[]`|
|\\(\pv{\int f(z) \dd{z}}\\)|`\pv{}`|
|\\(\PV{\int f(z) \dd{z}}\\)|`\PV{}`|
|\\(\Re{z}\\)|`\Re{}`|
|\\(\Im{z}\\)|`\Im{}`|

|Quick Quad Text|Code|
|---|---|
|\\(\qq{some texts}\\)|`\qq{}`|
|\\(\qq*{some texts}\\)|`\qq*{}`|
|\\(\qc\\)|`\qc`|
|\\(\qcc\\)|`\qcc`|
|\\(\qif\\)|`\qif`|
|\\(\qthen\\)|`\qthen`|
|\\(\qelse\\)|`\qelse`|
|\\(\qotherwise\\)|`\qotherwise`|
|\\(\qunless\\)|`\qunless`|
|\\(\qgiven\\)|`\qgiven`|
|\\(\qusing\\)|`\qusing`|
|\\(\qassume\\)|`\qassume`|
|\\(\qsince\\)|`\qsince`|
|\\(\qlet\\)|`\qlet`|
|\\(\qfor\\)|`\qfor`|
|\\(\qall\\)|`\qall`|
|\\(\qeven\\)|`\qeven`|
|\\(\qodd\\)|`\qodd`|
|\\(\qinteger\\)|`\qinteger`|
|\\(\qand\\)|`\qand`|
|\\(\qor\\)|`\qor`|
|\\(\qas\\)|`\qas`|
|\\(\qin\\)|`\qin`|

|Derivatives|Code|
|---|---|
|\\(\dd{x}\\)|`\dd{}`|
|\\(\dd[3]{x}\\)|`\dd[3]{x}`|
|\\(\dd(\cos\theta)\\)|`\dd()`|
|\\(\dv{x}\\)|`\dv{}`|
|\\(\dv{f}{x}\\)|`\dv{}{x}`|
|\\(\dv[n]{f}{x}\\)|`\dv[]{f}{x}`|
|\\(\dv{x}(x^2+x^3)\\)|`\dv{x}()`|
|\\(\dv*{f}{x}\\)|`\dv*{}{x}`|
|\\(\pdv{x}\\)|`\pdv{}`|
|\\(\pdv{f}{x}\\)|`\pdv{}{x}`|
|\\(\pdv[n]{f}{x}\\)|`\pdv[]{f}{x}`|
|\\(\pdv{x}(x^2+x^3)\\)|`\pdv{x}()`|
|\\(\pdv{f}{x}{y}\\)|`\pdv{}{x}{y}`|
|\\(\var{F[g(x)]}\\)|`\var{}`|
|\\(\var(E-TS)\\)|`\var()`|
|\\(\fdv{g}\\)|`\fdv{}`|
|\\(\fdv{F}{g}\\)|`\fdv{}{g}`|
|\\(\fdv{V}(E-TS)\\)|`\fdv{V}()`|
|\\(\fdv*{F}{x}\\)|`\fdv*{}{x}`|

|Dirac Bracket Notation|Code|
|---|---|
|\\(\ket{\psi}\\)|`\ket{}`|
|\\(\ket*{\psi}\\)|`\ket*{}`|
|\\(\bra{\psi}\\)|`\bra{}`|
|\\(\bra*{\psi}\\)|`\bra*{}`|
|\\(\braket{a}{b}\\)|`\braket{a}{b}`|
|\\(\braket*{a}{b}\\)|`\braket*{a}{b}`|
|\\(\braket{\psi}\\)|`\braket{}`|
|\\(\ketbra{a}{b}\\)|`\ketbra{a}{b}`|
|\\(\ketbra*{a}{b}\\)|`\ketbra*{a}{b}`|
|\\(\ketbra{\psi}\\)|`\ketbra{}`|
|\\(\ev{\psi}\\)|`\ev{}`|
|\\(\ev{A}{\psi}\\)|`\ev{}{\psi}`|
|\\(\ev*{\psi}\\)|`\ev*{}`|
|\\(\ev**{\psi}\\)|`\ev**{}`|
|\\(\mel{m}{A}{n}\\)|`\mel{m}{}{n}`|
|\\(\mel*{m}{A}{n}\\)|`\mel*{m}{}{n}`|
|\\(\mel**{m}{A}{n}\\)|`\mel**{m}{}{n}`|