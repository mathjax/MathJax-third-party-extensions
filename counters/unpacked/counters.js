/*************************************************************
 *
 *  counters.js
 *  
 *  Implements LaTeX counters and related macros for MathJax.
 * 
 *  Macros implemented:
 *  \newcounter{name}[depend]
 *  \setcounter{name}{number}
 *  \addtocounter{name}{number}
 *  \arabic{name}
 *  \alph{name}
 *  \Alph{name}
 *  \roman{name}
 *  \Roman{name}
 *  \value{name}  -- *only* in number arguments of 
 *                 \setcounter, \addtocounter
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
  TEXDEF.macros.newcounter = 'NEWCOUNTER_counters';
  TEXDEF.macros.setcounter = 'SETCOUNTER_counters';
  TEXDEF.macros.addtocounter = 'ADDTOCOUNTER_counters';
  TEXDEF.macros.arabic = 'ARABIC_counters';
  TEXDEF.macros.value = 'VALUE_counters';
  TEXDEF.macros.alph = 'ALPH_counters';
  TEXDEF.macros.Alph = 'CAP_ALPH_counters';
  TEXDEF.macros.roman = 'ROMAN_counters';
  TEXDEF.macros.Roman = 'CAP_ROMAN_counters';
  
  counterarray = [];
  var dependencyarray = [];

  TEX.Parse.Augment({

    //
    //  Implements \newcounter{name}[depend]
    //
    NEWCOUNTER_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name)),
          d  = this.trimSpaces(this.GetBrackets(name));
      if (d === '') {d = null}
      if (cn.charAt(0) === "\\") {cn = cn.substr(1)}
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+name)}
      if (d != null && !d.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name dependency for "+name)}
      counterarray[cn] = 1;
      dependencyarray[cn]=[];
      if (d != null) {
        if (dependencyarray[d] == null) 
          dependencyarray[d] = [cn];
        else {
          dependencyarray[d].push(cn);
        }
      }
    },

    //
    //  Implements \arabic{name}
    //
    ARABIC_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+name)}
      MML = MathJax.ElementJax.mml;
      this.Push(this.mmlToken(MML.mo(''+counterarray[cn])));
    },

    //
    //  Implements \alph{name}
    //
    ALPH_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+name)}
      MML = MathJax.ElementJax.mml;
      var n = counterarray[cn]; s = "";
      while (n>0) {
        y = ((n-1)%26)+1;
        // if (y==0) y=26;
        s = String.fromCharCode(96+y)+s;
        n = Math.floor((n-1)/26);
      }
      this.Push(this.mmlToken(MML.mo(s)));
    },

    //
    //  Implements \Alph{name}
    //
    CAP_ALPH_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+name)}
      MML = MathJax.ElementJax.mml;
      var n = counterarray[cn]; s = "";
      while (n>0) {
        y = ((n-1)%26)+1;
        // if (y==0) y=26;
        s = String.fromCharCode(64+y)+s;
        n = Math.floor((n-1)/26);
      }
      this.Push(this.mmlToken(MML.mo(s)));
    },

    //
    //  Implements \Roman{name}
    //
    CAP_ROMAN_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+name)}
      MML = MathJax.ElementJax.mml;
      var n = counterarray[cn]; s = "";
      while (n>=1000) { s += "M"; n -= 1000; }
      if (n>=900) { s += "CM"; n -= 900; }
      if (n>=500) { s += "D"; n -= 500; }
      if (n>=400) { s += "CD"; n -= 400; }
      while (n>=100) { s += "C"; n -= 100; }
      if (n>=90) { s += "XC"; n -= 90; }
      if (n>=50) { s += "L"; n -= 50; }
      if (n>=40) { s += "XL"; n -= 40; }
      while (n>=10) { s += "X"; n -= 10; }
      if (n>=9) { s += "IX"; n -= 9; }
      if (n>=5) { s += "V"; n -= 5; }
      if (n>=4) { s += "IV"; n -= 4; }
      while (n>=1) { s += "I"; n -= 1; }
      this.Push(this.mmlToken(MML.mo(s)));
    },

    //
    //  Implements \roman{name}
    //
    ROMAN_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+name)}
      MML = MathJax.ElementJax.mml;
      var n = counterarray[cn]; s = "";
      while (n>=1000) { s += "m"; n -= 1000; }
      if (n>=900) { s += "cm"; n -= 900; }
      if (n>=500) { s += "d"; n -= 500; }
      if (n>=400) { s += "cd"; n -= 400; }
      while (n>=100) { s += "c"; n -= 100; }
      if (n>=90) { s += "xc"; n -= 90; }
      if (n>=50) { s += "l"; n -= 50; }
      if (n>=40) { s += "xl"; n -= 40; }
      while (n>=10) { s += "x"; n -= 10; }
      if (n>=9) { s += "ix"; n -= 9; }
      if (n>=5) { s += "v"; n -= 5; }
      if (n>=4) { s += "iv"; n -= 4; }
      while (n>=1) { s += "i"; n -= 1; }
      this.Push(this.mmlToken(MML.mo(s)));
    },

    //
    //  Implements \setcounter{name}{number}
    //
    SETCOUNTER_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      if (!cn.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+name)}
      var ns = this.trimSpaces(this.GetArgument(name));
      var n = Number.NaN;
      if (ns.indexOf("\\value{")===0) {
        ns = ns.substring(7,ns.indexOf("}"));
        if (!ns.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+ns)}
        n = counterarray[ns];
      } else {
        n = parseInt(ns);
      }
      if (n === Number.NaN) {TEX.Error("Illegal number format")}
      counterarray[cn] = n;
    },

    //
    //  Implements \addtocounter{name}{number}
    //
    ADDTOCOUNTER_counters: function (name) {
      var cn = this.trimSpaces(this.GetArgument(name));
      var ns = this.trimSpaces(this.GetArgument(name));
      var n = Number.NaN;
      if (ns.indexOf("\\value{")===0) {
        ns = ns.substring(7,ns.indexOf("}"));
        if (!ns.match(/^(.|[a-z]+)$/i)) {TEX.Error("Illegal counter name for "+ns)}
        n = counterarray[ns];
      } else {
        n = parseInt(ns);
      }
      if (n === Number.NaN) {TEX.Error("Illegal number format")}
      counterarray[cn] += n;
      if (dependencyarray != null && dependencyarray[cn]!= null)
        for (i=0;i<dependencyarray[cn].length;i++) {  
          counterarray[dependencyarray[cn][i]]=1;
        } // ****
    }

  });

  MathJax.Hub.Startup.signal.Post("TeX counters Ready");
  
}));

MathJax.Ajax.loadComplete("[Contrib]/counters/unpacked/counters.js");

