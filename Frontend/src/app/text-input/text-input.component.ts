import {Component, Input} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'text-input',
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class FormTextInputComponent implements ControlValueAccessor {
  // @Input({required: true}) public formControl!: FormControl<string | null>;
  @Input({required: true}) placeholder!: string;
  @Input({required: true}) id!: string;
  @Input({required: true}) ariaLabel!: string;

  protected value: string = '';
  protected isDisabled: boolean = false;

  protected onChange!: (value: string) => void;
  protected onTouched!: () => void;

  protected get IsInvalid(): boolean {
    // const isInvalid: boolean = this.formControl.invalid;
    // if (!isInvalid) {
    //   return false;
    // }
    //
    // const isDirty: boolean = this.formControl.dirty;
    // const isTouched: boolean = this.formControl.touched;
    // return isDirty || isTouched;
    return false;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  protected onInput(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = input.value;

    this.value = value;
    this.onChange(value);
  }
}
