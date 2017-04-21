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
 */MathJax.Hub.Register.StartupHook("TeX Jax Ready", function() {
    MathJax.InputJax.TeX.Definitions.Add({
        macros: {
            quantity: [ "Macro", "{\\left\\{ #1 \\right\\}}", 1 ],
            qty: [ "Macro", "{\\left\\{ #1 \\right\\}}", 1 ],
            pqty: [ "Macro", "{\\left( #1 \\right)}", 1 ],
            bqty: [ "Macro", "{\\left[ #1 \\right]}", 1 ],
            vqty: [ "Macro", "{\\left\\vert #1 \\right\\vert}", 1 ],
            Bqty: [ "Macro", "{\\left\\{ #1 \\right\\}}", 1 ],
            absolutevalue: [ "Macro", "{\\left\\vert #1 \\right\\vert}", 1 ],
            abs: [ "Macro", "{\\left\\vert #1 \\right\\vert}", 1 ],
            norm: [ "Macro", "{\\left\\Vert #1 \\right\\Vert}", 1 ],
            evaluated: [ "Macro", "{#1 \\vert}", 1 ],
            eval: [ "Macro", "{#1 \\vert}", 1 ],
            order: [ "Macro", "{\\mathcal{O} \\left( #1 \\right)}", 1 ],
            commutator: [ "Macro", "{\\left[ #1 , #2 \\right]}", 2 ],
            comm: [ "Macro", "{\\left[ #1 , #2 \\right]}", 2 ],
            anticommutator: [ "Macro", "{\\left\\{ #1 , #2 \\right\\}}", 2 ],
            acomm: [ "Macro", "{\\left\\{ #1 , #2 \\right\\}}", 2 ],
            poissonbracket: [ "Macro", "{\\left\\{ #1 , #2 \\right\\}}", 2 ],
            pb: [ "Macro", "{\\left\\{ #1 , #2 \\right\\}}", 2 ],
            vectorbold: [ "Macro", "{\\boldsymbol{ #1 }}", 1 ],
            vb: [ "Macro", "{\\boldsymbol{ #1 }}", 1 ],
            vectorarrow: [ "Macro", "{\\vec{\\boldsymbol{ #1 }}}", 1 ],
            va: [ "Macro", "{\\vec{\\boldsymbol{ #1 }}}", 1 ],
            vectorunit: [ "Macro", "{{\\boldsymbol{\\hat{ #1 }}}}", 1 ],
            vu: [ "Macro", "{{\\boldsymbol{\\hat{ #1 }}}}", 1 ],
            dotproduct: [ "Macro", "{\\boldsymbol\\cdot}" ],
            vdot: [ "Macro", "{\\boldsymbol\\cdot}" ],
            crossproduct: [ "Macro", "{\\boldsymbol\\times}" ],
            cross: [ "Macro", "{\\boldsymbol\\times}" ],
            cp: [ "Macro", "{\\boldsymbol\\times}" ],
            gradient: [ "Macro", "{\\boldsymbol\\nabla}" ],
            grad: [ "Macro", "{\\boldsymbol\\nabla}" ],
            divergence: [ "Macro", "{\\grad\\vdot}" ],
            div: [ "Macro", "{\\grad\\vdot}" ],
            curl: [ "Macro", "{\\grad\\cross}" ],
            laplacian: [ "Macro", "{\\nabla^2}" ],
            tr: [ "Macro", "{\\operatorname{tr}}" ],
            Tr: [ "Macro", "{\\operatorname{Tr}}" ],
            rank: [ "Macro", "{\\operatorname{rank}}" ],
            erf: [ "Macro", "{\\operatorname{erf}}" ],
            Res: [ "Macro", "{\\operatorname{Res}}" ],
            principalvalue: [ "Macro", "{\\mathcal{P}}" ],
            pv: [ "Macro", "{\\mathcal{P}}" ],
            PV: [ "Macro", "{\\operatorname{P.V.}}" ],
            Re: [ "Macro", "{\\operatorname{Re} \\left\\{ #1 \\right\\}}", 1 ],
            Im: [ "Macro", "{\\operatorname{Im} \\left\\{ #1 \\right\\}}", 1 ],
            qqtext: [ "Macro", "{\\quad\\text{ #1 }\\quad}", 1 ],
            qq: [ "Macro", "{\\quad\\text{ #1 }\\quad}", 1 ],
            qcomma: [ "Macro", "{\\text{,}\\quad}" ],
            qc: [ "Macro", "{\\text{,}\\quad}" ],
            qcc: [ "Macro", "{\\quad\\text{c.c.}\\quad}" ],
            qif: [ "Macro", "{\\quad\\text{if}\\quad}" ],
            qthen: [ "Macro", "{\\quad\\text{then}\\quad}" ],
            qelse: [ "Macro", "{\\quad\\text{else}\\quad}" ],
            qotherwise: [ "Macro", "{\\quad\\text{otherwise}\\quad}" ],
            qunless: [ "Macro", "{\\quad\\text{unless}\\quad}" ],
            qgiven: [ "Macro", "{\\quad\\text{given}\\quad}" ],
            qusing: [ "Macro", "{\\quad\\text{using}\\quad}" ],
            qassume: [ "Macro", "{\\quad\\text{assume}\\quad}" ],
            qsince: [ "Macro", "{\\quad\\text{since}\\quad}" ],
            qlet: [ "Macro", "{\\quad\\text{let}\\quad}" ],
            qfor: [ "Macro", "{\\quad\\text{for}\\quad}" ],
            qall: [ "Macro", "{\\quad\\text{all}\\quad}" ],
            qeven: [ "Macro", "{\\quad\\text{even}\\quad}" ],
            qodd: [ "Macro", "{\\quad\\text{odd}\\quad}" ],
            qinteger: [ "Macro", "{\\quad\\text{integer}\\quad}" ],
            qand: [ "Macro", "{\\quad\\text{and}\\quad}" ],
            qor: [ "Macro", "{\\quad\\text{or}\\quad}" ],
            qas: [ "Macro", "{\\quad\\text{as}\\quad}" ],
            qin: [ "Macro", "{\\quad\\text{in}\\quad}" ],
            differential: [ "Macro", "{\\text{d}}" ],
            dd: [ "Macro", "{\\text{d}}" ],
            derivative: [ "Macro", "{\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}}", 2 ],
            dv: [ "Macro", "{\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}}", 2 ],
            partialderivative: [ "Macro", "{\\frac{\\partial{ #1 }}{\\partial{ #2 }}}", 2 ],
            pdv: [ "Macro", "{\\frac{\\partial{ #1 }}{\\partial{ #2 }}}", 2 ],
            variation: [ "Macro", "{\\delta}" ],
            "var": [ "Macro", "{\\delta}" ],
            functionalderivative: [ "Macro", "{\\frac{\\delta{ #1 }}{\\delta{ #2 }}}", 2 ],
            fdv: [ "Macro", "{\\frac{\\delta{ #1 }}{\\delta{ #2 }}}", 2 ],
            ket: [ "Macro", "{\\left\\vert { #1 } \\right\\rangle}", 1 ],
            bra: [ "Macro", "{\\left\\langle { #1} \\right\\vert}", 1 ],
            innerproduct: [ "Macro", "{\\left\\langle {#1} \\mid { #2} \\right\\rangle}", 2 ],
            braket: [ "Macro", "{\\left\\langle {#1} \\mid { #2} \\right\\rangle}", 2 ],
            outerproduct: [ "Macro", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}", 2 ],
            dyad: [ "Macro", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}", 2 ],
            ketbra: [ "Macro", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}", 2 ],
            op: [ "Macro", "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}", 2 ],
            expectationvalue: [ "Macro", "{\\left\\langle {#1 } \\right\\rangle}", 1 ],
            expval: [ "Macro", "{\\left\\langle {#1 } \\right\\rangle}", 1 ],
            ev: [ "Macro", "{\\left\\langle {#1 } \\right\\rangle}", 1 ],
            matrixelement: [ "Macro", "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}", 3 ],
            matrixel: [ "Macro", "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}", 3 ],
            mel: [ "Macro", "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}", 3 ]
        }
    });
});

MathJax.Ajax.loadComplete("[Contrib]/physics/unpacked/physics.js");