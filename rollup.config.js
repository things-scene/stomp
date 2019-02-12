import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import graphql from "rollup-plugin-graphql";

let pkg = require("./package.json");
let external = Object.keys(pkg.dependencies);
let plugins = [
  graphql(),
  resolve(),
  babel(),
  commonjs(),
  terser({
    sourcemap: true
  })
];

export default [
  {
    input: "src/index.js",
    plugins,
    external,
    output: [
      {
        file: "dist/things-scene-stomp.js",
        name: "things-scene-stomp",
        format: "umd",
        globals: {
          "@hatiolab/things-scene": "scene",
          "@stomp/stompjs": "StompCli",
          "sockjs-client": "SockJS"
        }
      }
    ]
  },
  {
    input: "src/index.js",
    plugins,
    external: [
      "@hatiolab/things-scene",
      "events",
      "websocket",
      "util",
      "url",
      "websocket-driver"
    ],
    output: [
      {
        file: pkg.module,
        format: "esm"
      }
    ]
  }
];
