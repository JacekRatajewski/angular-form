import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { LocalstorageService } from '../../../../shared/services/localstorage.service';
import { SignInResult } from '../../services/models/sign-in-result.model';
import { User } from '../../services/models/user.model';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home-page.component.html',
  styleUrl: 'home-page.component.scss',
  standalone: false,
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  public user$ = new BehaviorSubject<User | null>(null);
  public showSidebar = true;
  public isMobile = true;
  public get user(): User | null {
    return this.user$.value;
  }

  constructor(
    private userService: UserService,
    private lsService: LocalstorageService<SignInResult>,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = this.lsService.get('token');
    if (token)
      this.userService.getUser$(token.token).subscribe({
        next: (res: User) => {
          this.user$.next(res);
        },
      });
  }

  ngAfterViewInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;

        if (!this.isMobile && !this.drawer.opened) {
          this.drawer.toggle();
        } else if (this.isMobile && this.drawer.opened) {
          this.drawer.toggle();
        }
        this.cdr.detectChanges();
      });
  }

  public logOut() {
    this.lsService.clear();
    this.router.navigateByUrl('/');
  }
}
