# MathJax Arabic Extension
This is an extension to MathJax (v2.5+), that provides basic Arabic support to MathJax.

The extension so far only supports TeX input with HTML-CSS output. However, support to other input and output
jaxes is possible.

## Key Features
It provides the following:

  - Flip the Equation and render it the Right-to-left (RTL) way!
  - Translate commonly used identifiers and functions.

## How to Use the Extension
### Install the Extension
First you'd like to [install](http://mathjax.readthedocs.org/en/latest/installation.html)
and [configure](http://mathjax.readthedocs.org/en/latest/configuration.html) the MathJax in your page.

Then you'll need to include the `arabic.js` as an extension, here's an example configuration:

    MathJax.Ajax.config.path["Contrib"] = "//cdn.mathjax.org/mathjax/contrib";

    MathJax.Hub.Config({
        extensions: [
            "[Contrib]/arabic/arabic.js"
        ]
    });


### The Amiri Font
The extension relies (sort of) on the
[Amiri font](https://www.google.com/fonts#UsePlace:use/Collection:Amiri)
to render beautifully (kinda).

One way to include the font is to add the following CSS from Google Fonts:

    <link href='https://fonts.googleapis.com/css?family=Amiri' rel='stylesheet' type='text/css'>


Also you'd like to set the font as the undefined family. Because of a bug in MathJax, you should stick with a single
font-family e.g. use `Amiri` or `serif` but not `Amiri, serif`.

    MathJax.Hub.Config({
        'HTML-CSS': {
            undefinedFamily: 'Amiri'
        }
    });

### Typeset an Arabic Equation
The extension provides the following additional TeX commands to be typeset an Arabic equation:

1. **`\alwaysar`**

   `\alwaysar{EQUATION}` A macro to translate and RTL'ize an `EQUATION`,  where `EQUATION` can be anything from
   `x = 1` to `e^x=\lim_{n\to\infty}`.

   Wrap any TeX equation with it, and it *should* just work.

2. **`\ar`**

   `\ar{EQUATION}` (**Recommended**) A similar macro to `\alwaysar{EQUATION}`, but it only translate and RTL'ize the equation if  the page is Arabic.

   Bellow is an example equation:

       \ar{x=1}

   The above would render **x=1** beautifully in an English page, while it should render **س=١** in an Arabic page
   even more beautifully ( in my opinion :) ).

## Supported Features
 - Flip everything (almost) including:
     * Parentheses `()`, braces `{}`, and brackets `[]`
     * Things that should be flipped like: Integration `∫`, Root `√` and Sigma `Σ`

 - Doesn't flip the things that should't be flipped,
   like the following letters: Theta `Θ`, Pi `π`, and Epsilon `ε`

 - Translate the basic math functions:
     * `\sin` --> `جا`
     * `\cos` --> `تا`
     * `\tan` --> `ظا`
     * `\cot` --> `ظتا`
     * `\sec` --> `قا`
     * `\csc` --> `قتا`
     * `\log` --> `لو`


 - Translate `\lim` into `نها`, Although some would prefer `غــا`, but that's just
   a preference, may someone can patch it to support `ar_IQ` for the Iraqi people!

 - Render the Arabic numbers (١, ٢, ٣) instead of (1, 2, 3), which is awesome!

 - The following new commands:
     * **Circle radius:** `\radius` Translates to `r` and `نق`
     * **Area of circle:** (and other stuff) `\Area` Translates to `A` and `م`
     * **Arabic Zero:** `\zero` Renders the `صفر`in Arabic while printing normal `0` in English.
       The former is usually preferred by the Arabic Math textbooks.

 - Bilingual commands, which prints the first argument on English pages and the second argument on Arabic pages.
   Useful to to build bilingual equations for strings that the extension provides no explicit support to.
   **Note** The first (English) argument is always a TeX input, while the second (Arabic) can be 
   TeX, Text or TeX with Symbols, depending on the command you're using.
     * **Translate a TeX input** `\transx` 
     * **Translate a text input** `\transt` e.g. `\transt{\text{if}}{إذا}` for the Math piecewise equations.
     * **Translate a TeX input with Arabic symbols** `\transs`: e.g. `\transs{A_b}{أ_ب}`

 - Basic variable and function names translation:
     * `A` --> `أ`
     * `B` --> `ب`
     * `C` --> `حـ`
     * `a` --> `ا`
     * `b` --> `ب`
     * `c` --> `حـ`
     * `d` --> `د`
     * `e` --> `هـ`
     * `m` --> `م`
     * `l` --> `ل`
     * `n` --> `ن`
     * `f` --> `ق`
     * `g` --> `حـ`
     * `h` --> `هـ`
     * `k` --> `ك`
     * `r` --> `ر`
     * `t` --> `ت`
     * `x` --> `س`
     * `y` --> `ص`
     * `z` --> `ع`


 - Translation to other identifiers and operators like limits (`\lim`), sine, cosine and tan.


 - A very configurable translation utility to provide English/Arabic TeX
   commands (same command, with language-dependent output).

 - A configurable page language detection (defaults to the `lang` attribute of `<html>` tag).

 - It is generally configurable, but I haven't documented how to do it!

## Experimental Stuff
Additional extensions for Physics and some Chemistry units and symbols exists,
however, it is not tested/developed well. If you're curious, you can take a look
at the following extensions:

 - [`phys1.js`](https://github.com/Edraak/arabic-mathjax-dev/blob/master/testcases/test-extensions/phys1.js):
   Contains general physics units like Farad and speed of light. Interesting stuff, but haven't had proper
   testing and usage (yet).

 - [`phys2.js`](https://github.com/Edraak/arabic-mathjax-dev/blob/master/testcases/test-extensions/phys2.js):
   Additional advanced physics units that I don't understand as much!

 - [`hacks.js`](https://github.com/Edraak/arabic-mathjax-dev/blob/master/testcases/test-extensions/hacks.js):
   A hack to convert the English decimal mark from `.` to `٫`
   ([Arabic decimal mark, Unicode 0x066b](http://www.unicodemap.org/details/0x066B/index.html)).
   Although the Arabic decimal mark exists, I'm not sure if it is
   [common enough](https://en.wikipedia.org/wiki/Decimal_mark#Countries_using_Arabic_numerals_with_decimal_comma)
   to include it in the main installation.

# How to Contribute
Well, just issue a pull request to this repo and ping me (my GitHub username is @OmarIthawi).
Even better, grab my docker-based development environment from here so you can have a better development experience:

 - [github.com/Edraak/arabic-mathjax-dev](https://github.com/Edraak/arabic-mathjax-dev)

# License
The MIT License

Copyright (c) 2015-2016 The Queen Rania Foundation for Education and Development

# Author

 - Omar Al-Ithawi <i@omardo.com>

# A bit of a Background
Why this plugin exists? Well, I could tell you an interesting story like I wanted to change the world,
but frankly we needed it to display Math equations for our Arabic learners at [Edraak.org](https://www.edraak.org),
and therefore I made it.

Well, it does change the world somehow, at the least in the eyes of our learners ^_^
