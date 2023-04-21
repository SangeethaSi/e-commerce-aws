import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDetails } from '../model/ProductDetails';
import { ProductDetailsService } from '../services/product-service/product-details.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductDetailsForm!: FormGroup;
  submitted = false;
  existingProductDetails: ProductDetails = {};
  isProductName = false;

  constructor(private fb: FormBuilder, private productDetailsService: ProductDetailsService,
    private router: Router) { }

  ngOnInit(): void {
    this.productDetailsService.getProductDetails().subscribe(productData => {
      console.log("Update Data", productData);
      if (productData.productName) {
        this.isProductName = true;
      }
      this.existingProductDetails = productData
    });
    this.setUpdateProductForm();
  }

  setUpdateProductForm() {
    this.updateProductDetailsForm = this.fb.group({
      productName: [this.existingProductDetails.productName, Validators.required],
      price: [this.existingProductDetails.price, Validators.required],
      productQuantity: [this.existingProductDetails.productQuantity, Validators.required],
      productStatus: [this.existingProductDetails.productStatus, Validators.required],
      productDescription: [this.existingProductDetails.productDescription, Validators.required],
      features: [this.existingProductDetails.features, Validators.required],
      productImageUrl: [this.existingProductDetails.productImageUrl, Validators.required]
    })
  }

  onUpdateProduct() {
    this.submitted = true;
    if (this.updateProductDetailsForm.valid) {
        let toBeUpdatedProduct = {
          productId: this.existingProductDetails.productId,
          productName: this.updateProductDetailsForm.controls["productName"].value,
          price: this.updateProductDetailsForm.controls["price"].value,
          productQuantity: this.updateProductDetailsForm.controls["productQuantity"].value,
          productStatus: this.updateProductDetailsForm.controls["productStatus"].value,
          productDescription: this.updateProductDetailsForm.controls["productDescription"].value,
          features: this.updateProductDetailsForm.controls["features"].value,
          productImageUrl: this.updateProductDetailsForm.controls["productImageUrl"].value
        }
        this.productDetailsService.updateProductDetails(toBeUpdatedProduct).subscribe(updatedProduct => {
          console.log("Updated record in DB", updatedProduct);
          window.alert("Product Updated Successfully")
          this.router.navigate(['/display-products'])
        });
    }
  }

  onResetUpdateProduct() {
    this.router.navigate(['/display-products'])
  }

}
