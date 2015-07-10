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

### gulp dev --prod

Use minified code for all static resources (CSS, JavaScript, images).

### gulp lint

Lint the code-base (SCSS, JavaScript, HTML).

### gulp build

Build target. This is just a call to gulp dev --prod which gets copied to the /dest/ folder (for now).

### gulp deploy

Uploads the /www/ directory to the configured FTP-server.

## Icons

Favicons can be generated at http://realfavicongenerator.net/. They are put in the /src/icons/-directory.