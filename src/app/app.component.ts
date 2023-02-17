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
      <ng-container [ngTemplateOutlet]="tmpl"> </ng-container>
      <ng-template #tmpl> Garrett Pyke : Utah, USA </ng-template>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
