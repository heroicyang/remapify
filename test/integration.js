/* global describe, it */
'use strict';

var browserify = require('browserify')
  , remapify = require('../index.js')
  , path = require('path')

// running this file with node works, but running it through mocha doesn't IDK… whatever…
// jscs:disable disallowAnonymousFunctions
describe('remapify integration', function(){
  it('works with a two patterns', function(done){
    var patterns = [
      {
        src: '**/*.js'
        , expose: 'things'
        , cwd: path.join(__dirname, 'fixtures', 'target')
      }
      , {
        src: './test/fixtures/target/**/*.js'
        , expose: 'nocwd'
      }
    ]
    , b = browserify(path.join(__dirname, 'fixtures', 'integration-entry.js'))

    patterns.config = {
      verbose: false
    }

    b.plugin(remapify, patterns)

    b.bundle(done)
  })

  it.only('works with a single patterns', function(done){
    var patterns = [
      {
        src: '**/*.js'
        , expose: 'things'
        , cwd: path.join(__dirname, 'fixtures', 'target')
      }
    ]
    , b = browserify(path.join(__dirname, 'fixtures', 'integration-entry-single.js'))

    b.plugin(remapify, patterns)

    b.bundle(done)
  })
})
