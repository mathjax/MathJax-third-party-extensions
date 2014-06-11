/*************************************************************
 *  sqrtspacing.js
 *
 *  Inserts extra padding after roots when necessary
 *  
 *  To load it include
 *  
 *     MathJax.Hub.Config({
 *       extensions: ["[Contrib]/sqrtspacing/sqrtspacing.js"],
 *     });
 *  
 *  in your configuration.
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2012 - 2013 Evgeny Savel'ev.
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
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var a=MathJax.OutputJax["HTML-CSS"],t=MathJax.ElementJax.mml;t.msqrt.Augment({HTMLhandleSpace:function(t){var e=this.HTMLgetMu(t);var p=this.getValues("scriptlevel","lspace","rspace");p.lspace=Math.max(0,a.length2em(.05,e));p.rspace=Math.max(0,a.length2em(.17,e));var s=this,r=this.parent;while(r&&r.isEmbellished()&&r.Core()===s){s=r;r=r.parent;t=s.HTMLspanElement()}if(r.type==="mrow"){var n,i=r.data.length;for(n=0;n<i;n++){if(s==r.data[n])break}if(s!==r.data[i-1]){if(r.data[n+1].type!="mspace"&&r.data[n+1].type!="mphantom"&&p.rspace){t.style.paddingRight=a.Em(p.rspace)}}if(s!==r.data[0]){if(r.data[n-1].type!="mspace"&&r.data[n-1].type!="mphantom"&&p.lspace){t.style.paddingLeft=a.Em(p.lspace)}}}}});t.mroot.Augment({HTMLhandleSpace:t.msqrt.prototype.HTMLhandleSpace});MathJax.Hub.Startup.signal.Post("HTML-CSS sqrtspacing Ready")});MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var a=MathJax.OutputJax["SVG"],t=MathJax.ElementJax.mml;t.msqrt.Augment({SVGhandleSpace:function(t){var e=this.SVGgetMu(t);var p=this.getValues("scriptlevel","lspace","rspace");p.lspace=Math.max(0,a.length2em(.05,e));p.rspace=Math.max(0,a.length2em(.17,e));var s=this,r=this.parent;while(r&&r.isEmbellished()&&r.Core()===s){s=r;r=r.parent}if(r.type==="mrow"){var n,i=r.data.length;for(n=0;n<i;n++){if(s==r.data[n])break}if(s!==r.data[i-1]){if(r.data[n+1].type!="mspace"&&r.data[n+1].type!="mphantom"&&p.rspace){t.X=p.rspace}}if(s!==r.data[0]){if(r.data[n-1].type!="mspace"&&r.data[n-1].type!="mphantom"&&p.lspace){t.x+=p.lspace}}}}});t.mroot.Augment({SVGhandleSpace:t.msqrt.prototype.SVGhandleSpace});MathJax.Hub.Startup.signal.Post("SVG sqrtspacing Ready")});MathJax.Ajax.loadComplete("[Contrib]sqrtspacing/sqrtspacing.js");