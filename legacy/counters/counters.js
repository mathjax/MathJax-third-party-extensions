/****************************************************
 *
 *  counters.js
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
MathJax.Callback.Queue(MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var r=MathJax.InputJax.TeX,t=r.Definitions;t.macros.newcounter="NEWCOUNTER_counters",t.macros.setcounter="SETCOUNTER_counters",t.macros.addtocounter="ADDTOCOUNTER_counters",t.macros.arabic="ARABIC_counters",t.macros.value="VALUE_counters",t.macros.alph="ALPH_counters",t.macros.Alph="CAP_ALPH_counters",t.macros.roman="ROMAN_counters",t.macros.Roman="CAP_ROMAN_counters",counterarray=[];var a=[];r.Parse.Augment({NEWCOUNTER_counters:function(t){var e=this.trimSpaces(this.GetArgument(t)),s=this.trimSpaces(this.GetBrackets(t));""===s&&(s=null),"\\"===e.charAt(0)&&(e=e.substr(1)),e.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+t),null==s||s.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name dependency for "+t),counterarray[e]=1,a[e]=[],null!=s&&(null==a[s]?a[s]=[e]:a[s].push(e))},ARABIC_counters:function(t){var a=this.trimSpaces(this.GetArgument(t));a.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+t),MML=MathJax.ElementJax.mml,this.Push(this.mmlToken(MML.mo(""+counterarray[a])))},ALPH_counters:function(t){var a=this.trimSpaces(this.GetArgument(t));a.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+t),MML=MathJax.ElementJax.mml;var e=counterarray[a];for(s="";e>0;)y=(e-1)%26+1,s=String.fromCharCode(96+y)+s,e=Math.floor((e-1)/26);this.Push(this.mmlToken(MML.mo(s)))},CAP_ALPH_counters:function(t){var a=this.trimSpaces(this.GetArgument(t));a.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+t),MML=MathJax.ElementJax.mml;var e=counterarray[a];for(s="";e>0;)y=(e-1)%26+1,s=String.fromCharCode(64+y)+s,e=Math.floor((e-1)/26);this.Push(this.mmlToken(MML.mo(s)))},CAP_ROMAN_counters:function(t){var a=this.trimSpaces(this.GetArgument(t));a.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+t),MML=MathJax.ElementJax.mml;var e=counterarray[a];for(s="";e>=1e3;)s+="M",e-=1e3;for(e>=900&&(s+="CM",e-=900),e>=500&&(s+="D",e-=500),e>=400&&(s+="CD",e-=400);e>=100;)s+="C",e-=100;for(e>=90&&(s+="XC",e-=90),e>=50&&(s+="L",e-=50),e>=40&&(s+="XL",e-=40);e>=10;)s+="X",e-=10;for(e>=9&&(s+="IX",e-=9),e>=5&&(s+="V",e-=5),e>=4&&(s+="IV",e-=4);e>=1;)s+="I",e-=1;this.Push(this.mmlToken(MML.mo(s)))},ROMAN_counters:function(t){var a=this.trimSpaces(this.GetArgument(t));a.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+t),MML=MathJax.ElementJax.mml;var e=counterarray[a];for(s="";e>=1e3;)s+="m",e-=1e3;for(e>=900&&(s+="cm",e-=900),e>=500&&(s+="d",e-=500),e>=400&&(s+="cd",e-=400);e>=100;)s+="c",e-=100;for(e>=90&&(s+="xc",e-=90),e>=50&&(s+="l",e-=50),e>=40&&(s+="xl",e-=40);e>=10;)s+="x",e-=10;for(e>=9&&(s+="ix",e-=9),e>=5&&(s+="v",e-=5),e>=4&&(s+="iv",e-=4);e>=1;)s+="i",e-=1;this.Push(this.mmlToken(MML.mo(s)))},SETCOUNTER_counters:function(t){var a=this.trimSpaces(this.GetArgument(t));a.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+t);var e=this.trimSpaces(this.GetArgument(t)),s=Number.NaN;0===e.indexOf("\\value{")?(e=e.substring(7,e.indexOf("}")),e.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+e),s=counterarray[e]):s=parseInt(e),s===Number.NaN&&r.Error("Illegal number format"),counterarray[a]=s},ADDTOCOUNTER_counters:function(t){var e=this.trimSpaces(this.GetArgument(t)),s=this.trimSpaces(this.GetArgument(t)),o=Number.NaN;if(0===s.indexOf("\\value{")?(s=s.substring(7,s.indexOf("}")),s.match(/^(.|[a-z]+)$/i)||r.Error("Illegal counter name for "+s),o=counterarray[s]):o=parseInt(s),o===Number.NaN&&r.Error("Illegal number format"),counterarray[e]+=o,null!=a&&null!=a[e])for(i=0;i<a[e].length;i++)counterarray[a[e][i]]=1}}),MathJax.Hub.Startup.signal.Post("TeX counters Ready")})),MathJax.Ajax.loadComplete("[Contrib]/counters/counters.js");