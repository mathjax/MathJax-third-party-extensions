mathjax-third-party-extensions
==============================

A collection of MathJax extensions provided by third-party contributors. This repository is mirrored on the MathJax CDN.

## Contributing

We'd be thrilled to include your extension! 

To add an extension, simply create a pull request. Please structure your contribution along the lines of existing extensions. In particular, make sure that

* Create a subfolder
* Add a `README` file with some basic information on the extension (see other extensions for inspiration)
* Add a `License.txt` file. We require Apache-license-2 comaptible licenses.
* The `loadComplete` call in your extension should be of the form `[Contrib]/foldername/filename.js` to work generically with a third party location in MathJax v2.4+.
* Preferably, contribute both a packed (using uglify, YUI etc) as well as an unpacked version; the unpacked version should be placed under `foldername/unpacked/` with a working `loadComplete` call.


## How-to

**TODO** add links to documentation on extension writing. 

In the mean time, check out the extensions here and the core extension in http://github.com/mathjax/mathjax/unpacked/extensions

