import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component'; // importing b/c now injecting dynamically

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div #entry></div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // using AfterViewInit b/c ViewChild is not available at AfterContentInit
    const component = this.entry.createComponent(AuthFormComponent);
    this.cd.detectChanges();
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
