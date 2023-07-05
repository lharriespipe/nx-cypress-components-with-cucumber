import { TestBed } from '@angular/core/testing';
import { ComponentTestComponent } from './component-test.component';

describe(ComponentTestComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(ComponentTestComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(ComponentTestComponent);
    cy.get('p').contains('component-test works!')
  });
});
