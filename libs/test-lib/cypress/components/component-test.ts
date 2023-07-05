import {
  Before,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import '../../../cypress/support/commands';
import 'cypress-wait-until';
import { TestBed } from '@angular/core/testing';
import { ComponentTestComponent } from '../../src/lib/component-test/component-test.component';

Given('it renders', () => {
  TestBed.overrideComponent(ComponentTestComponent, {
    add: {
      imports: [],
      providers: [],
    },
  });
  cy.mount(ComponentTestComponent);
});
Then('correct text is shown', () => {
  cy.waitUntil(() => cy.get('p').contains('component-test works!'));
});
