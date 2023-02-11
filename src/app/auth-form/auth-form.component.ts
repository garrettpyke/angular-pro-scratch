import {
  Component,
  DoCheck,
  Output,
  ViewChildren,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  QueryList,
  ContentChildren,
  AfterContentInit,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <!-- This is where the h3 in app.component is projected in -->
        <label>
          Email address
          <input type="email" name="email" ngModel #email />
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel />
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message [style.display]="showMessage ? 'inherit' : 'none'">
        </auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `,
  styles: [
    `
      .email {
        border-color: #9f72e6;
      }
    `,
  ],
})
export class AuthFormComponent
  implements DoCheck, AfterContentInit, AfterViewInit
{
  // a view child queries the view we're currently inside
  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;

  @ViewChild('email') email: ElementRef; // ElementRef allows you to use nativeElement methods

  // queries the projected ngContent item(s) (outside)
  @ContentChildren(AuthRememberComponent)
  remember: QueryList<AuthRememberComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  showMessage: boolean;

  constructor(private renderer: Renderer2, private cd: ChangeDetectorRef) {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // if (this.message) {
    //   this.message.days = 30; // This does work.
    // }
  }

  ngAfterContentInit() {
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe(
          (checked: boolean) => (this.showMessage = checked)
        );
      });
    }
  }

  ngAfterViewInit() {
    //* nativeElement api allows all of the DOM methods
    // this.email.nativeElement.setAttribute(
    //   'placeholder',
    //   'Enter your email address'
    // );
    // this.email.nativeElement.classList.add('email');
    // this.email.nativeElement.focus();

    //* Renderer allows intercept of render methods, can render outside of web DOM (platform agnostic)
    this.renderer.setAttribute(
      this.email.nativeElement,
      'placeholder',
      'Enter your email address'
    );
    this.renderer.addClass(this.email.nativeElement, 'email');
    this.renderer.selectRootElement(this.email.nativeElement, true).focus();

    if (this.message) {
      this.message.forEach((message) => {
        message.days = 30;
      });
      this.cd.detectChanges();
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
