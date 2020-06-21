import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {

  @Input('title') title: string;

  /** create form data */
  form: FormGroup;

  constructor(private builder: FormBuilder) {
    /** create default form data */
    this.form = this.builder.group({
      productName: ['', [
        Validators.required,
        Validators.maxLength(10)
      ]],
      productAmount: [0, [
        Validators.required,
        Validators.min(1)
      ]],
      productPrice: [0, [
        Validators.required,
        Validators.min(1)
      ]]
    });
  }

  ngOnInit(): void {
  }

  /** for submit form */
  onSubmit() {
    if (this.form.invalid) return this.form.markAllAsTouched();
    console.log(this.form.value);
  }

}
