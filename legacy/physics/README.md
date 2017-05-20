# LaTeX Physics Package

This extension is to mimics [the LaTeX Physics Package](http://www.ctan.org/pkg/physics) in MathJax. For details, see [the GitHub pages](https://ickc.github.io/MathJax-third-party-extensions/physics/) and [the GitHub repository](https://github.com/ickc/MathJax-third-party-extensions) of this extension.

# Some Commands are not Working

The following commands in the Physics Package is not implemented yet:

- All Matrix Macros
- So far everything done here is by string substitution. Whenever commands involving the following cannot be done simply by string substitution and hence not working:
	1. `*` modified command
	2. `[]` (or `()`) is involved
	3. variable no. of arguments
- Examples of commands that doesn't work: `\dv`: has all the properties mentioned above

As I mentioned, everything done so far is by string substitution only. Some hints are given in [Pull Request#16---MathJax-third-party-extensions](https://github.com/mathjax/MathJax-third-party-extensions/pull/16) but my skill is too limited to understand how the above cases should be handled. Feel free to improve it though.