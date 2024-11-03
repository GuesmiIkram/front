import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProprietaireComponent } from './create-proprietaire.component';

describe('CreateProprietaireComponent', () => {
  let component: CreateProprietaireComponent;
  let fixture: ComponentFixture<CreateProprietaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProprietaireComponent]
    });
    fixture = TestBed.createComponent(CreateProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


