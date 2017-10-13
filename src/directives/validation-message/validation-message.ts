import { Input, Directive, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[validationMessage]' 
})
export class ValidationMessageDirective {

  @Input() validationMessage:FormControl;
  @Input() className:string;
  
  constructor(private el: ElementRef, private r: Renderer2) {
    this.className = this.className || 'hide';
  }

  ngOnInit() {
    if(typeof this.validationMessage === 'undefined') {
      this.r.addClass(this.el.nativeElement, this.className);
      return;
    }
    this.update();
    this.validationMessage.statusChanges.subscribe(v => {
      this.update();
    });
  }

  update() {
    if(!this.validationMessage.touched || this.validationMessage.valid) {
      this.r.addClass(this.el.nativeElement, this.className);
    } else {
      this.r.removeClass(this.el.nativeElement, this.className);
    }
  }

}
