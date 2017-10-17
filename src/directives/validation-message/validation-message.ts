import { Input, Directive, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[validationMessage]' 
})
export class ValidationMessageDirective {

  @Input() validationMessage:FormControl;
  @Input() className:string;

  @Input() set checked(value: boolean) {
    if(value) {
      if(this.validationMessage.valid) {
        this.r.addClass(this.el.nativeElement, this.className);
      } else {
        this.r.removeClass(this.el.nativeElement, this.className);
      }
    } else {
      this.r.addClass(this.el.nativeElement, this.className);
    }
  }

  constructor(private el: ElementRef, private r: Renderer2) {
    this.className = this.className || 'hide';
  }

}
