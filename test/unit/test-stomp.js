/*
 * Copyright © 2017 HatioLab Inc. All rights reserved.  
 */

import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Stomp } from '../../src/index'

describe('Stomp', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'stomp',
          type: 'stomp'
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var component = board.findById('stomp')

    expect(!!component).not.to.equal(false);
  });
});
