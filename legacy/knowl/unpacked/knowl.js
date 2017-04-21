/****************************************************
 *
 *  knowl.js
 *  
 *  Implements \knowl{url}{math} macro for MathJax and actiontype "knowl"
 *  MathML maction elements.  Knowls are described at
 *  
 *    http://www.aimath.org/knowlepedia/
 *  
 *  Be sure to change the loadComplete() address to the URL
 *  of the location of this file on your server. 
 *  
 *  You can load it via the config=file parameter on the script
 *  tag that loads MathJax.js, or by including it in the extensions
 *  array in your configuration.
 *  
 *  Based on an approach developed by Tom Leathrum.  See
 *  
 *    http://groups.google.com/group/mathjax-users/browse_thread/thread/d8a8d081b8e63242
 *  
 *  for details.
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

MathJax.Extension.Knowl = {
  version: "2.0",

  //
  //  Reveal or hide a MathJax knowl
  //
  Show: function (url,id) {
    var oid = "MathJax-knowl-output-"+id,
        uid = "MathJax-kuid-"+id;
    if ($("#"+oid).length) {
      $("#"+uid).slideToggle("fast");
    } else {
      $("#MathJax-knowl-"+id).parents("p").after(
        "<div class='knowl-output' id='"+uid+"'>" +
          "<div class='knowl'>" +
             "<div class='knowl-content' id='"+oid+"'>" +
               "loading '"+url+"'" +
             "</div>" +
             "<div class='knowl-footer'>" + url + "</div>" +
          "</div>" +
        "</div>"
      );
      $("#"+oid).load(url,function () {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,oid]);
      });
      $("#"+uid).slideDown("slow");
    }
  },
  
  Def: function (src) {
    var id = this.GetID();
    return {
      "class": "MathJax_knowl",
      href:    "javascript:MathJax.Extension.Knowl.Show('"+src+"','"+id+"')",
      id:      "MathJax-knowl-"+id,
      // border and padding will only work properly if given explicitly on the element
      style:   "color:blue; border-bottom: 2px dotted #00A; padding-bottom: 2px"
    };
  },

  //
  //  Get a unique ID for the knowl
  //
  id: 0,
  GetID: function () {return this.id++}
};


MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var TEX = MathJax.InputJax.TeX,
      TEXDEF = TEX.Definitions,
      KNOWL = MathJax.Extension.Knowl;

  TEXDEF.macros.knowl = "Knowl";

  TEX.Parse.Augment({
    //
    //  Implements \knowl{url}{math}
    //
    Knowl: function (name) {
      var url = this.GetArgument(name), math = this.ParseArg(name);
      if (math.inferred && math.data.length == 1)
        {math = math.data[0]} else {delete math.inferred}
      this.Push(math.With(KNOWL.Def(url)));
    }
  });

});

MathJax.Hub.Register.StartupHook("MathML Jax Ready",function () {
  var MATHML = MathJax.InputJax.MathML,
      MML = MathJax.ElementJax.mml,
      KNOWL = MathJax.Extension.Knowl;

  //
  //  A postfilter that replaces <maction actiontype="knowl" data-src="...">
  //  with an <mrow> with href to handle the knowl.
  //
  var CHECK = function (node) {
    for (var i = 0, m = node.data.length; i < m; i++) {
      var child = node.data[i];
      if (child && !child.isToken) {
        if (child.type === "maction" && child.actiontype === "knowl") {
          var mrow = MML.mrow().With(KNOWL.Def(child.attr["data-src"]||child.attr.src));
          mrow.Append.apply(mrow,child.data);
          node.SetData(i,mrow); child = mrow;
        }
        CHECK(child);
      }
      if (node.type === "semantics") {m = 0} // only do first child of semantics
    }
  };

  MATHML.postfilterHooks.Add(function (data) {CHECK(data.math.root)});
  
});

MathJax.Callback.Queue(
  MathJax.Hub.Register.StartupHook("onLoad",function () {
    MathJax.Ajax.Styles({
      ".MathJax_knowl:hover": {"background-color": "#DDF"}
    });
  }),
  ["Post",MathJax.Hub.Startup.signal,"TeX knowl ready"]
);

MathJax.Ajax.loadComplete("[Contrib]/knowl/unpacked/knowl.js");


