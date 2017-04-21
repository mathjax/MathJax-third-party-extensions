/*************************************************************
 *
 *  MathJax/extensions/TeX/siunitx.js
 *
 *  Implements some of the features provided by the siunitx LaTeX package.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2015 Yves Delley, https://github.com/burnpanck
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

MathJax.Extension["TeX/siunitx"] = {
  version: "0.1.0"
};

MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {

  var TEX = MathJax.InputJax.TeX;
  var TEXDEF = TEX.Definitions;
  var STACK = TEX.Stack;
  var STACKITEM = STACK.Item;
  var MML = MathJax.ElementJax.mml;

  var ValidationError = MathJax.Object.Subclass({
    Init: function(obj,name,validator,val){
      this._errormsg = 'ValidationError: Error validating "'+name+'" of "'+obj.constructor+'" (a "'+validator+'") to "'+val+'": '
      for(var idx=4;idx<arguments.length;++idx)
        this._errormsg += arguments[idx].toString();
      console.log(this._errormsg);
    },
    toString: function(){
      return this._errormsg;
    }
  });

  var ValidationBase = MathJax.Object.Subclass({
    PropertyDescriptor: function(cls,propname){
      var descriptor = this;
      return {
        get: function(){ return descriptor.Get(this,propname); },
        set: function(val){ descriptor.Set(this,propname,val); }
      };
    },
    Get: function(obj,propname){
      var ret = obj._values[propname];
      if(ret !== undefined)
        return ret;
      return this._default;
    },
    Set: function(obj,propname,val){
      obj._values[propname] = this.Validate(obj,propname,val);
    },
    Validate: function(obj,propname,val){
      return val;
    }
  });

  var Choice = ValidationBase.Subclass({
    Init: function(){
      this._default = arguments[0];
      var choices = {};
      for(var idx=0;idx<arguments.length;idx++)
        choices[arguments[idx]] = true;
      this._choices = choices;
    },
    Validate: function(obj,name,val){
      if(!this._choices.hasOwnProperty(val))
        throw ValidationError(
          obj,name,this,val,
          'must be one of ["'
          +Object.getOwnPropertyNames(this._choices).join('", "')
          +'"]'
        );
      return val;
    }
  });
  var Integer = ValidationBase.Subclass({
    Init: function(def){
      if(def === undefined) def = 0;
      this._default = def;
    },
    Validate: function(obj,name,val){
      val = parseInt(val)
      if(!Number.isInteger(val))
        throw ValidationError(obj,name,this,val,"must be an integer");
      return val;
    }
  });
  var Literal = ValidationBase.Subclass({
    Init: function(def){this._default = def;},
    Validate: function(obj,name,val){
      return val;
    }
  });
  // This-literal is interpreted as text-mode TeX and the corresponding mml is stored
  var TeXParsedLiteral = Literal.Subclass({
    Init: function(def){this._default = def;},
    Get: function(obj,name){
      // TODO: find out how to clone Jax-MML, such that we can store the parsed MML instead
      val = arguments.callee.SUPER.Get.call(this,obj,name);
      return TEX.Parse('\\text{'+val+'}').mml();
    }
  });
  var Math = Literal.Subclass({
  });
  var Length = ValidationBase.Subclass({
    Init: function(def){this._default = def;},
    Validate: function(obj,name,val){
      return val; // TODO: proper validation
    }
  });
  var Macro = ValidationBase.Subclass({
    Init: function(def){this._default = def;},
    Validate: function(obj,name,val){
      return val; // TODO: proper validation
    }
  });
  var Switch = ValidationBase.Subclass({
    Init: function(def){
      if(def === undefined)
        def = false;
      this._default = def;
    },
    Validate: function(obj,name,val){
      if(val === undefined) val=true;
      if (typeof val == 'string' || val instanceof String){
        val = val.toLowerCase();
        if(val=='true')
            val = true;
        else if(val=='false')
            val = false;
      }
      if(val !== true && val !== false)
        throw ValidationError(obj,name,this,val,"must be a boolean");
      return val;
    }
  });

  var ConfigData = MathJax.Object.Subclass({
    Init: function(values){
      this._values = {}
      if(values != undefined)
        this.SetMany(values);
    },
    Set: function(prop,value){
      if(this._options[prop] === undefined){
        throw ValidationError(this,prop,undefined,value,"does not exist");
      } else {
        this[prop] = value;
      }
    },
    SetMany: function(values){
      for(var prop in values)
        this.Set(prop,values[prop]);
    },
    Derived: function(values){
      var ret = this.constructor();
      ret._values.__proto__ = this._values.__proto__;
      if(values != undefined){
        ret.SetMany(values);
      }
      return ret;
    },
    listSettings: function(skip_initial,sep){
      if(sep===undefined)
        sep=',\n'
      var ret = []
      for(var prop in this._options){
        if(skip_initial && !this._values.hasOwnProperty(prop))
          continue;
        ret.push(prop + ' = ' + this[prop]);
      }
      return ret.join(sep);
    }
  },{
    Define: function(definition){
      var ret = this.Subclass({_options:definition});
      for(var prop in definition){
        Object.defineProperty(ret.prototype,prop,definition[prop].PropertyDescriptor(ret,prop));
      }
      return ret;
    }
  });

  var SIunitxOptions = ConfigData.Define({
    // Font detection
//    'detect-all': Meta({'detect-weight':true,'detect-family':true,'detect-shape':true,'detect-mode':true}),
    'detect-display-math': Switch(),
    'detect-family': Switch(),
    'detect-inline-family': Choice('text','math'),
    'detect-inline-weight': Choice('text','math'),
    'detect-mode': Switch(),
//    'detect-none': Meta({'detect-weight':false,'detect-family':false,'detect-shape':false,'detect-mode':false}),
    'detect-shape': Switch(),
    'detect-weight': Switch(),

    // Font options
    'color': Literal(''),
    'math-rm': Macro('\\mathrm'),
    'math-sf': Macro('\\mathsf'),
    'math-tt': Macro('\\mathtt'),
    'mode': Choice('math','text'),
    'text-rm': Macro('\\rmfamily'),
    'text-sf': Macro('\\sffamily'),
    'text-tt': Macro('\\ttfamily'),

    'unit-color': Literal(''),
    'unit-math-rm': Macro('\\mathrm'),
    'unit-math-sf': Macro('\\mathsf'),
    'unit-math-tt': Macro('\\mathtt'),
    'unit-mode': Choice('math','text'),
    'unit-text-rm': Macro('\\rmfamily'),
    'unit-text-sf': Macro('\\sffamily'),
    'unit-text-tt': Macro('\\ttfamily'),

    'number-color': Literal(''),
    'number-math-rm': Macro('\\mathrm'),
    'number-math-sf': Macro('\\mathsf'),
    'number-math-tt': Macro('\\mathtt'),
    'number-mode': Choice('math','text'),
    'number-text-rm': Macro('\\rmfamily'),
    'number-text-sf': Macro('\\sffamily'),
    'number-text-tt': Macro('\\ttfamily'),


    // Number parsing
    'input-close-uncertainty': Literal(')'),
    'input-comparators': Literal('<=>\\approx\\ge\\geq\\gg\\le\\leq\\ll\\sim'),
    'input-complex-roots': Literal('ij'),
    'input-decimal-markers': Literal(',.'),
    'input-digits': Literal('0123456789'),
    'input-exponent-markers': Literal('dDeE'),
    'input-ignore': Literal(''),
    'input-open-uncertainty': Literal('('),
    'input-protect-tokens': Literal('\\approx\\dots\\ge\\geq\\gg\\le\\leq\\ll\\mp\\pi\\pm\\sim'),
    'input-signs': Literal('+-\\pm\\mp'),
    'input-uncertainty-signs': Literal('\\pm'),
    'input-symbols': Literal('\\pi\\dots'),
    'parse-numbers': Switch(true),

    // Number post-processing options
    'add-decimal-zero': Switch(true),
    'add-integer-zero': Switch(true),
    'explicit-sign': Literal(''),
    'fixed-exponent': Integer(),
    'minimum-integer-digits': Integer(),
    'omit-uncertainty': Switch(),
    'retain-explicit-plus': Switch(),
    'retain-unit-mantissa': Switch(true),
    'retain-zero-exponent': Switch(),
    'round-half': Choice('up','even'),
    'round-integer-to-decimal': Switch(),
    'round-minimum': Literal('0'),  // Should be a Real! (does not exist in LaTeX's siunitx)
    'round-mode': Choice('off','figures','places'),
    'round-precision': Integer(2),
    'scientific-notation': Switch(),
    'zero-decimal-to-integer': Switch(),

    // Number output
    'bracket-negative-numbers': Switch(),
    'bracket-numbers': Switch(true),
    'close-bracket': Literal(')'),
    'complex-root-position': Choice('after-number','before-number'), // done
    'copy-complex-root': Switch(false),
    'copy-decimal-marker': Switch(false),
    'exponent-base': Literal('10'),				// done
    'exponent-product': Math('\\times'),		// done
    'group-digits': Choice('true','false','decimal','integer'),  // done
    'group-minimum-digits': Integer(5),         // done
    'group-separator': Literal('\\,'),          // done
    'negative-color': Literal(''),
    'open-bracket': Literal('('),
    'output-close-uncertainty': Literal(')'),
    'output-complex-root': Literal('\\mathrm{i}'),	// done
    'output-decimal-marker': Literal('.'),
    'output-exponent-marker': Literal(''),
    'output-open-uncertainty': Literal('('),
    'separate-uncertainty': Switch(false),
    'tight-spacing': Switch(false),
    'uncertainty-separator': Literal(''),

    // Multi-part number options
    'fraction-function': Macro('\\frac'),
    'input-product': Literal('x'),              // done
    'input-quotient': Literal('/'),             // done
    'output-product': Math('\\times'),          // done
    'output-quotient': Literal('/'),            // done
    'quotient-mode': Choice('symbol','fraction'),

    // lists and ranges of numbers
    'list-final-separator': Literal(' and '),   // done
    'list-pair-separator': Literal(' and '),    // done
    'list-separator': Literal(', '),            // done
    'range-phrase': TeXParsedLiteral(' to '),   // done

      // angle options
    'add-arc-degree-zero': Switch(false),
    'add-arc-minute-zero': Switch(false),
    'add-arc-second-zero': Switch(false),
    'angle-symbol-over-decimal': Switch(false),
    'arc-separator': Literal(false),
    'number-angle-product': Literal(''),

      // unit creation
    'free-standing-units': Switch(false),
    'overwrite-functions': Switch(false),
    'space-before-unit': Switch(false),
    'unit-optional-argument': Switch(false),
    'use-xspace': Switch(false),

      // additional units
      'abbreviations': Switch(true),
      'binary-units': Switch(),

      // Unit output options
    'bracket-unit-denominator': Switch(true),
    'forbid-literal-units': Switch(false),
    'literal-superscript-as-power': Switch(true),
    'inter-unit-product': Literal('\\,'),
    'parse-units': Switch(true),
	// per-mode: partially done: reciprocal, symbol, fraction
    'per-mode': Choice('reciprocal','reciprocal-positive-first','symbol','repeated-symbol','fraction','symbol-or-fraction'),
    'per-symbol': Literal('/'),	 // done
    'power-font': Choice('number','unit'),
    'prefixes-as-symbols': Switch(true),
    'qualifier-mode': Choice('subscript','brackets','phrase','space','text'),
    'sticky-per': Switch(false),

    // numbers with units
    'allow-number-unit-breaks': Switch(false),
    'exponent-to-prefix': Switch(false),
    'list-units': Choice('repeat','brackets','single'),
    'multi-part-units': Choice('brackets','repeat','single'),
    'number-unit-product': Literal('\\,'),
    'product-units': Choice('repeat','brackets','brackets-power','power','single'),
    'range-units': Choice('repeat','brackets','single')

      // Tabular material (unlikely will ever be implemented) => not declared

      // symbol options
 /*   'math-angstrom': Literal('\text{\AA}'),
    'math-arcminute': Literal('{}^{\prime}'),
    'math-arcsecond': Literal('{}^{\prime\prime}'),
    'math-celsius': Literal('{}^{\circ})\kern -\scriptspace \mathrm{C}'),
    'math-degree': Literal('{}^{\circ}'),
    'math-micro': Literal(''),
    'math-ohm': Literal('\\Omega'),
    'redefine-symbols': Switch(true),
    'text-angstrom': Literal('\\AA'),
    'text-arcminute': Literal('\ensuremath{{}^{\prime}}'),
    'text-arcsecond': Literal('\ensuremath{{}^{\prime\prime}}'),
    'text-celsius': Literal('\ensuremath{{}^{\circ}\kern -\scriptspace \text{C}}'),
    'text-degree': Literal('\ensuremath{{}^{\circ}}'),
    'text-micro': Literal(''),
    'text-ohm': Literal('\ensuremath{\Omega}')
                                         */
  });

  var UNITSMACROS = {
    // special units
    percent: {name:'percent',symbol:'%',category:'non-unit'},

    // powers
    per: ['Per',-1],
    square: ['PowerPfx',2],
    cubic: ['PowerPfx',3],
    raiseto: ['PowerPfx',undefined],
    squared: ['PowerSfx',2],
    cubed: ['PowerSfx',3],
    tothe: ['PowerSfx',undefined],

    // aliases
    meter: ['Macro','\\metre'],
    deka: ['Macro','\\deca'],

    // abbreviations
    celsius: ['Macro','\\degreeCelsius'],
    kg: ['Macro','\\kilogram'],
    amu: ['Macro','\\atomicmassunit'],
    kWh: ['Macro','\\kilo\\watt\\hour'],

    // not yet supported:
    of: 'Of',
    cancel: 'Unsupported',
    highlight: 'Highlight'
  };

  // ******* SI prefixes *******************

  var SIPrefixes = (function (def){
    var ret = {};
    for(var pfx in def){
      var data = def[pfx];
      ret[pfx] = {
		name: pfx,
		power: data[0],
		abbrev: data[1],
        pfx: data.length>=3 ? data[2] : data[1]
	  };
    };
    return ret;
  })({
    yocto: [-24,'y'],
	zepto: [-21,'z'],
    atto:  [-18,'a'],
    femto: [-15,'f'],
    pico:  [-12,'p'],
    nano:  [ -9,'n'],
    micro: [ -6,'u', MML.entity("#x03bc")],
    milli: [ -3,'m'],
    centi: [ -2,'c'],
    deci:  [ -1,'d'],

    deca:  [  1,'da'],
    hecto: [  2,'h'],
    kilo:  [  3,'k'],
    mega:  [  6,'M'],
    giga:  [  9,'G'],
    tera:  [ 12,'T'],
    peta:  [ 15,'P'],
    exa:   [ 18,'E'],
    zetta: [ 21,'Z'],
    yotta: [ 24,'Y']
  });
  MathJax.Extension["TeX/siunitx"].SIPrefixes = SIPrefixes;

  for(var pfx in SIPrefixes){
    pfx = SIPrefixes[pfx];
    UNITSMACROS[pfx.name] = ['SIPrefix',pfx];
  }

  // ******* SI units *******************

  function _BuildUnits(category,defs){
    var units = [];
    for(var unit in defs){
      var def = defs[unit];
      units.push({
          name: unit,
          category: category,
          symbol: def[0],
          abbrev: def[1]
      });
    }
    return units;
  }

  var SIUnits = (function (arr){
    ret = {};
    arr.forEach(function (unit){
      ret[unit.name] = unit;
    });
    return ret;
  })([].concat(_BuildUnits('SI base',{
    ampere:   ['A','A'],
    candela:  ['cd'],
    kelvin:   ['K','K'],
    kilogram: ['kg'],
    gram:     ['g','g'],
    metre:    ['m','m'],
    mole:     ['mol','mol'],
    second:   ['s','s']
  }),_BuildUnits('coherent derived',{
    becquerel: ['Bq'],
    degreeCelsius: [MML.entity("#x2103")],
    coulomb: ['C'],
    farad: ['F','F'],
    gray: ['Gy'],
    hertz: ['Hz','Hz'],
    henry: ['H'],
    joule: ['J','J'],
    katal: ['kat'],
    lumen: ['lm'],
    lux: ['lx'],
    newton: ['N','N'],
    ohm: [MML.entity("#x03a9"),'ohm'],
    pascal: ['Pa','Pa'],
    radian: ['rad'],
    siemens: ['S'],
    sievert: ['Sv'],
    steradian: ['sr'],
    tesla: ['T'],
    volt: ['V','V'],
    watt: ['W','W'],
    weber: ['Wb'],
  }),_BuildUnits('accepted non-SI',{
    day: ['d'],
    degree: [MML.entity("#x00b0")],
    hectare: ['ha'],
    hour: ['h'],
    litre: ['l','l'],
    liter: ['L','L'],
    arcminute: [MML.entity("#x2032")], // plane angle;
    minute: ['min'],
    arcsecond: [MML.entity("#x2033")], // plane angle;
    tonne: ['t'],
  }),_BuildUnits('experimental non-SI',{
    astronomicalunit: ['ua'],
    atomicmassunit: ['u'],
    bohr: [MML.msub(MML.mi(MML.chars('a')).With({mathvariant: MML.VARIANT.NORMAL}),MML.mn(0))], // TODO: fix this
    clight: ['c0'],  // TODO: proper subscript
    dalton: ['Da'],
    electronmass: ['me'], // TODO: proper subscript
    electronvolt: ['eV','eV'],
    elementarycharge: ['e'],
    hartree: ['Eh'], // TODO: proper subscript
    planckbar: [MML.entity("#x0127")],
  }),_BuildUnits('other non-SI',{
    angstrom: [MML.entity("#x212b")],
    bar: ['bar'],
    barn: ['b'],
    bel: ['B'],
    decibel: ['dB','dB'],
    knot: ['kn'],
    mmHg: ['mmHg'],
    nauticmile: [';'],
    neper: ['Np'],
  })));
  MathJax.Extension["TeX/siunitx"].SIUnits = SIUnits;

  for(var unit in SIUnits){
    unit = SIUnits[unit];
    UNITSMACROS[unit.name] = ['SIUnit',unit];
  }

  // ******* unit abbreviations *******************

  /*
   * I'm too lazy to write all of the abbreviations by hand now, so here it is
   * programmatically.
   */
  var AbbrevPfx = {};
  for(var pfx in SIPrefixes){
    pfx = SIPrefixes[pfx];
    if(pfx.abbrev){
      AbbrevPfx[pfx.abbrev] = pfx.name;
    }
  }
  var AbbrevUnits = {};
  for(var unit in SIUnits){
    unit = SIUnits[unit];
    if(unit.abbrev){
      AbbrevUnits[unit.abbrev] = unit.name;
    }
  }

  function _ParseAbbrev(abbrev) {
    var unit = AbbrevUnits[abbrev];
    var repl = '';
    if( unit === undefined ){
      unit = AbbrevUnits[abbrev.slice(1)];
      if( unit === undefined ){
        // should never happen!
        console.log('cannot parse abbreviation',abbrev);
        return
      }
      repl = AbbrevPfx[abbrev[0]];
      if( repl === undefined ){
        // should never happen!
        console.log('cannot parse prefix ',abbrev[0],' on unit ',unit,' (',abbrev,')');
        return
      }
      repl = '\\' + repl
    }
    repl += '\\' + unit
    return repl;
  }

  // install a number of abbrevs as macros, the same as siunitx does.
  [
    "fg pg ng ug mg g",
    "pm nm um mm cm dm m km",
    "as fs ps ns us ms s",
    "fmol pmol nmol umol mmol mol kmol",
    "pA nA uA mA A kA",
    "ul ml l hl uL mL L hL",
    "mHz Hz kHz MHz GHz THz",
    "mN N kN MN",
    "Pa kPa MPa GPa",
    "mohm kohm Mohm",
    "pV nV uV mV V kV",
    "uW mW W kW MW GW",
    "J kJ",
    "meV eV keV MeV GeV TeV",
    "fF pF F",
    "K",
    "dB"
  ].forEach(function(abbrset){abbrset.split(' ').forEach(function (abbrev){
      UNITSMACROS[abbrev] = ['Macro',_ParseAbbrev(abbrev)];
  })});

  /*
   * This is the TeX parser for unit fields
   */
  var SIUnitParser = TEX.Parse.Subclass({
    Init: function (string,options,env) {
      this.cur_prefix = undefined;
      this.cur_pfxpow = undefined;
      this.per_active = false;
	  this.has_literal = false; // Set to true if non-siunitx LaTeX is encountered in input
      this.literal_chars = ''; // building unit char by char
	  this.units = [];
      this.options = options;
      arguments.callee.SUPER.Init.call(this,string,env);
/*	  if(this.has_literal){
		console.log('Unit "',string,'" was parsed literally ',this.units);
	  } else {
		console.log('Unit "',string,'" was parsed as these units: ',this.units);
	  }*/
    },

    mml: function () {
      if(!this.has_literal){
        // no literal, all information in this.units
        // => generate fresh MML here
        var stack = TEX.Stack({},true);
		var permode = this.options['per-mode'];
		var mythis = this;
		var all = [];
		var norm = [];
		var recip = [];
		this.units.forEach(function(unit){
			var power = unit.power === undefined ? 1 : unit.power;
			if(unit.inverse) power = -power;
			if(power > 0) {
				norm.push(unit);
			} else {
				recip.push(unit);
			}
			all.push(unit);
		});

		if(permode==='reciprocal' || !recip.length){
			all.forEach(function(u){
				stack.Push(mythis.UnitMML(u));
			});
		} else if(permode==='symbol'){
			norm.forEach(function(u){
				stack.Push(mythis.UnitMML(u));
			});
			stack.Push(this.mmlToken(MML.mo(MML.chars(this.options['per-symbol']).With({fence: false, stretchy: false}))));
			if(recip.length===1){
				var u = recip[0];
				u.inverse = false;
				stack.Push(this.UnitMML(u));
			} else {
				stack.Push(this.mmlToken(MML.mo(MML.chars('(').With({fence: false, stretchy: false}))));
				recip.forEach(function(u){
					u.inverse = false;
					stack.Push(mythis.UnitMML(u));
				});
				stack.Push(this.mmlToken(MML.mo(MML.chars(')').With({fence: false, stretchy: false}))));
			}
		} else if(permode==='fraction'){
			var num = TEX.Stack({},true);
			var den = TEX.Stack({},true);
			norm.forEach(function(u){
				num.Push(mythis.UnitMML(u));
			});
			recip.forEach(function(u){
				u.inverse = false;
				den.Push(mythis.UnitMML(u));
			});
			num.Push(STACKITEM.stop());
			den.Push(STACKITEM.stop());
			stack.Push(MML.mfrac(num.Top().data[0],den.Top().data[0]));
		} else {
			TEX.Error("Unimplemented per-mode "+permode);
		}
        stack.Push(STACKITEM.stop());
        if (stack.Top().type !== "mml") {return null}
        return stack.Top().data[0];
      }
      if (this.stack.Top().type !== "mml") {return null}
      return this.stack.Top().data[0];
    },

	// This is used to identify non-siunitx LaTeX in the input
    Push: function () {
        this.finishLiteralUnit(); // in case we're still caching some chars
        for(var idx=0;idx<arguments.length;idx++){
            var arg = arguments[idx];
            if(!(arg instanceof STACKITEM.stop)){
//                console.log('litera linput ',arg);
                this.has_literal=true;
            }
            this.stack.Push.call(this.stack,arg);
        }
    },
	// While literal fall-back output from proper unit macros use this path
	PushUnitFallBack: function() {this.stack.Push.apply(this.stack,arguments);},

    csFindMacro: function (name) {
      this.finishLiteralUnit();      // any macro should finish previous units

      var macro = UNITSMACROS[name];
      if( macro ) return macro;

      return arguments.callee.SUPER.csFindMacro.call(this,name);
    },
    /*
     *  Handle a single letter
     */
    Variable: function (c) {
      this.literal_chars += c;
    },

      // the dot ('.') is considered a number!
    Number: function(c) {
        if(c=='.')
            return this.finishLiteralUnit();
        arguments.callee.SUPER.Number.call(this,c);
    },

    // here, it's a unit separator
    Tilde: function(c) {
        this.finishLiteralUnit();
    },

    /*
     *  Handle ^, _, and '
     */
    Superscript: function (c) {
      this.finishLiteralUnit();
      arguments.callee.SUPER.Superscript.call(this,c);
    },
    Subscript: function (c) {
      this.finishLiteralUnit();
      arguments.callee.SUPER.Subscript.call(this,c);
    },

	Unsupported: function() {}, // ignore this macro

	Of: function(name) {
	  var what = this.GetArgument(name);
      if(this.has_literal){
        // unit is already gone, best we can do is add a superscript
        TEX.Error(["SIunitx","NotImplementedYet"]);
      }
      if(!this.units.length){
        TEX.Error(["SIunitx","Qualification suffix with no unit"]);
      }
      var unit = this.units[this.units.length-1];
      if(unit.power !== undefined){
        TEX.Error(["SIunitx","double qualification",unit.qual,what]);
      }
      unit.qual = what;
    },

	Highlight: function(name) {
	  var color = this.GetArgument(name);
	  this.cur_highlight = color;
	},

    Per: function(name){
      if(this.per_active){
        TEX.Error(["SIunitx","double \\per"]);
        return;
      }
      this.per_active = true;
    },

    PowerPfx: function(name, pow) {
      if(pow === undefined){
        pow = this.GetArgument(name);
      }
      if(this.cur_pfxpow){
        TEX.Error(["SIunitx","double power prefix",this.cur_pfxpow,pow]);
      }
      this.cur_pfxpow = pow;
    },

    PowerSfx: function(name, pow) {
      if(pow === undefined){
        pow = this.GetArgument(name);
      }
      if(this.has_literal){
        // unit is already gone, best we can do is add a superscript
        TEX.Error(["SIunitx","NotImplementedYet"]);
      }
      if(!this.units.length){
        TEX.Error(["SIunitx","Power suffix with no unit"]);
      }
      var unit = this.units[this.units.length-1];
      if(unit.power !== undefined){
        TEX.Error(["SIunitx","double power",unit.power,pow]);
      }
      unit.power = pow;
    },

    SIPrefix: function (name, pfx) {
      if(this.cur_prefix){
        TEX.Error(["SIunitx","double SI prefix",this.cur_prefix,pfx]);
      }
      this.cur_prefix = pfx;
    },

    UnitMML: function(unit) {
      var parts = [];
      if(unit.prefix)
        parts = parts.concat(unit.prefix.pfx);
      parts = parts.concat(unit.unit.symbol);
      var curstring = '';
      var content = [];
      parts.forEach(function (p){
        if(typeof p == 'string' || p instanceof String){
          curstring += p;
        } else {
          if(curstring){
            content.push(MML.chars(curstring));
            curstring = '';
          }
          content.push(p);
        }
      });
      if(curstring)
        content.push(MML.chars(curstring));
      var def = {mathvariant: MML.VARIANT.NORMAL};
      var mml = MML.mi.apply(MML.mi,content).With(def);
      var power = unit.power === undefined ? 1 : unit.power;
      if(unit.inverse) power = -power;
      if(power != 1){
          if(unit.qual === undefined)
            mml = MML.msup(mml,MML.mn(power));
          else
            mml = MML.msubsup(mml,MML.mtext(unit.qual),MML.mn(power));
      } else if(unit.qual !== undefined){
        mml = MML.msub(mml,MML.mtext(unit.qual));
      }
      return this.mmlToken(mml);
    },

    SIUnit: function (name, unit) {
	  this.pushUnit(unit);
    },

    finishLiteralUnit: function() {
        if(!this.literal_chars)
            return;
        this.pushUnit({
            symbol: this.literal_chars,
            name: undefined,
            category: 'literal',
            abbrev: this.literal_chars
        });
        this.literal_chars = '';
    },

    pushUnit: function(unit) {
	  // Add to units
	  this.units.push({
		unit: unit,
		prefix: this.cur_prefix,
        power: this.cur_pfxpow,
        inverse: this.per_active,
        qual: undefined   // qualification
	  });

	  // And process fall-back
      var parts = [];
      if(this.cur_prefix)
        parts = parts.concat(this.cur_prefix.pfx);
      parts = parts.concat(unit.symbol);
      var curstring = '';
      var content = [];
      parts.forEach(function (p){
        if(typeof p == 'string' || p instanceof String){
          curstring += p;
        } else {
          if(curstring){
            content.push(MML.chars(curstring));
            curstring = '';
          }
          content.push(p);
        }
      });
      if(curstring)
        content.push(MML.chars(curstring));
      var def = {mathvariant: MML.VARIANT.NORMAL};
      this.PushUnitFallBack(this.mmlToken(MML.mi.apply(MML.mi,content).With(def)));

      this.cur_prefix = undefined;
      this.cur_pfxpow = undefined;
      if(!this.options['sticky-per'])
          this.per_active = false;
    }
  });
  MathJax.Extension["TeX/siunitx"].SIUnitParser = SIUnitParser;

  /*
   * The options parser
   */
  function _nextBrace(str,start){
      var open = str.indexOf("{",start);
      var close = str.indexOf("}",start);
      if(close >= 0 && (close<open || open==-1))
          return close;
      return open;
  };

  function ParseOptions(str){
      var ret = {};
      str = str.trim();
      if(!str)
          return ret;
      var opts = str.split(',');
      for(var i=0,l=opts.length;i<l;++i){
          var parts = opts[i].split('=');
          var key = parts[0].trim();
          if(!key)
              TEX.Error('Empty key in "'+str+'"');
          if(parts.length<2){
              ret[key] = undefined;
              continue;
          }
          var val = parts.slice(1).join('=');

          var count = 0;
          var pos = -1;
          while(true){
              while ( true ) {
                pos = _nextBrace(val,pos+1);
                if(pos<0)
                  break;
                if(pos>0 && val[pos-1]=='\\'){
                  continue;
                }
                if(val[pos] == '}'){
                  count--;
                  if(count<0)
                    TEX.Error('Too many closing braces in "'+str+'"');
                } else {
                  count++;
                }
              }
              if(!count)
                break;
              pos = val.length;
              i++;
              if(i>=l)
                  TEX.Error('Not enough closing braces in "'+str+'"');
              val += ',' + opts[i];
          }
          val = val.trim();
          if(val[0] =='{' && val[val.length-1]=='}')
              val = val.slice(1,-1);
          ret[key] = val;
      }
      return ret;
  };

  /*
   *  The number parsers
   */
  var SINumberParser = MathJax.Object.Subclass({
    Init: function (string,options,env) {
      this.string = string; this.i = 0;
	  if(options === undefined)
		options = SIunitxOptions();
	  else if(!(options instanceof SIunitxOptions)){
		throw "SINumberParser expects an options object";
	  }
	  this.options = options;

	  this.regex = this.GenerateRegex(options);

      this.Parse();
	},
	GenerateRegex: function(options){
      function reescape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      };
	  var decimal_sep = '(?:\\.|,)';
	  var sign = '(\\+|-|\\\\pm|\\\\mp|\\\\le|\\\\leq|\\\\ll|\\\\ge|\\\\geq|\\\\gg|\\\\sim)';
	  var digit = '[0-9]';
	  var complex_root = '(?:i|j)';
	  var exponent = '(?:[eEdD](-?\\d+))';
	  var product = reescape(this.options['input-product']);
      var quotient = reescape(this.options['input-quotient']);

	  var decimal_number = '('+digit+'*)(?:'+decimal_sep+'('+digit+'*))?'; // 2 grps
	  var imaginary_number = '(?:'+decimal_number+complex_root+'|'+complex_root+decimal_number+')'; // 2 + 2 = 4 grps
	  var complex_number = sign+'?'+decimal_number+'(?:'+sign+imaginary_number+')?'; // 1 + 2 + 1 + 4 = 8 grps
	  var full_number = complex_number + exponent+'?'; // 8+1= 9 grps
      var multipart = '('+product+'|'+quotient+')'; // 1 grp
      var multi_part_number = full_number + '(?:'+multipart+'('+full_number+'(?:'+multipart+full_number+')*))?'; // 9+1+1+9+1+9 = 30 grps

//	  console.log(full_number);

	  var ret = new RegExp('^'+multi_part_number+'$');
	  return ret
    },
    Parse: function () {
	  var str = this.string.replace(/\s+/gi,'');
	  var replacements = {
		'+-':'\\pm',
		'-+':'\\mp',
		'<=':'\\leq',
		'>=':'\\geq',
		'<<':'\\ll',
		'>>':'\\gg',
	  };
	  for(key in replacements){
		str = str.replace(key,replacements[key]);
	  }
      this.parsed = this._parse_multi_part_number(str);
    },
    _parse_multi_part_number: function(str){
	  var m = this.regex.exec(str);
	  if(!m){
		return str;
	  }
      var ret = this._parse_full_number(m);
      while(m[10]){
          // an additional part is available:
          var bracket = false;
          if(m[10] == this.options['input-quotient']){
              ret += this.options['output-quotient'];
              bracket = true;
          } else {
              ret += this.options['output-product'];
          }
          m = this.regex.exec(m[11]);
          ret += this._parse_full_number(m,bracket);
      }
	  return ret;
    },
    _parse_full_number: function(m,bracket_exponent){
      var opts =  this.options;
	  function PSign(sign){return sign;}
      function PNumber(integer,decimal){
          var gd = opts['group-digits'];
          var md = opts['group-minimum-digits'];
          var gs = opts['group-separator'];

          integer = integer || '0';
          var l = integer.length;
          if(l>=md && (gd=='true' || gd=='integer')){
              l-=3;
              for(;l>0;l-=3){
                  integer = integer.slice(0,l) + gs + integer.slice(l);
              }
          }

          if(!decimal)
              return integer;

          var l = decimal.length;
          if(l>=md && (gd=='true' || gd=='decimal')){
              l-=1+(l-1)%3;
              for(;l>0;l-=3){
                  decimal = decimal.slice(0,l) + gs + decimal.slice(l);
              }
          }

          return integer + '.' + decimal;
      }
	  var exp = !!m[9];
	if(!(m[2] || m[3] || m[4]) && exp){
		// non-complex number without mantissa
		return (m[1] ? PSign(m[1]) : '') + '10^{'+m[9]+'}';
	}
	  var ret = (m[1] ? PSign(m[1]) : '') + PNumber(m[2],m[3]);
	  var cplx = !!m[4];
	  if(cplx){
		// have a complex number:
		ret += PSign(m[4])
		if(opts['complex-root-position']==='before-number')
			ret += opts['output-complex-root'] + PNumber(m[5] || m[7],m[6] || m[8]);
		else
			ret += PNumber(m[5] || m[7],m[6] || m[8]) + opts['output-complex-root'];
	  }
	  if(exp){
		if(cplx){
		  ret = '\\left(' + ret + '\\right)';
		}
		ret += opts['exponent-product']+' '+opts['exponent-base']+'^{'+m[9]+'}';
        if(bracket_exponent)
          ret = '\\left(' + ret + '\\right)';
	  }
      return ret;
    },
	mml: function() {
		return TEX.Parse(this.parsed).mml();
	}
  });
  var SINumberListParser = SINumberParser.Subclass({
    Parse: function () {
      // TODO: do not process list separators via TeX parsing
	    var str = this.string.replace(/\s+/gi,'');
      var numbers = str.split(';');
      var parsed = [];
      for(var idx=0;idx<numbers.length;++idx){
          if(idx==numbers.length-1){
              if(idx==1){
                  parsed.push('\\text{'+this.options['list-pair-separator']+'}');
              } else if(idx) {
                  parsed.push('\\text{'+this.options['list-final-separator']+'}');
              }
          } else if(idx) {
              parsed.push('\\text{'+this.options['list-separator']+'}');
          }
          parsed.push(this._parse_multi_part_number(numbers[idx]));
      }
      this.parsed = parsed;
    },
    mml: function() {
      return TEX.Parse(this.parsed.join('')).mml();
    }
   });

  /*
   * This is essentially a namespace for the various functions needed,
   * such that TEX.Parse's namespace is not cluttered too much.
   */
  var SIunitxCommands = {
    sisetup: function (name) {
      var options = this.GetArgument(name);
    },
    si: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var units = this.GetArgument(name);
//      console.log('>> si(',name,'){',units,'}');
      this.Push(SIUnitParser(units,options,this.stack.env).mml());
    },

    SI: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var num = this.GetArgument(name);
      var preunits = this.GetBrackets(name,'');
      var units = this.GetArgument(name);
 //     console.log('>> SI(',name,'){',num,'}{',units,'}');
      if(preunits){
        this.Push(SIUnitParser(preunits,options,this.stack.env).mml());
        this.Push(MML.mspace().With({
          width: MML.LENGTH.MEDIUMMATHSPACE,
          mathsize: MML.SIZE.NORMAL,
          scriptlevel:0
        }));
      }
      this.Push(SINumberParser(num,options,this.stack.env).mml());
      this.Push(MML.mspace().With({
        width: MML.LENGTH.MEDIUMMATHSPACE,
        mathsize: MML.SIZE.NORMAL,
        scriptlevel:0
      }));
      this.Push(SIUnitParser(units,options,this.stack.env).mml());
    },

    SIlist: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var num = this.GetArgument(name);
      var preunits = this.GetBrackets(name,'');
      var units = this.GetArgument(name);
      if(preunits) {
        preunits = SIUnitParser(preunits, options, this.stack.env);
      }
      num = SINumberListParser(num,options,this.stack.env).parsed;
      units = SIUnitParser(units, options, this.stack.env);
      function medspace(){return MML.mspace().With({
        width: MML.LENGTH.MEDIUMMATHSPACE,
        mathsize: MML.SIZE.NORMAL,
        scriptlevel:0
      });};
      for(var idx=0;idx<num.length;++idx){
        var n = num[idx];
        if(idx&1){
          // this is a separator
          this.Push(TEX.Parse(n).mml());
        } else {
          // this is a number
          if(preunits){
            this.Push(preunits.mml());
            this.Push(medspace());
          }
          this.Push(TEX.Parse(n).mml());
          this.Push(medspace());
          this.Push(units.mml());
        }
      }
    },

    SIrange: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var num1 = this.GetArgument(name);
      var num2 = this.GetArgument(name);
      var preunits = this.GetBrackets(name,'');
      var units = this.GetArgument(name);

      units = SIUnitParser(units,options,this.stack.env);
      if(preunits)
        preunits = SIUnitParser(preunits,options,this.stack.env)

      if(preunits){
        this.Push(preunits.mml());
        this.Push(MML.mspace().With({
          width: MML.LENGTH.MEDIUMMATHSPACE,
          mathsize: MML.SIZE.NORMAL,
          scriptlevel:0
        }));
      }
      this.Push(SINumberParser(num1,options,this.stack.env).mml());
      this.Push(MML.mspace().With({
        width: MML.LENGTH.MEDIUMMATHSPACE,
        mathsize: MML.SIZE.NORMAL,
        scriptlevel:0
      }));
      this.Push(units.mml());
      this.Push(options['range-phrase']);
      if(preunits){
        this.Push(preunits.mml());
        this.Push(MML.mspace().With({
          width: MML.LENGTH.MEDIUMMATHSPACE,
          mathsize: MML.SIZE.NORMAL,
          scriptlevel:0
        }));
      }
      this.Push(SINumberParser(num2,options,this.stack.env).mml());
      this.Push(MML.mspace().With({
        width: MML.LENGTH.MEDIUMMATHSPACE,
        mathsize: MML.SIZE.NORMAL,
        scriptlevel:0
      }));
      this.Push(units.mml());
    },

	num: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var num = this.GetArgument(name);
      this.Push(SINumberParser(num,options,this.stack.env).mml());
    },

	ang: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var num = this.GetArgument(name);
      num = SINumberListParser(num,options,this.stack.env).parsed;
      if(num.length>5)
        TEX.Error("More than three elements in angle specification");
      units = [
          'degree',
          undefined,
          'arcminute',
          undefined,
          'arcsecond'
      ];
      var def = {mathvariant: MML.VARIANT.NORMAL};
      for(var idx=0;idx<num.length;++idx){
        var n = num[idx];
        if(idx&1){
          // this is a separator
          // ignore here
          // TODO: factor out list separators from SINumberListParser
        } else {
          if(!n) continue;
          this.Push(TEX.Parse(n).mml());
          var u = UNITSMACROS[units[idx]][1];
          // assumes that all symbol's we encounter are MML.entity
          var mml = MML.mi.apply(MML.mi, [u.symbol]).With(def);
          this.Push(this.mmlToken(mml));
        }
      }
    },

	numlist: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var num = this.GetArgument(name);
      this.Push(SINumberListParser(num,options,this.stack.env).mml());
    },

	numrange: function (name) {
      var options = SIunitxOptions(ParseOptions(this.GetBrackets(name,'')));
      var num1 = this.GetArgument(name);
      var num2 = this.GetArgument(name);
      this.Push(SINumberParser(num1,options,this.stack.env).mml());
      this.Push(options['range-phrase']);
      this.Push(SINumberParser(num2,options,this.stack.env).mml());
    }

  };
  MathJax.Extension["TeX/siunitx"].SIunitxCommands = SIunitxCommands;


  /***************************************************************************/

  TEX.Definitions.Add({
    macros: {
      //
      //  Set up the macros for SI units
      //
      sisetup:   'SIunitx',
      si:   'SIunitx',
      SI:   'SIunitx',
      SIlist:   'SIunitx',
      SIrange:   'SIunitx',
      num:   'SIunitx',
      ang:   'SIunitx',
      numlist:   'SIunitx',
      numrange:   'SIunitx',
    }
  },null,true);

  TEX.Parse.Augment({

    //
    //  Implements \SI and friends
    //
    SIunitx: function (name) {
      SIunitxCommands[name.slice(1)].call(this,name)
    }

  });

  //
  //  Indicate that the extension is ready
  //
  MathJax.Hub.Startup.signal.Post("TeX siunitx Ready");

});

MathJax.Ajax.loadComplete("[Contrib]/siunitx/unpacked/siunitx.js");
