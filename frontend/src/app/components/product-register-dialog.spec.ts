import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegisterDialog } from './product-register-dialog';

describe('ProductRegisterDialog', () => {
  let component: ProductRegisterDialog;
  let fixture: ComponentFixture<ProductRegisterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRegisterDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRegisterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
