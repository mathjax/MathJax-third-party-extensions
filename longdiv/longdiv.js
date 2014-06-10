/*************************************************************
 *
 *  MathJax/extensions/TeX/longdiv.js
 *
 *  Implements the \longdiv macro, which implements rendering
 *  of US style long division
 *
 *  Usage:
 *
 *      \longdiv{dividend}{divisor}
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2014 David Carlisle, The MathJax Consortium
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
MathJax.Extension["TeX/longdiv"]={version:"0.1",padtol:function(a,n){for(var t="",r=a;n>r;r++)t+="\\?";return t},SimpleLongDiv:function(a,n){il=a.length,jl=n.length,j=parseInt(n,10),ia=a.substr(0,jl),parseInt(ia,10)<j&&(jl+=1);var t=n.length+1;ans="",work="",work=n+"& \\hspace{-0.5em} \\enclose{longdiv}{"+a+"}",pad="";var e="";rstr=a.substr(0,jl);for(var s=jl;il>=s;s++){r=parseInt(rstr,10),a1=Math.floor(r/j),ans+=a1;var l=j*a1;rstr=r-j*a1+"",work=work+"\\\\\n&"+pad+"\\underline{"+this.padtol((l+"").length,s==jl?jl:t)+l+"}",work=work+"\\\\\n&"+pad+this.padtol(rstr.length,s==jl?jl:t)+rstr+a.substr(s,1),rstr+=a.substr(s,1),pad=(s==jl&&t>jl?"":"\\?")+pad}for(var o="",i=0;jl-1>i;i++)o="\\?"+o;return"\n\\def\\?{\\phantom{0}}\n\\begin{array}{r@{}l}\n&"+o+ans+"\\\\"+e+"\n"+work+"\n\\end{array}\n"}},MathJax.Hub.Register.StartupHook("TeX enclose Ready",function(){var a=MathJax.InputJax.TeX,n=(MathJax.ElementJax.mml,MathJax.Extension["TeX/longdiv"]);n.TEX=a,a.Definitions.Add({macros:{longdiv:"LongDiv"}},null,!0),a.Parse.Augment({LongDiv:function(t){var r=this.GetArgument(t),e=this.GetArgument(t);this.Push(a.Parse(n.SimpleLongDiv(r,e),this.stack.env).mml())}}),MathJax.Hub.Startup.signal.Post("TeX longdiv Ready")}),MathJax.Callback.Queue(["Require",MathJax.Ajax,"[MathJax]/extensions/TeX/enclose.js"],["loadComplete",MathJax.Ajax,"[Contrib]/longdiv/longdiv.js"]););