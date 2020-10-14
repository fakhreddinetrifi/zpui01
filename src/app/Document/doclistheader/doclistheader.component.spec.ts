import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoclistheaderComponent } from './doclistheader.component';

describe('DoclistheaderComponent', () => {
  let component: DoclistheaderComponent;
  let fixture: ComponentFixture<DoclistheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoclistheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoclistheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
