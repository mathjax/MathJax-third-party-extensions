/****************************************************
 *
 *  physics.js
 *  
 *  Implements the Physics Package for LaTeX input.
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2015 Kolen Cheung <https://github.com/KolenCheung>.
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
    MathJax.InputJax.TeX.Definitions.Add({
        macros: {
            quantity: [ "{	\\{ #1 \\}	}", 1 ],
            qty: [ "{	\\{ #1 \\}	}", 1 ],
            pqty: [ "{	( #1 )	}", 1 ],
            bqty: [ "{	[ #1 ]	}", 1 ],
            vqty: [ "{	\\vert #1 \\vert	}", 1 ],
            Bqty: [ "{	\\{ #1 \\}	}", 1 ],
            absolutevalue: [ "{	\\vert #1 \\vert	}", 1 ],
            abs: [ "{	\\vert #1 \\vert	}", 1 ],
            norm: [ "{	\\vert\\vert #1 \\vert\\vert	}", 1 ],
            evaluated: [ "{	#1 \\vert	}", 1 ],
            eval: [ "{	#1 \\vert	}", 1 ],
            order: [ "{	\\mathcal{O} ( #1 )	}", 1 ],
            commutator: [ "{	[ #1 , #2 ]	}", 2 ],
            comm: [ "{	[ #1 , #2 ]	}", 2 ],
            anticommutator: [ "{	\\{ #1 , #2 \\}	}", 2 ],
            acomm: [ "{	\\{ #1 , #2 \\}	}", 2 ],
            poissonbracket: [ "{	\\{ #1 , #2 \\}	}", 2 ],
            pb: [ "{	\\{ #1 , #2 \\}	}", 2 ],
            vectorbold: [ "{	\\boldsymbol{ #1 }	}", 1 ],
            vb: [ "{	\\boldsymbol{ #1 }	}", 1 ],
            vectorarrow: [ "{	\\vec{\\boldsymbol{ #1 }}	}", 1 ],
            va: [ "{	\\vec{\\boldsymbol{ #1 }}	}", 1 ],
            vectorunit: [ "{	{\\boldsymbol{\\hat{ #1 }}}	}", 1 ],
            vu: [ "{	{\\boldsymbol{\\hat{ #1 }}}	}", 1 ],
            dotproduct: [ "{	\\boldsymbol\\cdot	}" ],
            vdot: [ "{	\\boldsymbol\\cdot	}" ],
            crossproduct: [ "{	\\boldsymbol\\times	}" ],
            cross: [ "{	\\boldsymbol\\times	}" ],
            cp: [ "{	\\boldsymbol\\times	}" ],
            gradient: [ "{	\\boldsymbol\\nabla	}" ],
            grad: [ "{	\\boldsymbol\\nabla	}" ],
            divergence: [ "{	\\grad\\vdot	}" ],
            div: [ "{	\\grad\\vdot	}" ],
            curl: [ "{	\\grad\\cross	}" ],
            laplacian: [ "{	\\nabla^2	}" ],
            tr: [ "{	\\text{tr }	}" ],
            Tr: [ "{	\\text{Tr }	}" ],
            rank: [ "{	\\text{rank }	}" ],
            erf: [ "{	\\text{erf }	}" ],
            Res: [ "{	\\text{Res}	}" ],
            principalvalue: [ "{	\\mathcal{P}	}" ],
            pv: [ "{	\\mathcal{P}	}" ],
            PV: [ "{	\\text{P.V.}	}" ],
            Re: [ "{	\\text{Re} \\{ #1 \\}	}", 1 ],
            Im: [ "{	\\text{Im} \\{ #1 \\}	}", 1 ],
            qqtext: [ "{	\\quad\\text{ #1 }\\quad	}", 1 ],
            qq: [ "{	\\quad\\text{ #1 }\\quad	}", 1 ],
            qcomma: [ "{	\\text{,}\\quad	}" ],
            qc: [ "{	\\text{,}\\quad	}" ],
            qcc: [ "{	\\quad\\text{c.c.}\\quad	}" ],
            qif: [ "{	\\quad\\text{if}\\quad	}" ],
            qthen: [ "{	\\quad\\text{then}\\quad	}" ],
            qelse: [ "{	\\quad\\text{else}\\quad	}" ],
            qotherwise: [ "{	\\quad\\text{otherwise}\\quad	}" ],
            qunless: [ "{	\\quad\\text{unless}\\quad	}" ],
            qgiven: [ "{	\\quad\\text{given}\\quad	}" ],
            qusing: [ "{	\\quad\\text{using}\\quad	}" ],
            qassume: [ "{	\\quad\\text{assume}\\quad	}" ],
            qsince: [ "{	\\quad\\text{since}\\quad	}" ],
            qlet: [ "{	\\quad\\text{let}\\quad	}" ],
            qfor: [ "{	\\quad\\text{for}\\quad	}" ],
            qall: [ "{	\\quad\\text{all}\\quad	}" ],
            qeven: [ "{	\\quad\\text{even}\\quad	}" ],
            qodd: [ "{	\\quad\\text{odd}\\quad	}" ],
            qinteger: [ "{	\\quad\\text{integer}\\quad	}" ],
            qand: [ "{	\\quad\\text{and}\\quad	}" ],
            qor: [ "{	\\quad\\text{or}\\quad	}" ],
            qas: [ "{	\\quad\\text{as}\\quad	}" ],
            qin: [ "{	\\quad\\text{in}\\quad	}" ],
            differential: [ "{	\\text{d}	}" ],
            dd: [ "{	\\text{d}	}" ],
            derivative: [ "{	\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}	}", 2 ],
            dv: [ "{	\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}	}", 2 ],
            partialderivative: [ "{	\\frac{\\partial{ #1 }}{\\partial{ #2 }}	}", 2 ],
            pdv: [ "{	\\frac{\\partial{ #1 }}{\\partial{ #2 }}	}", 2 ],
            variation: [ "{	\\delta	}" ],
            "var": [ "{	\\delta	}" ],
            functionalderivative: [ "{	\\frac{\\delta{ #1 }}{\\delta{ #2 }}	}", 2 ],
            fdv: [ "{	\\frac{\\delta{ #1 }}{\\delta{ #2 }}	}", 2 ],
            ket: [ "{	\\vert { #1 } \\rangle	}", 1 ],
            bra: [ "{	\\langle { #1} \\vert	}", 1 ],
            innerproduct: [ "{	\\langle {#1} \\vert { #2} \\rangle	}", 2 ],
            braket: [ "{	\\langle {#1} \\vert { #2} \\rangle	}", 2 ],
            outerproduct: [ "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            dyad: [ "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            ketbra: [ "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            op: [ "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            expectationvalue: [ "{	\\langle {#1 } \\rangle	}", 1 ],
            expval: [ "{	\\langle {#1 } \\rangle	}", 1 ],
            ev: [ "{	\\langle {#1 } \\rangle	}", 1 ],
            matrixelement: [ "{	\\langle{ #1 }\\vert{ #2 }\\vert{#3}\\rangle	}", 3 ],
            matrixel: [ "{	\\langle{ #1 }\\vert{ #2 }\\vert{#3}\\rangle	}", 3 ],
            mel: [ "{	\\langle{ #1 }\\vert{ #2 }\\vert{#3}\\rangle	}", 3 ]
        }
    });
});

MathJax.Ajax.loadComplete("[Contrib]/physics/unpacked/physics.js");