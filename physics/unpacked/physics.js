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
 */MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
    MathJax.InputJax.TeX.Definitions.Add({
        macros: {
            quantity: [ "Macro", "{	\\{ #1 \\}	}", 1 ],
            qty: [ "Macro", "{	\\{ #1 \\}	}", 1 ],
            pqty: [ "Macro", "{	( #1 )	}", 1 ],
            bqty: [ "Macro", "{	[ #1 ]	}", 1 ],
            vqty: [ "Macro", "{	\\vert #1 \\vert	}", 1 ],
            Bqty: [ "Macro", "{	\\{ #1 \\}	}", 1 ],
            absolutevalue: [ "Macro", "{	\\vert #1 \\vert	}", 1 ],
            abs: [ "Macro", "{	\\vert #1 \\vert	}", 1 ],
            norm: [ "Macro", "{	\\vert\\vert #1 \\vert\\vert	}", 1 ],
            evaluated: [ "Macro", "{	#1 \\vert	}", 1 ],
            eval: [ "Macro", "{	#1 \\vert	}", 1 ],
            order: [ "Macro", "{	\\mathcal{O} ( #1 )	}", 1 ],
            commutator: [ "Macro", "{	[ #1 , #2 ]	}", 2 ],
            comm: [ "Macro", "{	[ #1 , #2 ]	}", 2 ],
            anticommutator: [ "Macro", "{	\\{ #1 , #2 \\}	}", 2 ],
            acomm: [ "Macro", "{	\\{ #1 , #2 \\}	}", 2 ],
            poissonbracket: [ "Macro", "{	\\{ #1 , #2 \\}	}", 2 ],
            pb: [ "Macro", "{	\\{ #1 , #2 \\}	}", 2 ],
            vectorbold: [ "Macro", "{	\\boldsymbol{ #1 }	}", 1 ],
            vb: [ "Macro", "{	\\boldsymbol{ #1 }	}", 1 ],
            vectorarrow: [ "Macro", "{	\\vec{\\boldsymbol{ #1 }}	}", 1 ],
            va: [ "Macro", "{	\\vec{\\boldsymbol{ #1 }}	}", 1 ],
            vectorunit: [ "Macro", "{	{\\boldsymbol{\\hat{ #1 }}}	}", 1 ],
            vu: [ "Macro", "{	{\\boldsymbol{\\hat{ #1 }}}	}", 1 ],
            dotproduct: [ "Macro", "{	\\boldsymbol\\cdot	}" ],
            vdot: [ "Macro", "{	\\boldsymbol\\cdot	}" ],
            crossproduct: [ "Macro", "{	\\boldsymbol\\times	}" ],
            cross: [ "Macro", "{	\\boldsymbol\\times	}" ],
            cp: [ "Macro", "{	\\boldsymbol\\times	}" ],
            gradient: [ "Macro", "{	\\boldsymbol\\nabla	}" ],
            grad: [ "Macro", "{	\\boldsymbol\\nabla	}" ],
            divergence: [ "Macro", "{	\\grad\\vdot	}" ],
            div: [ "Macro", "{	\\grad\\vdot	}" ],
            curl: [ "Macro", "{	\\grad\\cross	}" ],
            laplacian: [ "Macro", "{	\\nabla^2	}" ],
            tr: [ "Macro", "{	\\text{tr }	}" ],
            Tr: [ "Macro", "{	\\text{Tr }	}" ],
            rank: [ "Macro", "{	\\text{rank }	}" ],
            erf: [ "Macro", "{	\\text{erf }	}" ],
            Res: [ "Macro", "{	\\text{Res}	}" ],
            principalvalue: [ "Macro", "{	\\mathcal{P}	}" ],
            pv: [ "Macro", "{	\\mathcal{P}	}" ],
            PV: [ "Macro", "{	\\text{P.V.}	}" ],
            Re: [ "Macro", "{	\\text{Re} \\{ #1 \\}	}", 1 ],
            Im: [ "Macro", "{	\\text{Im} \\{ #1 \\}	}", 1 ],
            qqtext: [ "Macro", "{	\\quad\\text{ #1 }\\quad	}", 1 ],
            qq: [ "Macro", "{	\\quad\\text{ #1 }\\quad	}", 1 ],
            qcomma: [ "Macro", "{	\\text{,}\\quad	}" ],
            qc: [ "Macro", "{	\\text{,}\\quad	}" ],
            qcc: [ "Macro", "{	\\quad\\text{c.c.}\\quad	}" ],
            qif: [ "Macro", "{	\\quad\\text{if}\\quad	}" ],
            qthen: [ "Macro", "{	\\quad\\text{then}\\quad	}" ],
            qelse: [ "Macro", "{	\\quad\\text{else}\\quad	}" ],
            qotherwise: [ "Macro", "{	\\quad\\text{otherwise}\\quad	}" ],
            qunless: [ "Macro", "{	\\quad\\text{unless}\\quad	}" ],
            qgiven: [ "Macro", "{	\\quad\\text{given}\\quad	}" ],
            qusing: [ "Macro", "{	\\quad\\text{using}\\quad	}" ],
            qassume: [ "Macro", "{	\\quad\\text{assume}\\quad	}" ],
            qsince: [ "Macro", "{	\\quad\\text{since}\\quad	}" ],
            qlet: [ "Macro", "{	\\quad\\text{let}\\quad	}" ],
            qfor: [ "Macro", "{	\\quad\\text{for}\\quad	}" ],
            qall: [ "Macro", "{	\\quad\\text{all}\\quad	}" ],
            qeven: [ "Macro", "{	\\quad\\text{even}\\quad	}" ],
            qodd: [ "Macro", "{	\\quad\\text{odd}\\quad	}" ],
            qinteger: [ "Macro", "{	\\quad\\text{integer}\\quad	}" ],
            qand: [ "Macro", "{	\\quad\\text{and}\\quad	}" ],
            qor: [ "Macro", "{	\\quad\\text{or}\\quad	}" ],
            qas: [ "Macro", "{	\\quad\\text{as}\\quad	}" ],
            qin: [ "Macro", "{	\\quad\\text{in}\\quad	}" ],
            differential: [ "Macro", "{	\\text{d}	}" ],
            dd: [ "Macro", "{	\\text{d}	}" ],
            derivative: [ "Macro", "{	\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}	}", 2 ],
            dv: [ "Macro", "{	\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}	}", 2 ],
            partialderivative: [ "Macro", "{	\\frac{\\partial{ #1 }}{\\partial{ #2 }}	}", 2 ],
            pdv: [ "Macro", "{	\\frac{\\partial{ #1 }}{\\partial{ #2 }}	}", 2 ],
            variation: [ "Macro", "{	\\delta	}" ],
            "var": [ "Macro", "{	\\delta	}" ],
            functionalderivative: [ "Macro", "{	\\frac{\\delta{ #1 }}{\\delta{ #2 }}	}", 2 ],
            fdv: [ "Macro", "{	\\frac{\\delta{ #1 }}{\\delta{ #2 }}	}", 2 ],
            ket: [ "Macro", "{	\\vert { #1 } \\rangle	}", 1 ],
            bra: [ "Macro", "{	\\langle { #1} \\vert	}", 1 ],
            innerproduct: [ "Macro", "{	\\langle {#1} \\vert { #2} \\rangle	}", 2 ],
            braket: [ "Macro", "{	\\langle {#1} \\vert { #2} \\rangle	}", 2 ],
            outerproduct: [ "Macro", "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            dyad: [ "Macro", "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            ketbra: [ "Macro", "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            op: [ "Macro", "{	\\vert { #1 } \\rangle\\langle { #2} \\vert	}", 2 ],
            expectationvalue: [ "Macro", "{	\\langle {#1 } \\rangle	}", 1 ],
            expval: [ "Macro", "{	\\langle {#1 } \\rangle	}", 1 ],
            ev: [ "Macro", "{	\\langle {#1 } \\rangle	}", 1 ],
            matrixelement: [ "Macro", "{	\\langle{ #1 }\\vert{ #2 }\\vert{#3}\\rangle	}", 3 ],
            matrixel: [ "Macro", "{	\\langle{ #1 }\\vert{ #2 }\\vert{#3}\\rangle	}", 3 ],
            mel: [ "Macro", "{	\\langle{ #1 }\\vert{ #2 }\\vert{#3}\\rangle	}", 3 ]
        }
    });
});

MathJax.Ajax.loadComplete("[Contrib]/physics/unpacked/physics.js");