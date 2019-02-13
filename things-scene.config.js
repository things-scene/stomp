import locales from './locales';

import icon from './assets/stomp.png';

var templates = [{
  type: 'stomp',
  description: 'stomp client',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: "stomp",
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true,
    dataFormat: 'json'
  }
}];

export default {
  templates,
  locales
};
