import { Input, Directive, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[validationMessage]' 
})
export class ValidationMessageDirective {

  @Input() validationMessage:FormControl;

  constructor(private el: ElementRef, private r: Renderer2) {
  }

  ngOnInit() {
    if(typeof this.validationMessage === 'undefined') {
      this.r.setAttribute(this.el.nativeElement, 'hidden', '');
      return;
    }
    this.update();
    this.validationMessage.valueChanges.subscribe(v => {
      this.update();
    });
  }

  update() {
    if(!this.validationMessage.touched || this.validationMessage.valid) {
      this.r.setAttribute(this.el.nativeElement, 'hidden', '');
    } else {
      this.r.removeAttribute(this.el.nativeElement, 'hidden');
    }
  }

}
