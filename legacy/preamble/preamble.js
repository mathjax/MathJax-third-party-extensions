/****************************************************
 *
 *  preamble.js
 *  
 *  Implements the ability to provide a TeX preamble in the TeX block of
 *  your configuration.  The preamble can be used to perform macro
 *  definitions in TeX syntax.  
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
MathJax.Extension["TeX/preamble"]={version:"1.0",processPreamble:function(e){var a;try{a=MathJax.InputJax.TeX.Parse(e).mml()}catch(t){if(t.restart)return MathJax.Callback.After(["processPreamble",this,e],t.restart);MathJax.Message.Set("Preamble Error: "+t.message.replace(/\n.*/,""),null,5e3)}return a&&a.data&&a.data.length&&MathJax.Message.Set("WARNING: TeX preamble should not produce output.",null,5e3),null}},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var e=MathJax.InputJax.TeX.config.preamble;return e instanceof Array&&(e=e.join("\n")),e?MathJax.Extension["TeX/preamble"].processPreamble(e):null}),MathJax.Ajax.loadComplete("[Contrib]/preamble/preamble.js");