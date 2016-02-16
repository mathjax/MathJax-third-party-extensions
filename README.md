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


## Using third party extensions.

We host  copy of the third-party extension repository on the MathJax CDN. This means anything you contribute here will be easily available to all MathJax CDN users.


To add the third party repository to your configuration use

    <script type="text/x-mathjax-config">
      MathJax.Ajax.config.path["Contrib"] = "//cdn.mathjax.org/mathjax/contrib";
    </script>

or equivalently,

    <script type="text/javascript">
      window.MathJax = {
        AuthorInit: function () {
                MathJax.Ajax.config.path["Contrib"] = "//cdn.mathjax.org/mathjax/contrib";
            }
      };
    </script>

in your configuration. See also the [documentation page on third party extensions and this repository](http://docs.mathjax.org/en/latest/options/ThirdParty.html#mathjax-third-party-extension-repository).

## Writing extensions

The MathJax documentation [contains a tutorial on extension writing](http://docs.mathjax.org/en/latest/advanced/extension-writing.html).

Afterwards, you might want to start by looking at some of the extensions here and [the MathJax core extensions](http://github.com/mathjax/MathJax/tree/master/unpacked/extensions).
