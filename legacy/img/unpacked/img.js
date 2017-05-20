/*************************************************************
 *
 *  img.js
 *
 *  Implements TeX macro for embedding images
 *
 *  Usage:
 *
 *  \img[valign=<vertical alignment>,width=<width>,height=<height>]{URL}
 *  or
 *  \img[<valign>][<width>][<height>]{URL}
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
              var optarg = this.GetBrackets(name,'');
              var def = {
                valign: '',
                width: '',
                height: ''
              };
              if(optarg.indexOf(',') !== -1 || optarg.indexOf('=') !== -1){
                // keyval param
                var opts = optarg.split(',');
                for(var i=0,l=opts.length;i<l;++i){
                  var parts = opts[i].split('=');
                  var key = parts[0].replace(/^ +/,"").replace(/ +$/,"");
                  /* empty values are ok:
                  if(parts.length<2)
                    TEX.Error('Empty value for parameter "'+key+'"');
                  */
                  if(!def.hasOwnProperty(key))
                    TEX.Error(['UnknownKey','Unknown parameter in %1',key]);
                  var val = parts.slice(1).join('=');
                  val = CheckDimen(val);
                  def[key] = val;
                }
              } else {
                def.valign = CheckDimen(optarg);
                def.width = CheckDimen(this.GetBrackets(name,''));
                def.height = CheckDimen(this.GetBrackets(name,''));
              }
              def.src = this.GetArgument(name);
              if (!def.valign) { delete def.valign; }
              if (!def.width)  { delete def.width; }
              if (!def.height) { delete def.height; }
              this.Push(this.mmlToken(MML.mglyph().With(def)));
            }
          });
        });
MathJax.Callback.Queue(
  ["loadComplete",MathJax.Ajax,"[Contrib]/img/unpacked/img.js"]
);
