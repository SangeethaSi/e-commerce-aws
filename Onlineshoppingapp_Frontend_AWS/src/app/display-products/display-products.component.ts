import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDetails } from '../model/ProductDetails';
import { ProductDetailsService } from '../services/product-service/product-details.service';
import { UserRegistrationService } from '../services/user-service/user-registration.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  productList: Array<ProductDetails> = [];
  isProductsNotPresent: boolean = false;
  searchForm!: FormGroup;
  submitted = false;
  isUserAdmin = false;

  constructor(private productDetailsService: ProductDetailsService, 
    private fb: FormBuilder, private userRegistrationService: UserRegistrationService,
    private route: Router) {
      this.isUserAdmin = this.userRegistrationService.isUserAdmin;
     }

  ngOnInit(): void {
    this.isUserAdmin = localStorage.getItem('IsUserAdmin') === "true";
    this.isProductsNotPresent = false;
    this.productDetailsService.getAllProducts().subscribe(productDetailsResp => {     
      console.log('All Products', productDetailsResp)
      if (productDetailsResp.length) {
        this.productList = productDetailsResp;
      } else {
        console.log("Products not present");
        this.isProductsNotPresent = true;
      }
    });
    this.setSearchForm();
  }

  setSearchForm() {
     this.searchForm = this.fb.group({
       searchProductText: ['', Validators.required]
     })
  }

  onProductSearch() {
    this.submitted = true;
    this.isProductsNotPresent = false;
    if (this.searchForm.valid) {
      this.productDetailsService.getProductsByName(this.searchForm.controls['searchProductText'].value).subscribe(productResp => {
        if (productResp.length) {
          this.productList = productResp;
        } else {
          console.log("Products not present");
          this.isProductsNotPresent = true;
        }
      });
    }    
  }

  onResetSearch() {
    this.searchForm.reset();
    this.searchForm.controls['searchProductText'].setErrors(null);
    this.submitted = false
    this.setSearchForm();
    window.location.reload();
  }

  onAddProductClick() {
    this.route.navigate(['/add-product'])
  }

  onProductUpdateClick(product: ProductDetails) {
    console.log("Update Product", product);
    this.productDetailsService.setProductDetails(product);
    this.route.navigate(['/update-product']);
  }

  onProductDeleteClick(product: ProductDetails) {
    this.productDetailsService.deleteProduct(product).subscribe(data => {
      console.log("Product Deleted", data);     
    });
    window.location.reload();
  }
}
