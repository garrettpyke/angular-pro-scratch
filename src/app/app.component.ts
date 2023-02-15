import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component'; // importing b/c now injecting dynamically

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div #entry></div>
      <ng-template #tmpl> Garrett Pyke : Utah, USA </ng-template>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  component: ComponentRef<AuthFormComponent>;

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  @ViewChild('tmpl') tmpl: TemplateRef<any>;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    //* using AfterViewInit b/c ViewChild is not available at AfterContentInit
    // this.component = this.entry.createComponent(AuthFormComponent, {
    // index: 0,
    // }); // index now displays this component first
    // this.component.instance.title = 'Create account';
    // this.component.instance.submitted.subscribe(this.loginUser); // subscribes to changes in dynamic output
    // this.component.changeDetectorRef.detectChanges();

    this.entry.createEmbeddedView(this.tmpl);
  }

  destroyComponent() {
    // destroys dynamically created component
    this.component.destroy();
  }

  moveComponent() {
    this.entry.move(this.component.hostView, 1); // set index to 1
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
