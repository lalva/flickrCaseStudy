# Flicker Case Study

## Dev Environment

### Install prerequisites

* Node.js v0.10.x+
* npm (which comes bundled with Node) v2.1.0+
* git

#### Install Compass
`sudo gem install compass`

#### Install the Yeoman toolset
`npm install --global yo bower grunt-cli`

#### Install Generator
`npm install --global generator-angular@0.9.2`

#### Clone and Run Project
`git clone https://github.com/lalva/flickrCaseStudy.git`
`cd flickrCaseStudy`
`npm install`
`bower install`
`grunt serve`

## Build & development

To create views/controllers/models/directives, use [yo angular generator](https://github.com/yeoman/generator-angular) version 0.11.1

1. Navigate to root directory
2. Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


