import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCoinComponent } from './card-coin.component';

describe('CardCoinComponent', () => {
  let component: CardCoinComponent;
  let fixture: ComponentFixture<CardCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
