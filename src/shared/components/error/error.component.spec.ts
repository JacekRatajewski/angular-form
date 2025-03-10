import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-host',
  template: '<app-error [form]="form" [controlName]="controlName"></app-error>',
  standalone: false
})
class HostComponent {
  form = new FormGroup({
    email: new UntypedFormControl(''),
  });
  controlName = 'email';
}

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let hostFixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ErrorComponent],
      declarations: [HostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.form = hostComponent.form;
    component.controlName = hostComponent.controlName;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if control is invalid and touched', () => {
    component.form.get(component.controlName)?.setErrors({ required: true });
    component.form.get(component.controlName)?.markAsTouched();
    expect(component.isControlInvalid()).toBeTrue();
  });

  it('should return false if control is valid', () => {
    component.form.get(component.controlName)?.setErrors(null);
    expect(component.isControlInvalid()).toBeFalse();
  });

  it('should return correct error message when required error exists', () => {
    component.form.get(component.controlName)?.setErrors({ required: true });
    expect(component.getErrorMessage()).toBe('This field is required.');
  });

  it('should return correct error message when pattern error exists', () => {
    component.form.get(component.controlName)?.setErrors({ pattern: true });
    expect(component.getErrorMessage()).toBe('E-mail has incorrect format.');
  });

  it('should return concatenated error messages when multiple errors exist', () => {
    component.form
      .get(component.controlName)
      ?.setErrors({ required: true, pattern: true });
    expect(component.getErrorMessage()).toBe(
      'This field is required. E-mail has incorrect format.'
    );
  });
});
