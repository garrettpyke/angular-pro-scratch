import {
  Component,
  DoCheck,
  Output,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  QueryList,
  ContentChildren,
  AfterContentInit,
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
          <input type="email" name="email" ngModel />
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
  styles: [``],
})
export class AuthFormComponent
  implements DoCheck, AfterContentInit, AfterViewInit
{
  constructor() {}

  showMessage: boolean;

  // a view child queries the view we're currently inside
  @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

  // queries the projected ngContent item(s) (outside)
  @ContentChildren(AuthRememberComponent)
  remember: QueryList<AuthRememberComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    if (this.message) {
      this.message.days = 30; // This does work.
    }
  }

  ngAfterContentInit() {
    if (this.message) {
      this.message.days = 30; // Should work, but doesn't re component isn't instantiated yet
      // console.log(this.message.days);
    }

    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe(
          (checked: boolean) => (this.showMessage = checked)
        );
      });
    }
  }

  ngAfterViewInit() {
    console.log(this.message);
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
