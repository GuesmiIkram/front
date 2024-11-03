import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePubComponent } from './liste-pub.component';

describe('ListePubComponent', () => {
  let component: ListePubComponent;
  let fixture: ComponentFixture<ListePubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListePubComponent]
    });
    fixture = TestBed.createComponent(ListePubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

