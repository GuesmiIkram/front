import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterVoitureComponent } from './consulter-voiture.component';

describe('ConsulterVoitureComponent', () => {
  let component: ConsulterVoitureComponent;
  let fixture: ComponentFixture<ConsulterVoitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterVoitureComponent]
    });
    fixture = TestBed.createComponent(ConsulterVoitureComponent);
    component = fixture.componentInstance;    

    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
