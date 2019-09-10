import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  contactUsFormGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.contactUsFormGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: ['', [Validators.required, Validators.email]],
      message: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.contactUsFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactUsFormGroup.invalid) {
      return;
    }
    console.log('Contact forma: ', this.contactUsFormGroup.getRawValue());
  }

}
