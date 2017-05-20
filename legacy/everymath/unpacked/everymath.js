/****************************************************
 *
 *  TeX-everymath.js
 *  
 *  Implements the \everymath macro for TeX input.  You can configure
 *  the initial value with the
 *  
 *    TeX: { everymath: "tokens" }
 *  
 *  configuration block, (where "tokens" is replaced by whatever you want
 *  to insert at the beginning of every math expression).  Otherwise, use
 *  
 *     \(\everymath{tokens}\)
 *  
 *  to set the string to be inserted before each math expression.
 *  
 *  You can load this file via the config=file parameter on the script
 *  tag that loads MathJax.js, or by including it in the extensions
 *  array in your configuration.
 *
 *  Be sure to change the loadComplete() address to the URL
 *  of the location of this file on your server. 
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

MathJax.Extension["TeX/everymath"] = {
  version: "1.0",
  config: {everymath: ""}
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var TEX = MathJax.InputJax.TeX,
      TEXDEF = TEX.Definitions;
      EVERYMATH = MathJax.Extension["TeX/everymath"],
      CONFIG = EVERYMATH.config;
  //
  //  MathJax.Hub.CombineConfig only works for new configuration blocks, 
  //  but we are adding to the existing TeX block, so insert the preferences
  //  that aren't already set.
  //
  EVERYMATH.config = MathJax.Hub.config.TeX;
  for (var id in CONFIG) {
    if (CONFIG.hasOwnProperty(id) && EVERYMATH.config[id] == null) {
      EVERYMATH.config[id] = config[id];
    }
  }
  CONFIG = EVERYMATH.config;

  //
  //  Implements \everymath{tokens}
  //
  TEXDEF.macros.everymath = "Everymath";
  TEX.Parse.Augment({
    Everymath: function (name) {
      CONFIG.everymath = this.GetArgument(name);
    }
  });

  if (TEX.prefilterHooks) {
    // v2.0 approach
    TEX.prefilterHooks.Add(function (data) {data.math = CONFIG.everymath + data.math}, 1);
  } else {
    // v1.x approach
    var PREFILTER = TEX.prefilterMath;
    TEX.Augment({
      prefilterMath: function (math,displaymode,script) {
        math = CONFIG.everymath + math;
        return PREFILTER.call(TEX,math,displaymode,script);
      }
    });
  }
  
});

MathJax.Ajax.loadComplete("[Contrib]/everymath/unpacked/everymath.js");

