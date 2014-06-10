/****************************************************
 *
 *  toggles.js
 *  
 *  Implements LaTeX counters and related macros for MathJax.
 * 
 *  Macros implemented:
 *    \newtoggle{name}
 *    \providetoggle{name}
 *    \settoggle{name}{value}
 *    \toggletrue{name}
 *    \togglefalse{name}
 *    \iftoggle{name}{math}{math}
 *    \nottoggle{name}{math}{math}
 *
 *  Be sure to change the loadComplete() address to the URL
 *  of the location of this file on your server. 
 *  
 *  You can load it via the config=file parameter on the script
 *  tag that loads MathJax.js, or by including it in the extensions
 *  array in your configuration.
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
MathJax.Callback.Queue(
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var VERSION = "1.0";

  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  TEXDEF.macros.newtoggle = 'NEWTOGGLE_toggles';
  TEXDEF.macros.providetoggle = 'PROVIDETOGGLE_toggles';
  TEXDEF.macros.settoggle = 'SETTOGGLE_toggles';
  TEXDEF.macros.toggletrue = 'TOGGLETRUE_toggles';
  TEXDEF.macros.togglefalse = 'TOGGLEFALSE_toggles';
  TEXDEF.macros.iftoggle = 'IFTOGGLE_toggles';
  TEXDEF.macros.nottoggle = 'NOTTOGGLE_toggles';
  
  var togglearray = [];

  TEX.Parse.Augment({

    // Note:  the next 4 macros are nearly identical --
    // implementation works out this way because of how Javascript
    // manages associative arrays

    //
    //  Implements \newtoggle{name}
    //
    NEWTOGGLE_toggles: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal toggle name for "+name)}
      togglearray[cn]=true;
    },

    //
    //  Implements \providetoggle{name}
    //
    PROVIDETOGGLE_toggles: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal toggle name for "+name)}
      togglearray[cn]=true;
    },

    //
    //  Implements \toggletrue{name}
    //
    TOGGLETRUE_toggles: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal toggle name for "+name)}
      togglearray[cn]=true;
    },

    //
    //  Implements \togglefalse{name}
    //
    TOGGLEFALSE_toggles: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal toggle name for "+name)}
      togglearray[cn]=false;
    },

    //
    //  Implements \settoggle{name}{value}
    //
    SETTOGGLE_toggles: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name)),
          val = this.trimSpaces(this.GetArgument(name));
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal toggle name for "+name)}
      if (val.toLowerCase() === "true") 
        togglearray[cn]=false;
      else if (val.toLowerCase() === "false") 
        togglearray[cn]=false;
      else 
        TEX.Error("Illegal toggle value for "+name);
    },

    // the next two macros are also nearly identical, but
    // this time for reasons of the underlying logic

    //
    //  Implements \iftoggle{name}{true}{false}
    //
    IFTOGGLE_toggles: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name)); 
      var valtrue, valfalse;
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal toggle name for "+name)}
      if (togglearray[cn]) {
        valtrue = this.ParseArg(name);
        valfalse = this.GetArgument(name);
        this.Push(valtrue);
      }
      else {  
        valtrue = this.GetArgument(name);
        valfalse = this.ParseArg(name);
        this.Push(valfalse);
      }
    },

    //
    //  Implements \nottoggle{name}{true}{false}
    //
    NOTTOGGLE_toggles: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      var valtrue, valfalse;
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal toggle name for "+name)}
      if (togglearray[cn]) {
        valtrue = this.ParseArg(name);
        valfalse = this.GetArgument(name);
        this.Push(valfalse);
      }
      else {  
        valtrue = this.GetArgument(name);
        valfalse = this.ParseArg(name);
        this.Push(valtrue);
      }
    }

  });

  MathJax.Hub.Startup.signal.Post("TeX toggles Ready");
  
}));

MathJax.Ajax.loadComplete("[Contrib]/toggles/unpacked/toggles.js");


