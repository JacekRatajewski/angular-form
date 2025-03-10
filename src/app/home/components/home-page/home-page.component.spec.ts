import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home-page.component';
import { UserService } from '../../services/user.service';
import { LocalstorageService } from '../../../../shared/services/localstorage.service';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { SignInResult } from '../../services/models/sign-in-result.model';
import { User } from '../../services/models/user.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { routes } from '../../home.routes';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let breakpointObserverMock: jasmine.SpyObj<BreakpointObserver>;
  let cdrMock: jasmine.SpyObj<ChangeDetectorRef>;
  let localStorageServiceMock: jasmine.SpyObj<
    LocalstorageService<SignInResult>
  >;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUser$']);
    localStorageServiceMock = jasmine.createSpyObj('LocalstorageService', [
      'get',
      'clear',
    ]);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    breakpointObserverMock = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);
    const observerResult: BreakpointState = { matches: true, breakpoints: {} };
    breakpointObserverMock.observe.and.returnValue(of(observerResult));
    cdrMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    const materialModules = [MatMenuModule, MatIconModule, MatSidenavModule];
    await TestBed.configureTestingModule({
      imports: [RouterModule.forChild(routes), ...materialModules],
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: LocalstorageService, useValue: localStorageServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
        { provide: ChangeDetectorRef, useValue: cdrMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user from json and fetch user data on init', () => {
    const mockUser: User = {
      id: 1,
      name: 'Jacek Ratajewski',
      portraitUrl: 'assets/avatars/default.png',
    } as User;
    localStorageServiceMock.get.and.returnValue({ token: 'token' });
    userServiceMock.getUser$.and.returnValue(of(mockUser));
    component.ngOnInit();
    expect(userServiceMock.getUser$).toHaveBeenCalledWith('token');
  });

  it('should log out and navigate to root', () => {
    component.logOut();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
