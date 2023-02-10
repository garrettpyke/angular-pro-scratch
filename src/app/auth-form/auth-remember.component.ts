import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'auth-remember',
  template: `
    <label>
      <input
        type="checkbox"
        [checked]="isChecked"
        (change)="onChecked(isChecked)"
      />
      Keep me logged in
    </label>
  `,
})
export class AuthRememberComponent {
  isChecked: boolean;

  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChecked(value: boolean) {
    // Unconventional but original materials don't work
    this.isChecked = !this.isChecked;
    this.checked.emit(this.isChecked);
  }
}
