import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Product } from '../shared/interfaces/product/product';
import { Department } from '../shared/interfaces/department/department';
import { ProductService } from '../shared/services/product/product.service';
import { DepartmentService } from '../shared/services/department/department.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    description: [, [Validators.required, Validators.minLength(10)]],
    departments:[[], [Validators.required]]
  });

  @ViewChild('form') form: NgForm;

  products: Product[] = [];
  departments: Department[] = [];

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.productService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prods) => this.products = prods);
    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.departments = deps);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  save(){
    let data = this.productForm.value;
    if (data._id != null) {
      this.productService.update(data)
        .subscribe(
          (p)=> this.notify("Updated!")
        );
    }
    else {
      this.productService.add(data)
        .subscribe(
          (p) => this.notify("Inserted!!")
        );
    }
    this.resetForm();
  }

  delete(p: Product) {
    this.productService.del(p)
      .subscribe(
        () => this.notify("Deleted!"),
        (err) => console.log(err)
      )
  }

  edit(p: Product) {
    this.productForm.setValue(p);
  }

  notify(msg: string) {
    this.snackbar.open(msg, "OK", {duration: 3000});
  }

  resetForm() {
    this.form.resetForm();
  }
}
