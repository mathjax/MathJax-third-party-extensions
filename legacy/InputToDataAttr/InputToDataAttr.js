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
(function(n,t,i){var u=MathJax.Extension.InputToDataAttr={version:"2.6.1",Config:function(){i.Register.MessageHook("End Math",function(n){return u.AddInputDataAttr(n[1])})},AddInputDataAttr:function(n){var t={jax:i.getAllJax(n),i:0,callback:MathJax.Callback({})};return this.HandleJax(t),t.callback},HandleJax:function(n){for(var u=n.jax.length,t,r,i;n.i<u;)t=n.jax[n.i],r=document.getElementById(t.inputID+"-Frame"),i=t.inputJax.toLowerCase(),r&&(i=="asciimath"||i=="tex")&&r.setAttribute("data-"+i,t.originalText),n.i++;n.callback()}};MathJax.Hub.Register.StartupHook("End Config",u.Config),i.Startup.signal.Post("InputToDataAttr Ready")})(MathJax.Ajax,MathJax.Callback,MathJax.Hub,MathJax.HTML),MathJax.Ajax.loadComplete("[Contrib]/InputToDataAttr/InputToDataAttr.js");
