import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDetails } from 'src/app/model/ProductDetails';
import { HttpUtil } from 'src/app/utils/http-util';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private productDetails = new BehaviorSubject<ProductDetails>({});
  constructor(private httpUtil: HttpUtil) { }

  addNewProduct(newProductRequest: ProductDetails): Observable<ProductDetails> {
    return this.httpUtil.addNewProductToDatabase(newProductRequest);
  }

  getAllProducts(): Observable<any> {
    return this.httpUtil.getAllProductsFromDatabase();
  }

  getProductsByName(productSearchText: string): Observable<any> {
    return this.httpUtil.getProductsByNameFromDatabase(productSearchText);
  }

  deleteProduct(product: ProductDetails):Observable<ProductDetails> {
    return this.httpUtil.deleteProductFromDatabase(product);
  }

  setProductDetails(product: ProductDetails) {
    this.productDetails.next(product);
  }

  getProductDetails() {
    return this.productDetails.asObservable();
  }

  updateProductDetails(product: ProductDetails): Observable<ProductDetails> {
    return this.httpUtil.updateProductInDatabase(product);
  }
}
