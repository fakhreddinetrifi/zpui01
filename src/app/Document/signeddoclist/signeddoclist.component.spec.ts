import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigneddoclistComponent } from './signeddoclist.component';

describe('SigneddoclistComponent', () => {
  let component: SigneddoclistComponent;
  let fixture: ComponentFixture<SigneddoclistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigneddoclistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigneddoclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
