/****************************************************
 *
 *  knowl.js
 *  
 *  Implements \knowl{url}{math} macro for MathJax and actiontype "knowl"
 *  MathML maction elements.  Knowls are described at
 *
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2011-2014 Davide Cervone <https://github.com/dpvc>, 
 *  Tom Leathrum <https://github.com/leathrum/>.
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
MathJax.Extension.Knowl={version:"2.0",Show:function(t,a){var o="MathJax-knowl-output-"+a,n="MathJax-kuid-"+a;$("#"+o).length?$("#"+n).slideToggle("fast"):($("#MathJax-knowl-"+a).parents("p").after("<div class='knowl-output' id='"+n+"'><div class='knowl'><div class='knowl-content' id='"+o+"'>loading '"+t+"'</div><div class='knowl-footer'>"+t+"</div></div></div>"),$("#"+o).load(t,function(){MathJax.Hub.Queue(["Typeset",MathJax.Hub,o])}),$("#"+n).slideDown("slow"))},Def:function(t){var a=this.GetID();return{"class":"MathJax_knowl",href:"javascript:MathJax.Extension.Knowl.Show('"+t+"','"+a+"')",id:"MathJax-knowl-"+a,style:"color:blue; border-bottom: 2px dotted #00A; padding-bottom: 2px"}},id:0,GetID:function(){return this.id++}},MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var t=MathJax.InputJax.TeX,a=t.Definitions,o=MathJax.Extension.Knowl;a.macros.knowl="Knowl",t.Parse.Augment({Knowl:function(t){var a=this.GetArgument(t),n=this.ParseArg(t);n.inferred&&1==n.data.length?n=n.data[0]:delete n.inferred,this.Push(n.With(o.Def(a)))}})}),MathJax.Hub.Register.StartupHook("MathML Jax Ready",function(){var t=MathJax.InputJax.MathML,a=MathJax.ElementJax.mml,o=MathJax.Extension.Knowl,n=function(t){for(var e=0,i=t.data.length;i>e;e++){var r=t.data[e];if(r&&!r.isToken){if("maction"===r.type&&"knowl"===r.actiontype){var l=a.mrow().With(o.Def(r.attr["data-src"]||r.attr.src));l.Append.apply(l,r.data),t.SetData(e,l),r=l}n(r)}"semantics"===t.type&&(i=0)}};t.postfilterHooks.Add(function(t){n(t.math.root)})}),MathJax.Callback.Queue(MathJax.Hub.Register.StartupHook("onLoad",function(){MathJax.Ajax.Styles({".MathJax_knowl:hover":{"background-color":"#DDF"}})}),["Post",MathJax.Hub.Startup.signal,"TeX knowl ready"]),MathJax.Ajax.loadComplete("[Contrib]/knowl/knowl.js");