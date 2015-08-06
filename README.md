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

Paths can be configured in `gulp.config.js`.

* `roots.src` is the source directory you are working in.
* `roots.www` is the output of the `gulp initial`-task your project which will be running in a webserver
* `roots.tmp` is used for writing temporary files (right now only used for Swig)
* `roots.dest` is the output of the `gulp build`-task.

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