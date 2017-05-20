/*************************************************************
 *
 * forloop
 *
 * Implements simple for-loop iteration for MathJax, with special handling for arrays.
 * 
 * Usage:
 * 
 *     \forloop[step]{start}{stop}{counter}{code}
 *     \ForArray[step]{start}{stop}{counter}{code}
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
MathJax.Ajax.Require("http://cs.jsu.edu/mathjax-ext/github/counters/counters.js");
MathJax.Callback.Queue(
MathJax.Hub.Register.StartupHook("TeX counters Ready",function () {
  var VERSION = "1.0";

  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  var MML = MathJax.ElementJax.mml;
  TEXDEF.macros.forloop = 'FORLOOP';
  TEXDEF.macros.ForArray = 'FORARRAY';
  var row = [], table = [];
  var forarraydepth = 0;

  TEX.Parse.Augment({
   
    //
    //  Implements \forloop[step]{start}{stop}{ctr}{code}
    //
    FORLOOP: function (name) {
      var stepstr = this.trimSpaces(this.GetBrackets(name)),
          start  = parseInt(this.trimSpaces(this.GetArgument(name))),
          stop  = parseInt(this.trimSpaces(this.GetArgument(name))),
          ctrname  = this.trimSpaces(this.GetArgument(name)),
          code  = this.trimSpaces(this.GetArgument(name));
      var step = 1;
  
      // may need to revisit this in MJv2.0 with new GetBrackets()
      // fixed by adding "stepstr &&" below, compatible with v1.1
      if (stepstr && stepstr !== "") step = parseInt(stepstr);
      for (var i = start; 
           i <= stop;
           i += step) {
        counterarray[ctrname] = i;
        this.Push(TEX.Parse(code).mml());        
      };
    }, // end FORLOOP function def

    FORARRAY: function (name) {
      var stepstr = this.trimSpaces(this.GetBrackets(name)),
          start  = parseInt(this.trimSpaces(this.GetArgument(name))),
          stop  = parseInt(this.trimSpaces(this.GetArgument(name))),
          ctrname  = this.trimSpaces(this.GetArgument(name)),
          code  = this.trimSpaces(this.GetArgument(name));
      var step = 1;
      row = []; 
  
      // may need to revisit this in MJv2.0 with new GetBrackets()
      // "stepstr &&" here, too
      if (stepstr && stepstr !== "") step = parseInt(stepstr);
      forarraydepth++;
      for (var i = start; 
           i <= stop;
           i += step) {
        counterarray[ctrname] = i;
        row.push(MML.mtd.apply(MML,[TEX.Parse(code).mml()]));        
      };
      forarraydepth--;
      if (forarraydepth==0) {
        this.Push(MML.mtable.apply(MML,table));
        table=[];
      }
      else  table.push(MML.mtr.apply(MML,row));

    } // end FORARRAY function def

  });  // end TEX.Parse.Augment
  MathJax.Hub.Startup.signal.Post("TeX forloop Ready");
}));  // end StartupHook function def

MathJax.Ajax.loadComplete("[Contrib]/forloop/unpacked/forloop.js");

