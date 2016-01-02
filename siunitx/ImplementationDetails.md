# Implementation details for the siunitx extension for MathJax

The extension is implemented as most other TeX input extension by patching the `MathJax.InputJax.TeX` class.
However, the implementation of these commands is rather complicated and thus deserves some more detailed explanation.
The code can be roughly devided into four distinct parts that will be described separately:

## 1. Top-level commands
siunitx provides a number of commands all centered around formatting SI units and physical quantities involving such units.
It uses an extensive array of configuration options to configure various internal settings.
Thus, the function of all commands can be built from three basic building blocks;

 1. Options parsing
 2. Parsing and formatting of numbers
 3. Parsing and formatting of units

The top level commands are implemented by instantiating and combining these components as required.
Note that in the current implementation, parsing and formatting are not separated at this level.

## 2. Options parsing
All options are given as key-value pairs in siunitx, so a dedicated machinery has been implemented for this purpose.
Furthermore, the documentation clearly identifies types for each option key.
A generic implementation of such a typed key-value list is provided by the class `ConfigData`.
In fact, the types of each key are declared by subclassing that class using the class-method `ConfigData.Define`,
which makes use of JS's property descriptors to generate runtime type-checked properties on the sub-class.
The values are stored in a private sub object `_values`, which allows to easily generate derived option value sets using
JS's prototyping mechanism (allowing to implement option _scopes_).

The type validation is done by instances of `ValidationBase` objects, whose properties specify the exact set of allowed values.
There are sub-classes for all types of options used in siunitx, i.e. `Switch` for simple true/false options, `Integer` for
integer numbers or `TeXParsedLiteral` accepting TeX literals which are supposed to be pre-parsed
(TODO: pre-parsing is not done, I didn't find out how to clone MML instances).

The design allows for easy scoping and possibly interoperation with the `grouping` extension
(or how was it called again, the one allowing for TeX groups?)
Surely, the currently unimplemented `\sisetup` command should be trivial with this framework.

## 3. Number parsing and formatting
siunitx provides many options for number transformation and rendering.
Unfortunately, it is not completely clear to me what exactly is allowed to write numbers in siunitx.
Current personal experience seems to suggest that numbers are only accepted exactly as specified (which covers a wide set of notation).
The current implementation uses regexes to capture the numbers, but they are not really parsed as numbers.
Instead, they are in-place transformed into LaTeX formatting for output as intended by siunitx.
Then, the standard `MathJax.InputJax.TeX` parser is used to generate the MML.

The current approach is limited, as it does not allow for more complicated rewriting options provided by siunitx.
Instead, parsing and output should be separated completely, and ideally no more intermediate TeX should be required.

## 4. Units parsing and formatting
siunitx essentially knows two ways to specify units: macro units and the literal units.
According to Joseph Wright, in literal mode, everything is passed to LaTeX as is, except for some 'string replacement'.
Macros are parsed into a structure.
If anything literal is present, the whole unit specification is parsed literally.
This is taken over to this implementation.
A subclass of `MathJax.InputJax.TeX` is created that knows all of the units known to siunitx.
The input is then parsed as usual, the unit macros build an internal structure step by step.
At the same time, they `this.PushUnitFallBack` the fallback output for literal mode.
Literal mode is detected inside a patched `this.Push`, which get's invoked from any parser code that does not know about siunitx macros.
If any such literal input is detected, the normally parsed output will be given, otherwise the output is generated from
the internal structure.
That internal structure contains prefixes, qualifications, powers and the actual unit.

The current implementation works quite well, except that the generated MML is probably suboptimal.
In fact, the MML unit specification would allow to embed information that makes machine processing of the units possible.
An interesting avenue would certainly be a menu entry to convert the numbers into other units systems, but is out of scope of the siunitx extension.

## Conclusion: TODO's
I see three general areas that call for improvement:

 1. MML ouput quality. I don't know MML well enough, neither it's representation in MathJax.
  Therefore, I just copy-pasted from other code to produce something that remotely looks ok.
  However, someone with more insight into MathJax should definitely go over this.
  On a side note, I was unable to find a way to clone MML structures, so currently the MML is generated every time anew,
  even when e.g. repeated units could profit from a clone.
 2. Number parsing/formatting: Many rewriting options offered by siunitx are unavailable and hard to implement with the
  current design, where numbers are never completely interpreted.
 3. Options scoping. The `\sisetup` command is not implemented, and neither is the `this.stack.env` environment used,
  since I never really took the time to dive into that.

