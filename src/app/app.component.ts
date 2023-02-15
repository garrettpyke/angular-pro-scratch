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
      <ng-template #tmpl let-potato let-location="location">
        {{ potato }} : {{ location }}
      </ng-template>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  component: ComponentRef<AuthFormComponent>;

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  @ViewChild('tmpl') tmpl: TemplateRef<any>;

  constructor() {}

  ngAfterViewInit() {
    //* using AfterViewInit b/c ViewChild is not available at AfterContentInit
    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Pyke Garrett', // note that the variable only line 21/22 isn't defined the way location is
      location: 'USA, Utah',
    });

    this.entry.get(0).detectChanges();
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
