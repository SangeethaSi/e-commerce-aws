import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductDetails } from "../model/ProductDetails";
import { UserDetails } from "../model/UserDetails";

@Injectable({
    providedIn: 'root'
})
export class HttpUtil {
    baseUrl = "http://sangeethasigamanionlineshoppingapp-env.eba-pvb7p8rq.us-east-1.elasticbeanstalk.com/api/v1.0/shopping";
    
    constructor(private http: HttpClient) {
    }

    saveDetailsToDatabase(registerRequestJson: any): Observable<UserDetails> {
        return this.http.post('http://sangeethasigamanionlineshoppingapp-env.eba-pvb7p8rq.us-east-1.elasticbeanstalk.com/api/v1.0/shopping/register', registerRequestJson);
    }

    getUserDetailsFromDatabase(loginRequestJson: any): Observable<UserDetails> {
        return this.http.post('http://sangeethasigamanionlineshoppingapp-env.eba-pvb7p8rq.us-east-1.elasticbeanstalk.com/api/v1.0/shopping/login', loginRequestJson);
    }

    addNewProductToDatabase(newProductRequest: ProductDetails): Observable<ProductDetails> {
        return this.http.post(this.baseUrl + '/' + newProductRequest.productName +'/add', newProductRequest);
    }

    getAllProductsFromDatabase(): Observable<ProductDetails> {
        return this.http.get(this.baseUrl + '/all');
    }

    getProductsByNameFromDatabase(productSearchText: string): Observable<ProductDetails> {
        return this.http.get(this.baseUrl + '/products/search/'+ productSearchText);
    } 
    
    deleteProductFromDatabase(product: ProductDetails): Observable<ProductDetails> {
        return this.http.delete(this.baseUrl + '/' + product.productName + '/delete/' + product.productId);
    }

    updateProductInDatabase(product: ProductDetails): Observable<ProductDetails>  {
        console.log("Http request", product);
        return this.http.put(this.baseUrl + '/' + product.productName + '/update/' + product.productId, product);
    }

    resetPasswordInDatabase(resetPasswordDetails: UserDetails): Observable<UserDetails> {
        return this.http.put(this.baseUrl + '/' + resetPasswordDetails.email + '/'+ 'forgot', resetPasswordDetails);
    }
}