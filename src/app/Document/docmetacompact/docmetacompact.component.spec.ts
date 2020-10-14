import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocmetacompactComponent } from './docmetacompact.component';

describe('DocmetacompactComponent', () => {
  let component: DocmetacompactComponent;
  let fixture: ComponentFixture<DocmetacompactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocmetacompactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocmetacompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
