/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Discrepancy_ProtocolComponent } from './Discrepancy_Protocol.component';

describe('Discrepancy_ProtocolComponent', () => {
  let component: Discrepancy_ProtocolComponent;
  let fixture: ComponentFixture<Discrepancy_ProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Discrepancy_ProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Discrepancy_ProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
