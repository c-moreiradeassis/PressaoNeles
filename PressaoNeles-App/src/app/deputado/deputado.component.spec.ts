/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeputadoComponent } from './deputado.component';

describe('DeputadoComponent', () => {
  let component: DeputadoComponent;
  let fixture: ComponentFixture<DeputadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
