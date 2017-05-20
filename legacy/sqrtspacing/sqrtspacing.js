/*************************************************************
 *
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
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function(){var a=MathJax.OutputJax["HTML-CSS"],t=MathJax.ElementJax.mml;t.msqrt.Augment({HTMLhandleSpace:function(t){var e=this.HTMLgetMu(t),p=this.texSpacing();var s=this.getValues("scriptlevel","lspace","rspace");s.lspace=Math.max(0,a.length2em(.05,e));s.rspace=Math.max(0,a.length2em(.17,e));var i=this,l=this.parent;while(l&&l.isEmbellished()&&l.Core()===i){i=l;l=l.parent;t=i.HTMLspanElement()}if(l.type==="mrow"){var n,r=l.data.length;for(n=0;n<r;n++){if(i==l.data[n])break}if(i!==l.data[r-1]){if(l.data[n+1].type!="mo"&&l.data[n+1].type!="mspace"&&l.data[n+1].type!="mphantom"&&s.rspace){t.style.paddingRight=a.Em(s.rspace)}}if(i!==l.data[0]){if(l.data[n-1].type!="mo"&&l.data[n-1].type!="mspace"&&l.data[n-1].type!="mphantom"&&s.lspace){t.style.paddingLeft=a.Em(s.lspace)}}}if(p!==""){p=a.length2em(p,this.HTMLgetScale())/(t.scale||1);if(t.style.paddingLeft){p+=parseFloat(t.style.paddingLeft)}t.style.paddingLeft=a.Em(p)}}});t.mroot.Augment({HTMLhandleSpace:t.msqrt.prototype.HTMLhandleSpace});MathJax.Hub.Startup.signal.Post("HTML-CSS sqrtspacing Ready")});MathJax.Hub.Register.StartupHook("SVG Jax Ready",function(){var a=MathJax.OutputJax["SVG"],t=MathJax.ElementJax.mml;t.msqrt.Augment({SVGhandleSpace:function(t){var e=this.SVGgetMu(t),p=this.texSpacing();var s=this.getValues("scriptlevel","lspace","rspace");s.lspace=Math.max(0,a.length2em(.05,e));s.rspace=Math.max(0,a.length2em(.17,e));var i=this,l=this.parent;while(l&&l.isEmbellished()&&l.Core()===i){i=l;l=l.parent}if(l.type==="mrow"){var n,r=l.data.length;for(n=0;n<r;n++){if(i==l.data[n])break}if(i!==l.data[r-1]){if(l.data[n+1].type!="mo"&&l.data[n+1].type!="mspace"&&l.data[n+1].type!="mphantom"&&s.rspace){t.X=s.rspace}}if(i!==l.data[0]){if(l.data[n-1].type!="mo"&&l.data[n-1].type!="mspace"&&l.data[n-1].type!="mphantom"&&s.lspace){t.x+=s.lspace}}}if(p!==""){t.x+=a.length2em(p,this.SVGgetScale())/t.scale}}});t.mroot.Augment({SVGhandleSpace:t.msqrt.prototype.SVGhandleSpace});MathJax.Hub.Startup.signal.Post("SVG sqrtspacing Ready")});MathJax.Ajax.loadComplete("[Contrib]/sqrtspacing/sqrtspacing.js");