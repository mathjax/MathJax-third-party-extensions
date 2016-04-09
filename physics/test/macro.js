/****************************************************
 *
 *  physics.js
 *  
 *  Implements the Physics Package for LaTeX input.
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2015-2016 Kolen Cheung <https://github.com/ickc/MathJax-third-party-extensions>.
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
 */MathJax.Hub.Config({
    TeX: {
        Macros: {
            quantity: [ "{	\\left\\{ #1 \\right\\}	}", 1 ],
            qty: [ "{	\\left\\{ #1 \\right\\}	}", 1 ],
            pqty: [ "{	\\left( #1 \\right)	}", 1 ],
            bqty: [ "{	\\left[ #1 \\right]	}", 1 ],
            vqty: [ "{	\\left\\vert #1 \\right\\vert	}", 1 ],
            Bqty: [ "{	\\left\\{ #1 \\right\\}	}", 1 ],
            absolutevalue: [ "{	\\left\\vert #1 \\right\\vert	}", 1 ],
            abs: [ "{	\\left\\vert #1 \\right\\vert	}", 1 ],
            norm: [ "{	\\left\\Vert #1 \\right\\Vert	}", 1 ],
            evaluated: [ "{	#1 \\vert	}", 1 ],
            eval: [ "{	#1 \\vert	}", 1 ],
            order: [ "{	\\mathcal{O} \\left( #1 \\right)	}", 1 ],
            commutator: [ "{	\\left[ #1 , #2 \\right]	}", 2 ],
            comm: [ "{	\\left[ #1 , #2 \\right]	}", 2 ],
            anticommutator: [ "{	\\left\\{ #1 , #2 \\right\\}	}", 2 ],
            acomm: [ "{	\\left\\{ #1 , #2 \\right\\}	}", 2 ],
            poissonbracket: [ "{	\\left\\{ #1 , #2 \\right\\}	}", 2 ],
            pb: [ "{	\\left\\{ #1 , #2 \\right\\}	}", 2 ],
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
            tr: [ "{	\\operatorname{tr}	}" ],
            Tr: [ "{	\\operatorname{Tr}	}" ],
            rank: [ "{	\\operatorname{rank}	}" ],
            erf: [ "{	\\operatorname{erf}	}" ],
            Res: [ "{	\\operatorname{Res}	}" ],
            principalvalue: [ "{	\\mathcal{P}	}" ],
            pv: [ "{	\\mathcal{P}	}" ],
            PV: [ "{	\\operatorname{P.V.}	}" ],
            Re: [ "{	\\operatorname{Re} \\left\\{ #1 \\right\\}	}", 1 ],
            Im: [ "{	\\operatorname{Im} \\left\\{ #1 \\right\\}	}", 1 ],
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
            ket: [ "{	\\left\\vert { #1 } \\right\\rangle	}", 1 ],
            bra: [ "{	\\left\\langle { #1} \\right\\vert	}", 1 ],
            innerproduct: [ "{	\\left\\langle {#1} \\mid { #2} \\right\\rangle	}", 2 ],
            braket: [ "{	\\left\\langle {#1} \\mid { #2} \\right\\rangle	}", 2 ],
            outerproduct: [ "{	\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert	}", 2 ],
            dyad: [ "{	\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert	}", 2 ],
            ketbra: [ "{	\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert	}", 2 ],
            op: [ "{	\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert	}", 2 ],
            expectationvalue: [ "{	\\left\\langle {#1 } \\right\\rangle	}", 1 ],
            expval: [ "{	\\left\\langle {#1 } \\right\\rangle	}", 1 ],
            ev: [ "{	\\left\\langle {#1 } \\right\\rangle	}", 1 ],
            matrixelement: [ "{	\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle	}", 3 ],
            matrixel: [ "{	\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle	}", 3 ],
            mel: [ "{	\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle	}", 3 ]
        }
    }
});