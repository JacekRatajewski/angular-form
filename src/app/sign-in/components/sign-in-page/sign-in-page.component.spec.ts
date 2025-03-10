import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { SignInService } from '../../services/sign-in.service';
import { LocalstorageService } from '../../../../shared/services/localstorage.service';
import { SignInResult } from '../../services/models/sign-in-result.model';
import { routes } from '../../sign-in.routes';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorComponent } from '../../../../shared/components/error/error.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let mockSignInService: jasmine.SpyObj<SignInService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocalStorageService: jasmine.SpyObj<
    LocalstorageService<SignInResult>
  >;

  beforeEach(async () => {
    mockSignInService = jasmine.createSpyObj('SignInService', ['signIn$']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockLocalStorageService = jasmine.createSpyObj('LocalstorageService', [
      'set',
    ]);
    const materialModules = [
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ];
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [
        ReactiveFormsModule,
        ErrorComponent,
        RouterModule.forChild(routes),
        ...materialModules,
      ],
      providers: [
        FormBuilder,
        { provide: SignInService, useValue: mockSignInService },
        { provide: Router, useValue: mockRouter },
        { provide: LocalstorageService, useValue: mockLocalStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on init', () => {
    expect(component.signInForm).toBeDefined();
    expect(component.signInForm.controls['email']).toBeDefined();
    expect(component.signInForm.controls['password']).toBeDefined();
  });

  it('should mark form as touched and update validity if invalid form is submitted', () => {
    spyOn(component.signInForm, 'markAllAsTouched');
    spyOn(component.signInForm, 'updateValueAndValidity');

    component.sendForm();

    expect(component.signInForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.signInForm.updateValueAndValidity).toHaveBeenCalled();
  });

  it('should call signIn$ with correct credentials when form is valid', () => {
    const mockResponse: SignInResult = { token: 'token' };
    mockSignInService.signIn$.and.returnValue(of(mockResponse));

    component.signInForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.sendForm();

    expect(mockSignInService.signIn$).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });

  it('should navigate and save token on successful login', () => {
    const mockResponse: SignInResult = { token: 'mockToken' };
    mockSignInService.signIn$.and.returnValue(of(mockResponse));

    component.signInForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.sendForm();

    expect(mockLocalStorageService.set).toHaveBeenCalledWith(
      'token',
      mockResponse
    );
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  });
});
