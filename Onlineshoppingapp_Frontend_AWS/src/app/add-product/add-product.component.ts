import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDetails } from '../model/ProductDetails';
import { ProductDetailsService } from '../services/product-service/product-details.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addNewProductForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private productDetailsService: ProductDetailsService,
    private route: Router) { }

  ngOnInit(): void {
    this.setNewProductForm();
  }

  setNewProductForm() {
    this.addNewProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      productStatus: ['', Validators.required],
      productDescription: ['', Validators.required],
      features: ['', Validators.required],
      productImageUrl: ['', Validators.required]
    })
  }

  onAddNewProduct() {
    this.submitted = true;
    if (this.addNewProductForm.valid) {
        let productRequest: ProductDetails = {};
        productRequest.features = this.addNewProductForm.controls['features'].value;
        productRequest.price = this.addNewProductForm.controls['price'].value;
        productRequest.productDescription =  this.addNewProductForm.controls['productDescription'].value;
        productRequest.productImageUrl =  this.addNewProductForm.controls['productImageUrl'].value;
        productRequest.productName = this.addNewProductForm.controls['productName'].value;
        productRequest.productStatus = this.addNewProductForm.controls['productStatus'].value;
        this.productDetailsService.addNewProduct(productRequest).subscribe(data=> {
          console.log(data);
          window.alert("Product Added Successfully")
          this.route.navigate(['/display-products']);
        })      
    }
  }

  onResetProductForm() {
    this.submitted = false;
    Object.keys(this.addNewProductForm.controls).forEach(keys=> {
      this.addNewProductForm.controls[keys].setErrors(null);
    });
    this.setNewProductForm();
  }

  onGoBack() {
    this.route.navigate(['/display-products'])
  }
}
