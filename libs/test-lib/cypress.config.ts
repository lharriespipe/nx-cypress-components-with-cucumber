// import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
// import { defineConfig } from 'cypress';
// import * as webpack from "@cypress/webpack-preprocessor";
// import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";


import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/dist/subpath-entrypoints/browserify";
import * as webpack from "@cypress/webpack-preprocessor";
import { nxComponentTestingPreset } from "@nx/angular/plugins/component-testing";
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';


// STANDARD

// async function setupNodeEvents(
//   on: Cypress.PluginEvents,
//   config: Cypress.PluginConfigOptions
// ): Promise<Cypress.PluginConfigOptions> {
//   // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
//   await addCucumberPreprocessorPlugin(on, config);

//   on(
//     "file:preprocessor",
//     browserify(config, {
//       typescript: require.resolve("typescript"),
//     })
//   );

//   // Make sure to return the config object as it might have been modified by the plugin.
//   return config;
// }


// WEBPACK

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    setupNodeEvents,
    // add your own config here
    specPattern: "**/*.feature",
    supportFile: './cypress/support/component.ts',
  }
});
