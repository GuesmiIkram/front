import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterResponseComponent } from './consulter-response.component';

describe('ConsulterResponseComponent', () => {
  let component: ConsulterResponseComponent;
  let fixture: ComponentFixture<ConsulterResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterResponseComponent]
    });
    fixture = TestBed.createComponent(ConsulterResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
