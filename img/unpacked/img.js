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
MathJax.Extension["TeX/img"] = {
    version: "0.1",
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
          var TEX = MathJax.InputJax.TeX,
              MML = MathJax.ElementJax.mml;
          var CheckDimen = function (dimen) {
            if (dimen === "" ||
                dimen.match(/^\s*([-+]?(\.\d+|\d+(\.\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)\s*$/))
                    return dimen.replace(/ /g,"");
            TEX.Error("Bad dimension for image: "+dimen);
          };
          TEX.Definitions.macros.img = "myImage";
          TEX.Parse.Augment({
            myImage: function (name) {
              var src = this.GetArgument(name),
                  valign = CheckDimen(this.GetArgument(name)),
                  width  = CheckDimen(this.GetArgument(name)),
                  height = CheckDimen(this.GetArgument(name));
              var def = {src:src};
              if (valign) {def.valign = valign}
              if (width)  {def.width  = width}
              if (valign) {def.height = height}
              this.Push(this.mmlToken(MML.mglyph().With(def)));
            }
          });
        });
MathJax.Callback.Queue(
  ["loadComplete",MathJax.Ajax,"[Contrib]/img/unpacked/img.js"]
);