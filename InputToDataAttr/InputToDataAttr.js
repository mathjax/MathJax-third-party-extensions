/*************************************************************
 *
 *  MathJax/extensions/InputToDataAttr.js
 *  
 *  Implements an extension that takes the input TeX or AsciiMath
 *  and inserts it as a data-tex or data-asciimath attribute
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2016 David Lippman
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
 */
(function(b,d,c,e){var a=MathJax.Extension.InputToDataAttr={version:"2.6.1",Config:function(){c.Register.MessageHook("End Math",function(f){return a.AddInputDataAttr(f[1])})},AddInputDataAttr:function(f){var g={jax:c.getAllJax(f),i:0,callback:MathJax.Callback({})};this.HandleJax(g);return g.callback},HandleJax:function(i){var g=i.jax.length,h,j,f;while(i.i<g){h=i.jax[i.i];j=document.getElementById(h.inputID+"-Frame");f=h.inputJax.toLowerCase();if(f=="asciimath"||f=="tex"){j.setAttribute("data-"+f,h.originalText)}i.i++}i.callback()}};MathJax.Hub.Register.StartupHook("End Config",a.Config);c.Startup.signal.Post("InputToDataAttr Ready")})(MathJax.Ajax,MathJax.Callback,MathJax.Hub,MathJax.HTML);MathJax.Ajax.loadComplete("[Contrib]/InputToDataAttr/InputToDataAttr.js");
