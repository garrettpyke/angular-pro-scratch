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
      <ng-container
        [ngTemplateOutlet]="tmpl"
        [ngTemplateOutletContext]="ctxt"
      ></ng-container>
      <ng-template #tmpl let-name let-location="location">
        {{ name }} : {{ location }}
      </ng-template>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ctxt = {
    $implicit: 'Pyke Garrett',
    location: 'USA, Utah',
  };
}
