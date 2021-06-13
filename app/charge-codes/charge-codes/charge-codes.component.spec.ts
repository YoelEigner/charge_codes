import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getDataComponent } from './charge-codes.component';

describe('ChargeCodesComponent', () => {
  let component: getDataComponent;
  let fixture: ComponentFixture<getDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ getDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(getDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
