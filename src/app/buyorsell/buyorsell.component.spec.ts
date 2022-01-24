import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyorsellComponent } from './buyorsell.component';

describe('BuyorsellComponent', () => {
  let component: BuyorsellComponent;
  let fixture: ComponentFixture<BuyorsellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyorsellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyorsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
