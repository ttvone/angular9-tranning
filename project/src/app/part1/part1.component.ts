import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
      productName: [],
      productAmount: [0],
      productPrice: [0]
    });
  }

  ngOnInit(): void {
  }

  /** for submit form */
  onSubmit() {
    console.log(this.form.value);
  }

}
