/*************************************************************
 *
 *  modifymenu.js
 *  
 *  Augments the `MathJax.Menu` object with utility methods for
 * manipulating and modifying the MathJax contextual menu.
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
MathJax.Callback.Queue(MathJax.Hub.Register.StartupHook("MathMenu Ready",function(){MathJax.Menu.Augment({appendItem:function(t){this.items.push(t)},addItemAtIndex:function(t,e){this.items.splice(e,0,t)},addItemFirst:function(t){this.items.splice(0,0,t)},addItemLast:function(t){this.appendItem(t)},addItemAfterIndex:function(t,e){this.items.splice(e+1,0,t)},addItemAfter:function(t,e){this.addItemAfterIndex(t,this.items.indexOf(e))},getItemIndexByName:function(t){for(var e=0;e<this.items.length;e++)if(this.items[e].name==t)return e;return-1},getItemByName:function(t){return this.items[this.getItemIndexByName(t)]},addItemAfterByName:function(t,e){this.addItemAfterIndex(t,this.getItemIndexByName(e))},deleteItemAtIndex:function(t){this.items.splice(t,1)},deleteItem:function(t){this.deleteItemAtIndex(this.items.indexOf(t))},deleteItemByName:function(t){this.deleteItem(this.getItemByName(t))},hideItemAtIndex:function(t){this.items[t].hidden=!0},hideItem:function(t){this.hideItemAtIndex(this.items.indexOf(t))},hideItemByName:function(t){this.hideItem(this.getItemByName(t))},showItemAtIndex:function(t){this.items[t].hidden=!1},showItem:function(t){this.showItemAtIndex(this.items.indexOf(t))},showItemByName:function(t){this.showItem(this.getItemByName(t))},disableItemAtIndex:function(t){this.items[t].disabled=!0},disableItem:function(t){this.disableItemAtIndex(this.items.indexOf(t))},disableItemByName:function(t){this.disableItem(this.getItemByName(t))},enableItemAtIndex:function(t){this.items[t].disabled=!1},enableItem:function(t){this.enableItemAtIndex(this.items.indexOf(t))},enableItemByName:function(t){this.enableItem(this.getItemByName(t))}}),MathJax.Menu.ITEM.CHECKBOX.Augment({check:function(t){this.disabled||(MathJax.Hub.config.MathMenu.settings[this.variable]=t)}}),MathJax.Menu.ITEM.RADIO.Augment({select:function(){this.disabled||(MathJax.Hub.config.MathMenu.settings[this.variable]=this.value)}}),MathJax.Hub.Startup.signal.Post("MathMenu modifymenu Ready")})),MathJax.Ajax.loadComplete("[Contrib]/modifymenu/modifymenu.js");