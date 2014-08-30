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
MathJax.Extension["TeX/img"]={version:"0.1"},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.InputJax.TeX,b=MathJax.ElementJax.mml,c=function(b){return""===b||b.match(/^\s*([-+]?(\.\d+|\d+(\.\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)\s*$/)?b.replace(/ /g,""):(a.Error("Bad dimension for image: "+b),void 0)};a.Definitions.macros.img="myImage",a.Parse.Augment({myImage:function(a){var d=this.GetArgument(a),e=c(this.GetArgument(a)),f=c(this.GetArgument(a)),g=c(this.GetArgument(a)),h={src:d};e&&(h.valign=e),f&&(h.width=f),e&&(h.height=g),this.Push(this.mmlToken(b.mglyph().With(h)))}})}),MathJax.Callback.Queue(["loadComplete",MathJax.Ajax,"[Contrib]/img/unpacked/img.js"]);;