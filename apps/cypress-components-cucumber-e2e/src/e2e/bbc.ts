import {
  Before,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import '../support/commands';
import 'cypress-wait-until';

Given('I go to bbc', () => {
  cy.visit('http://bbc.co.uk');
});

Then('the page is displayed', () => {
  cy.waitUntil(() => cy.get('title').contains('BBC - Home'));
});
