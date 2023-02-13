import {
  AfterViewChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  DoCheck,
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

  constructor(
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    const authFormFactory =
      this.resolver.resolveComponentFactory(AuthFormComponent);
    const component = this.entry.createComponent(authFormFactory);
    this.cd.detectChanges();
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
