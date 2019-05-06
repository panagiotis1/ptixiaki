
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenOptionValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenOption': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appForbiddenOption]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenOption') forbiddenOption: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.forbiddenOption ? forbiddenOptionValidator(new RegExp(this.forbiddenOption, 'i'))(control)
                              : null;
  }
}