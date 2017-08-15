mathjax-third-party-extensions
==============================

A list of MathJax extensions provided by third-party contributors.

**Note** The old version of this repository was retired alongside the MathJax CDN; see [#39](https://github.com/mathjax/MathJax-third-party-extensions/issues/39).

## Third Party Extensions

* [arabic.js](https://github.com/Edraak/arabic-mathjax-dev)
  * TeX input extension that provides basic Arabic support.
* [mhchem](https://github.com/mhchem/MathJax-mhchem)
  * TeX input extension for typesetting chemical equations, by the maintainer of the original `mhchem` LaTeX package.
* [img](https://github.com/pkra/mathjax-img)
  * TeX input extension for using images
* [xyjax](https://github.com/sonoisa/XyJax)
  * TeX input extension for typesetting `xypic` diagrams.
* [siunitx](https://github.com/burnpanck/MathJax-siunitx)
  * TeX input extension implementing much of the `siunitx` LaTeX package.
* [physics](https://github.com/ickc/MathJax-third-party-extensions/tree/gh-pages/physics)
  * TeX input extension implementing much of the `physics` LaTeX package.

### Legacy extension

You can find older (unmaintained) extensions in the `legacy` folder of this repository.

## Contributing

Add your extension! Simply create a pull request adding a link to `README.md`.

Please structure your extension along the lines of existing third-party extensions. In particular, make sure that

* Add a `README` file
  * Include basic usage information for your extension (see other extensions for inspiration).
* Add a license.
  * We require Apache-license-2-compatible licenses.
* Custom path in `loadComplete` call
  * The `loadComplete` call in your extension should be of the form `[myextension]/filename.js` to work generically with third party locations.
  * **Note** a clash of your prefix with another extension's prefix will usually mean that people can't use both extensions at the same time.
* Tag it!
  * individual releases allow version specific loading from CDN providers.

We also suggest submitting your extension to [cdnjs](https://cdnjs.com) and [jsdelivr](https://www.jsdelivr.com) -- and of course there's always [rawgit.com](https://rawgit.com).

## Using third party extensions.

For more details, [see the MathJax documentation](http://docs.mathjax.org/en/latest/options/ThirdParty.html#custom-extension-path-configuration).

A) Specify the path, e.g.,

```html
<script type="text/x-mathjax-config">
  MathJax.Ajax.config.path["spiffy"] = "https://path/to/spiffy";
</script>
```

or equivalently,

```html
<script type="text/javascript">
  window.MathJax = {
    AuthorInit: function () {
            MathJax.Ajax.config.path["spiffy"] = "https://path/to/spiffy";
        }
  };
</script>
```

B) Add the extension to your configuration, e.g.,

```js
MathJax.Hub.Config({
  extensions: ["[spiffy]/spiffy.js"]
});
```

## Writing extensions

The MathJax documentation [contains a tutorial on extension writing](http://docs.mathjax.org/en/latest/advanced/extension-writing.html).

Afterwards, you might want to start by looking at some of the extensions here and [the MathJax core extensions](http://github.com/mathjax/MathJax/tree/master/unpacked/extensions).
