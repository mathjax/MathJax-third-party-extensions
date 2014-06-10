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
MathJax.Extension["TeX/longdiv"] = {
    version: "0.1",
            padtol: function (s, l) {
            var v = "";
            for (var tmp = s; tmp < l; tmp++) {
                v = v + "\\?";
            }
            return v;
        },

        SimpleLongDiv: function (istr, jstr) {
            il = istr.length;
            jl = jstr.length;

            j = parseInt(jstr, 10);

            ia = istr.substr(0, jl);


            if (parseInt(ia, 10) < j) {
                jl = jl + 1;
            }

            var jpadl = jstr.length + 1;

            ans = "";
            work = "";
            work = jstr + "& \\hspace{-0.5em} \\enclose{longdiv}{" + istr + "}";
            pad = "";


            var ansline = "";
            rstr = istr.substr(0, jl);


            for (var k = jl; k <= il; k++) {
                r = parseInt(rstr, 10);
                a1 = Math.floor(r / j);
                ans = ans + a1;
                var jtimes = j * a1;
                rstr = (r - j * a1) + "";
                work = work + "\\\\\n&" + pad + "\\underline{" + this.padtol((jtimes + "").length, (k == jl ? jl : jpadl)) + jtimes + "}";
                work = work + "\\\\\n&" + pad + this.padtol(rstr.length, (k == jl ? jl : jpadl)) + rstr + istr.substr(k, 1);
                rstr = rstr + istr.substr(k, 1);
                pad = ((k == jl && jl < jpadl) ? "" : "\\?") + pad;
            }

            var anspad = "";
            for (var tmp = 0; tmp < jl - 1; tmp++) {
                anspad = "\\?" + anspad;
            }

            return "\n\\def\\?{\\phantom{0}}\n\\begin{array}{r@{}l}\n&" + anspad + ans + "\\\\" + ansline + "\n" + work + "\n\\end{array}\n";
        }


};

MathJax.Hub.Register.StartupHook("TeX enclose Ready", function () {
    var TEX = MathJax.InputJax.TeX,
        MML = MathJax.ElementJax.mml;
    var LONGDIV = MathJax.Extension["TeX/longdiv"];

    LONGDIV.TEX = TEX; // for reference in longDiv above
    //
    //  Set up control sequenecs
    //
    TEX.Definitions.Add({
        macros: {
            longdiv: 'LongDiv'
        }
    }, null, true);

    TEX.Parse.Augment({
        LongDiv: function (name) {
            var num = this.GetArgument(name),
                den = this.GetArgument(name);
            this.Push(TEX.Parse(LONGDIV.SimpleLongDiv(num, den), this.stack.env).mml());
        }

    });

    MathJax.Hub.Startup.signal.Post("TeX longdiv Ready");

});
MathJax.Callback.Queue(
  ["Require",MathJax.Ajax,"[MathJax]/extensions/TeX/enclose.js"],
  ["loadComplete",MathJax.Ajax,"[Contrib]/longdiv/unpacked/longdiv.js"]
);