import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  imports: [CommonModule],
  selector: 'app-error',
  templateUrl: 'error.component.html',
  styleUrl: 'error.component.scss',
  standalone: true,
})
export class ErrorComponent {
  @Input() public form!: FormGroup;
  @Input() public controlName!: string;
  private _errorMessages: { [key: string]: string } = {
    required: 'This field is required.',
    pattern: 'E-mail has incorrect format.',
  };
  private get _control(): UntypedFormControl {
    return this.form.get(this.controlName) as UntypedFormControl;
  }

  constructor() {}

  public isControlInvalid(): boolean {
    return (
      this._control?.invalid && (this._control?.touched || this._control?.dirty)
    );
  }

  public getErrorMessage(): string {
    const errors: string[] = [];
    for (const element in this._control.errors) {
      errors.push(this._errorMessages[element]);
    }
    return errors.join(' ');
  }
}
