import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component'; // importing b/c now injecting dynamically

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="destroyComponent()">Destroy</button>
      <div #entry></div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  component: ComponentRef<AuthFormComponent>;

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor() {}

  ngAfterViewInit() {
    // using AfterViewInit b/c ViewChild is not available at AfterContentInit
    this.component = this.entry.createComponent(AuthFormComponent);
    // console.log(component);
    this.component.instance.title = 'Create account';
    this.component.instance.submitted.subscribe(this.loginUser); // subscribes to changes in dynamic output
    this.component.changeDetectorRef.detectChanges();
  }

  destroyComponent() {
    // destroys dynamically created component
    this.component.destroy();
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
