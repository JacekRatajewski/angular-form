import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import { Router } from '@angular/router';
import { SignInResult } from '../../services/models/sign-in-result.model';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: 'sign-in-page.component.html',
  styleUrl: 'sign-in-page.component.scss',
  standalone: false,
})
export class SignInComponent implements OnInit {
  public signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signInService: SignInService,
    private router: Router,
    private lsService: LocalstorageService<SignInResult>
  ) {}

  ngOnInit() {
    this._initForm();
  }

  public sendForm() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.controls;
      this.signInService.signIn$(email.value, password.value).subscribe({
        next: (res: SignInResult) => {
          this._navigateAndSave(res);
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
      this.signInForm.updateValueAndValidity();
    }
  }

  private _initForm() {
    this.signInForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  private _navigateAndSave(res: SignInResult) {
    if (res.token) {
      this.lsService.set('token', res);
      this.router.navigateByUrl('/home');
    }
  }
}
