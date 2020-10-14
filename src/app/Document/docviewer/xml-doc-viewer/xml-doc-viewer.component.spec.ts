import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlDocViewerComponent } from './xml-doc-viewer.component';

describe('XmlDocViewerComponent', () => {
  let component: XmlDocViewerComponent;
  let fixture: ComponentFixture<XmlDocViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlDocViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlDocViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
