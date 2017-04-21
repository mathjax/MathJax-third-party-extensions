/*************************************************************
 *
 *  img.js
 *
 *  Implements TeX macro for embedding images
 *
 *  Usage:
 *
 *  \img{URL}{vertical alignment}{width}{height}
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2014 The MathJax Consortium
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
MathJax.Extension["TeX/img"]={version:"0.1"},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.InputJax.TeX,b=MathJax.ElementJax.mml,c=function(b){return""===b||b.match(/^\s*([-+]?(\.\d+|\d+(\.\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)\s*$/)?b.replace(/ /g,""):(a.Error("Bad dimension for image: "+b),void 0)};a.Definitions.macros.img="myImage",a.Parse.Augment({myImage:function(d){var e=this.GetBrackets(d,""),f={valign:"",width:"",height:""};if(-1!==e.indexOf(",")||-1!==e.indexOf("="))for(var g=e.split(","),h=0,i=g.length;i>h;++h){var j=g[h].split("="),k=j[0].replace(/^ +/,"").replace(/ +$/,"");f.hasOwnProperty(k)||a.Error(["UnknownKey","Unknown parameter in %1",k]);var l=j.slice(1).join("=");l=c(l),f[k]=l}else f.valign=c(e),f.width=c(this.GetBrackets(d,"")),f.height=c(this.GetBrackets(d,""));f.src=this.GetArgument(d),f.valign||delete f.valign,f.width||delete f.width,f.height||delete f.height,this.Push(this.mmlToken(b.mglyph().With(f)))}})}),MathJax.Callback.Queue(["loadComplete",MathJax.Ajax,"[Contrib]/img/img.js"]);
