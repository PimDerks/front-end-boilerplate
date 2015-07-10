# Boilerplate
Lorem ipsum

## Roadmap

* Write custom template render logic
* Each content-page has an template file and an optional data (JSON) file.
*

## Tools, languages and techniques

* Content First
* Gulp
* SASS
* BEM
* AutoPrefixer
* Node.JS

## Gulp tasks

### gulp dev

Default task which you would normally use.

### gulp lint

Lint the code-base (SCSS, JavaScript, HTML).

### gulp build

Build target. This runs the gulp dev command, copies the /www/ directory to /dest/ and minifies the CSS/JS/images.

### gulp deploy

Uploads the /build/ directory to the configured FTP-server.

## Icons

Favicons can be generated at http://realfavicongenerator.net/. They are put in the /src/icons/-directory.