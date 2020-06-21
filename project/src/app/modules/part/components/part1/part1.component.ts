import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartService } from '../../../../services/part.service';
import { IProduct } from '../../../../interfaces/IProduct';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {

  private productId: number;

  @Input('title') title: string;
  @Input('item') set setItem(item: IProduct) {
    if (!item) return;
    this.productId = item.productId;
    this.form.get('productName').setValue(item.productName);
    this.form.get('productAmount').setValue(item.productAmount);
    this.form.get('productPrice').setValue(item.productPrice);
  }
  @Output('close') close = new EventEmitter();

  /** create form data */
  form: FormGroup;

  constructor(private builder: FormBuilder, private service: PartService) {
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
    if (this.productId) {
      this.service.updateItem(this.productId, this.form.value).subscribe(
        // หากว่าสำเร็จ
        res => {
          this.form.reset();
          this.form.get('productAmount').setValue(0);
          this.form.get('productPrice').setValue(0);
          this.productId = null;
          document.getElementById('product-name').focus();
          // this.close.emit();
        },
        // หากว่าล้มเหลว
        err => {
          alert(err.message);
        });
    }
    else {
      this.service.addItem(this.form.value).subscribe(
        // หากว่าสำเร็จ
        res => {
          this.form.reset();
          this.form.get('productAmount').setValue(0);
          this.form.get('productPrice').setValue(0);
          this.productId = null;
          document.getElementById('product-name').focus();
          // this.close.emit();
        },
        // หากว่าล้มเหลว
        err => {
          alert(err.message);
        });
    }
  }

}
