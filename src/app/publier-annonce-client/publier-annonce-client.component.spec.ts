import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierAnnonceClientComponent } from './publier-annonce-client.component';

describe('PublierAnnonceClientComponent', () => {
  let component: PublierAnnonceClientComponent;
  let fixture: ComponentFixture<PublierAnnonceClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublierAnnonceClientComponent]
    });
    fixture = TestBed.createComponent(PublierAnnonceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

