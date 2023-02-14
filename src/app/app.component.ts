import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ChangeDetectorRef,
} from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component'; // importing b/c now injecting dynamically

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="destroyComponent()">Destroy</button>
      <button (click)="moveComponent()">Move</button>
      <div #entry></div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  component: ComponentRef<AuthFormComponent>;

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // using AfterViewInit b/c ViewChild is not available at AfterContentInit
    this.entry.createComponent(AuthFormComponent);
    this.component = this.entry.createComponent(AuthFormComponent, {
      index: 0,
    }); // index now displays this component first
    this.component.instance.title = 'Create account';
    this.component.instance.submitted.subscribe(this.loginUser); // subscribes to changes in dynamic output

    this.cd.detectChanges();
  }

  destroyComponent() {
    // destroys dynamically created component
    this.component.destroy();
  }

  moveComponent() {
    this.entry.move(this.component.hostView, 1);
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
