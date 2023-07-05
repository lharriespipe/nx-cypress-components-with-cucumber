import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import * as webpack from "@cypress/webpack-preprocessor";
import { nxComponentTestingPreset } from "@nx/angular/plugins/component-testing";

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
  // Modified config following @badeball/cypress-cucumber-preprocessor examples for feature files
  // fails with loader error
  component: {
    ...nxComponentTestingPreset(__filename),
    specPattern: "**/*.feature",
    supportFile: './cypress/support/component.ts',
    setupNodeEvents,
  }
  // Standard config for .cy.ts files
  // runs successfully
  // component: {
  //   ...nxComponentTestingPreset(__filename),
  // }
});
