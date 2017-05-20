/****************************************************
 *
 *  forminput.js
 *  
 *  Implements the \FormInput extension for including text <input> elements in
 *  math expressions.  This only works in HTML-CSS output (all browsers),
 *  and NativeMML output in Firefox (but not IE/MathPlayer or Opera).
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2014 Davide Cervone <https://github.com/dpvc/>.
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
MathJax.Callback.Queue(MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var t=MathJax.InputJax.TeX,a=t.Definitions,e=MathJax.ElementJax.mml,n=MathJax.HTML;a.macros.FormInput="FormInput",t.Parse.Augment({FormInput:function(t){var a=this.GetBrackets(t),i=this.GetBrackets(t),m=this.GetBrackets(t),s=this.GetArgument(t);(null==a||""===a)&&(a="2"),null==m&&(m=""),i=("MathJax_Input "+(i||"")).replace(/ +$/,"");var l=n.Element("input",{type:"text",name:s,id:s,size:a,className:i,value:m});l.setAttribute("xmlns","http://www.w3.org/1999/xhtml");var r=e["annotation-xml"](e.xml(l)).With({encoding:"application/xhtml+xml",isToken:!0});this.Push(e.semantics(r))}})})),MathJax.Ajax.loadComplete("[Contrib]/forminput/forminput.js");