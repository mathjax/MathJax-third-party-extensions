/****************************************************
 *
 *  TeX-everymath.js
 *  
 *  Implements the \everymath macro for TeX input.  You can configure
 *  the initial value with the
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
MathJax.Extension["TeX/everymath"]={version:"1.0",config:{everymath:""}},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var e=MathJax.InputJax.TeX,t=e.Definitions;EVERYMATH=MathJax.Extension["TeX/everymath"],CONFIG=EVERYMATH.config,EVERYMATH.config=MathJax.Hub.config.TeX;for(var a in CONFIG)CONFIG.hasOwnProperty(a)&&null==EVERYMATH.config[a]&&(EVERYMATH.config[a]=config[a]);if(CONFIG=EVERYMATH.config,t.macros.everymath="Everymath",e.Parse.Augment({Everymath:function(e){CONFIG.everymath=this.GetArgument(e)}}),e.prefilterHooks)e.prefilterHooks.Add(function(e){e.math=CONFIG.everymath+e.math},1);else{var r=e.prefilterMath;e.Augment({prefilterMath:function(t,a,n){return t=CONFIG.everymath+t,r.call(e,t,a,n)}})}}),MathJax.Ajax.loadComplete("[Contrib]/everymath/everymath.js");