# Boilerplate
Lorem ipsum

## Roadmap

* Write custom template render logic
* Each content-page has an template file and an optional data (JSON) file.
*

## Tools, languages and techniques

### Tools
* [Gulp](http://gulpjs.com/)
* [AutoPrefixer](https://github.com/postcss/autoprefixer)
* [Node.JS](https://nodejs.org)
* [BrowserSync](browsersync.io)

### Languages
* HTML
* Javascript
* [SASS](http://sass-lang.com/)

### Libraries
* [Conditioner](http://conditionerjs.com)
* [RequireJS](http://requirejs.org)
* [Modenrizr](http://modernizr.com)

### Conventions
* [BEM](https://css-tricks.com/bem-101/)
* [Content First]

## Directories

### Roots

Paths can be configured in `gulp.config.js`.

* `roots.src` is the source directory you are working in.
* `roots.www` is the output of the `gulp initial`-task your project which will be running in a webserver
* `roots.tmp` is used for writing temporary files (right now only used for Swig)
* `roots.dest` is the output of the `gulp build`-task.

### Modules

We bundle files (SCSS, JavaScript, Swig, ...) together based on components/modules.

#### JavaScript

In the `roots.src`-folder, all JavaScript should be in the `modules`-folder. Site-wide, generic modules should be in `modules/base`.

The subfolders in the `modules/base/js`-folder are prefixed with numbers to make clear how everything should be structured. These numbers are stripped from the directory-names when compiling. The `/js/`-subfolder for each module is also stripped:

- `src/modules/base/js/00-vendor` becomes `www/static/js/base/vendor`
- `src/modules/moduleX/js/moduleX` becomes `www/static/js/module/moduleX`

etc. 

#### SCSS

For now, all the SCSS is merged into one single file. In the future it might be necessary to output separate files for modules.
This would however only be necessary when modules become (too) big.

The subfolders in the `modules/base/scss`-folder are prefixed with numbers to make clear how everything should be structured.

## Gulp

We use Gulp as a taskrunner to automate stuff. The following tasks can be used:

### gulp initial

Before starting work, run `gulp initial` to prefill the output directory. Only pre-existing files can be watched.

### gulp dev

Run `gulp dev` to watch for file changes and start BrowserSync.

### gulp build

Run `gulp build` after running `gulp dev` to copy the `src`-directory to the `dest`-directory.

### gulp deploy

Uploads the /build/ directory to the configured FTP-server.

## Misc

### Favicons

Favicons can be generated at http://realfavicongenerator.net/. They should be put in /src/static/img/.