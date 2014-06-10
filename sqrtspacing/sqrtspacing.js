/*************************************************************
 *
 *  MathJax/extensions/HTML-CSS/sqrtspacing.js
 *
 *  Inserts extra padding after roots when necessary
 *  
 *  To load it, place the file in the [MathJax]/extensions/HTML-CSS/ directory and include
 *  
 *      "HTML-CSS": {
 *        extensions: ["sqrtspacing.js"]
 *      }
 *  
 *  in your configuration.
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2012 - 2013 Evgeny Savel'ev.
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

MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
	var	HTMLCSS = MathJax.OutputJax["HTML-CSS"],
  		MML = MathJax.ElementJax.mml;
  
    MML.msqrt.Augment({
       HTMLhandleSpace: function (span) {
			if (this.useMMLspacing) {
				var mu = this.HTMLgetMu(span);
				var values = this.getValues("scriptlevel","lspace","rspace");
				values.lspace = Math.max(0,HTMLCSS.length2em(.05,mu));
				values.rspace = Math.max(0,HTMLCSS.length2em(.17,mu));
				var core = this, parent = this.parent;
				while (parent && parent.isEmbellished() && parent.Core() === core)
				{core = parent; parent = parent.parent; span = core.HTMLspanElement()}
				if(parent.type === "mrow")
				{
					var i,m = parent.data.length;
					for(i=0;i<m;i++)
					{
						if(core == parent.data[i]) break;
					}
					if(core !== parent.data[m-1])
					{
						if ((parent.data[i+1].type!="mspace")&&
							(parent.data[i+1].type!="mphantom")&&
							(values.rspace)) {span.style.paddingRight = HTMLCSS.Em(values.rspace)}
					}
					if(core !== parent.data[0])
					{
						if ((parent.data[i-1].type!="mspace")&&
							(parent.data[i-1].type!="mphantom")&&
							(values.lspace)) {span.style.paddingLeft =  HTMLCSS.Em(values.lspace)}
					}
				}
			} else {
				var mu = this.HTMLgetMu(span);
				var values = this.getValues("scriptlevel","lspace","rspace");
				values.lspace = Math.max(0,HTMLCSS.length2em(.05,mu));
				values.rspace = Math.max(0,HTMLCSS.length2em(.17,mu));
				var core = this, parent = this.parent;
				while (parent && parent.isEmbellished() && parent.Core() === core)
				{core = parent; parent = parent.parent; span = core.HTMLspanElement()}
				if(parent.type === "mrow")
				{
					var i,m = parent.data.length;
					for(i=0;i<m;i++)
					{
						if(core == parent.data[i]) break;
					}
					if(core !== parent.data[m-1])
					{
						if ((parent.data[i+1].type!="mspace")&&
							(parent.data[i+1].type!="mphantom")&&
							(values.rspace)) {span.style.paddingRight = HTMLCSS.Em(values.rspace)}
					}
					if(core !== parent.data[0])
					{
						if ((parent.data[i-1].type!="mspace")&&
							(parent.data[i-1].type!="mphantom")&&
							(values.lspace)) {span.style.paddingLeft =  HTMLCSS.Em(values.lspace)}
					}
				}
			}
      }
    });
	
    MML.mroot.Augment({
       HTMLhandleSpace: function (span) {
			if (this.useMMLspacing) {
				var mu = this.HTMLgetMu(span);
				var values = this.getValues("scriptlevel","lspace","rspace");
				values.lspace = Math.max(0,HTMLCSS.length2em(.05,mu));
				values.rspace = Math.max(0,HTMLCSS.length2em(.17,mu));
				var core = this, parent = this.parent;
				while (parent && parent.isEmbellished() && parent.Core() === core)
				{core = parent; parent = parent.parent; span = core.HTMLspanElement()}
				if(parent.type === "mrow")
				{
					var i,m = parent.data.length;
					for(i=0;i<m;i++)
					{
						if(core == parent.data[i]) break;
					}
					if(core !== parent.data[m-1])
					{
						if ((parent.data[i+1].type!="mspace")&&
							(parent.data[i+1].type!="mphantom")&&
							(values.rspace)) {span.style.paddingRight = HTMLCSS.Em(values.rspace)}
					}
					if(core !== parent.data[0])
					{
						if ((parent.data[i-1].type!="mspace")&&
							(parent.data[i-1].type!="mphantom")&&
							(values.lspace)) {span.style.paddingLeft =  HTMLCSS.Em(values.lspace)}
					}
				}
			} else {
				var mu = this.HTMLgetMu(span);
				var values = this.getValues("scriptlevel","lspace","rspace");
				values.lspace = Math.max(0,HTMLCSS.length2em(.05,mu));
				values.rspace = Math.max(0,HTMLCSS.length2em(.17,mu));
				var core = this, parent = this.parent;
				while (parent && parent.isEmbellished() && parent.Core() === core)
				{core = parent; parent = parent.parent; span = core.HTMLspanElement()}
				if(parent.type === "mrow")
				{
					var i,m = parent.data.length;
					for(i=0;i<m;i++)
					{
						if(core == parent.data[i]) break;
					}
					if(core !== parent.data[m-1])
					{
						if ((parent.data[i+1].type!="mspace")&&
							(parent.data[i+1].type!="mphantom")&&
							(values.rspace)) {span.style.paddingRight = HTMLCSS.Em(values.rspace)}
					}
					if(core !== parent.data[0])
					{
						if ((parent.data[i-1].type!="mspace")&&
							(parent.data[i-1].type!="mphantom")&&
							(values.lspace)) {span.style.paddingLeft =  HTMLCSS.Em(values.lspace)}
					}
				}
			}
      }
    });

    MathJax.Hub.Startup.signal.Post("HTML-CSS sqrtspacing Ready");
});

MathJax.Ajax.loadComplete("[MathJax]/extensions/HTML-CSS/sqrtspacing.js");