import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetGoalPage } from './budget-goal.page';

describe('BudgetGoalPage', () => {
  let component: BudgetGoalPage;
  let fixture: ComponentFixture<BudgetGoalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
