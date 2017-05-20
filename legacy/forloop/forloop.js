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
MathJax.Ajax.Require("http://cs.jsu.edu/mathjax-ext/github/counters/counters.js"),MathJax.Callback.Queue(MathJax.Hub.Register.StartupHook("TeX counters Ready",function(){var t=MathJax.InputJax.TeX,a=t.Definitions,e=MathJax.ElementJax.mml;a.macros.forloop="FORLOOP",a.macros.ForArray="FORARRAY";var r=[],s=[],i=0;t.Parse.Augment({FORLOOP:function(a){var e=this.trimSpaces(this.GetBrackets(a)),r=parseInt(this.trimSpaces(this.GetArgument(a))),s=parseInt(this.trimSpaces(this.GetArgument(a))),i=this.trimSpaces(this.GetArgument(a)),h=this.trimSpaces(this.GetArgument(a)),m=1;e&&""!==e&&(m=parseInt(e));for(var p=r;s>=p;p+=m)counterarray[i]=p,this.Push(t.Parse(h).mml())},FORARRAY:function(a){var h=this.trimSpaces(this.GetBrackets(a)),m=parseInt(this.trimSpaces(this.GetArgument(a))),p=parseInt(this.trimSpaces(this.GetArgument(a))),n=this.trimSpaces(this.GetArgument(a)),o=this.trimSpaces(this.GetArgument(a)),u=1;r=[],h&&""!==h&&(u=parseInt(h)),i++;for(var c=m;p>=c;c+=u)counterarray[n]=c,r.push(e.mtd.apply(e,[t.Parse(o).mml()]));i--,0==i?(this.Push(e.mtable.apply(e,s)),s=[]):s.push(e.mtr.apply(e,r))}}),MathJax.Hub.Startup.signal.Post("TeX forloop Ready")})),MathJax.Ajax.loadComplete("[Contrib]/forloop/forloop.js");