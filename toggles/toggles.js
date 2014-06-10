/****************************************************
 *
 *  toggles.js
 *  
 *  Implements LaTeX counters and related macros for MathJax.
 * 
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2014 Tom Leathrum <https://github.com/leathrum/>.
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
MathJax.Callback.Queue(MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var t=MathJax.InputJax.TeX,e=t.Definitions;e.macros.newtoggle="NEWTOGGLE_toggles",e.macros.providetoggle="PROVIDETOGGLE_toggles",e.macros.settoggle="SETTOGGLE_toggles",e.macros.toggletrue="TOGGLETRUE_toggles",e.macros.togglefalse="TOGGLEFALSE_toggles",e.macros.iftoggle="IFTOGGLE_toggles",e.macros.nottoggle="NOTTOGGLE_toggles";var r=[];t.Parse.Augment({NEWTOGGLE_toggles:function(e){var s=this.trimSpaces(this.GetArgument(e));"\\"===s.charAt(0)&&(s=s.substr(1)),s.match(/^(.|[a-z]+)$/i)||t.Error("Illegal toggle name for "+e),r[s]=!0},PROVIDETOGGLE_toggles:function(e){var s=this.trimSpaces(this.GetArgument(e));"\\"===s.charAt(0)&&(s=s.substr(1)),s.match(/^(.|[a-z]+)$/i)||t.Error("Illegal toggle name for "+e),r[s]=!0},TOGGLETRUE_toggles:function(e){var s=this.trimSpaces(this.GetArgument(e));"\\"===s.charAt(0)&&(s=s.substr(1)),s.match(/^(.|[a-z]+)$/i)||t.Error("Illegal toggle name for "+e),r[s]=!0},TOGGLEFALSE_toggles:function(e){var s=this.trimSpaces(this.GetArgument(e));"\\"===s.charAt(0)&&(s=s.substr(1)),s.match(/^(.|[a-z]+)$/i)||t.Error("Illegal toggle name for "+e),r[s]=!1},SETTOGGLE_toggles:function(e){var s=this.trimSpaces(this.GetArgument(e)),a=this.trimSpaces(this.GetArgument(e));"\\"===s.charAt(0)&&(s=s.substr(1)),s.match(/^(.|[a-z]+)$/i)||t.Error("Illegal toggle name for "+e),"true"===a.toLowerCase()?r[s]=!1:"false"===a.toLowerCase()?r[s]=!1:t.Error("Illegal toggle value for "+e)},IFTOGGLE_toggles:function(e){var s,a,g=this.trimSpaces(this.GetArgument(e));"\\"===g.charAt(0)&&(g=g.substr(1)),g.match(/^(.|[a-z]+)$/i)||t.Error("Illegal toggle name for "+e),r[g]?(s=this.ParseArg(e),a=this.GetArgument(e),this.Push(s)):(s=this.GetArgument(e),a=this.ParseArg(e),this.Push(a))},NOTTOGGLE_toggles:function(e){var s,a,g=this.trimSpaces(this.GetArgument(e));"\\"===g.charAt(0)&&(g=g.substr(1)),g.match(/^(.|[a-z]+)$/i)||t.Error("Illegal toggle name for "+e),r[g]?(s=this.ParseArg(e),a=this.GetArgument(e),this.Push(a)):(s=this.GetArgument(e),a=this.ParseArg(e),this.Push(s))}}),MathJax.Hub.Startup.signal.Post("TeX toggles Ready")})),MathJax.Ajax.loadComplete("[Contrib]/toggles/unpacked/toggles.js");