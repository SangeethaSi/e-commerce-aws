package com.shoppingapp.cogjava2915.controller;

import java.util.List;

import javax.validation.Valid;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shoppingapp.cogjava2915.kafka.Producer;
import com.shoppingapp.cogjava2915.model.ProductDetails;
import com.shoppingapp.cogjava2915.model.UserDetails;
import com.shoppingapp.cogjava2915.service.ShoppingappService;

@RestController
@RequestMapping({"/", "api/v1.0/shopping"})
public class ShoppingappController {

	private ShoppingappService shoppingappService;
	private Producer producer;
	
    ShoppingappController() {
		
	}

	@Autowired
	ShoppingappController(ShoppingappService shoppingappService, Producer producer) {
		this.shoppingappService = shoppingappService;
		this.producer = producer;
	}
	
	
	// Register New User
	@PostMapping("/register")
	@CrossOrigin
	public ResponseEntity<UserDetails> registerNewUser(@RequestBody UserDetails newUserRegisterReq) {
		System.out.print("Entered");
		return new ResponseEntity<>(this.shoppingappService.registerNewUser(newUserRegisterReq), HttpStatus.CREATED);
	}
	
	// Login User
	@PostMapping("/login")
	@CrossOrigin
	public ResponseEntity<UserDetails> loginUser(@RequestBody UserDetails loginReq) {
		return new ResponseEntity<>(this.shoppingappService.validateUser(loginReq), HttpStatus.OK);
	}
	
	// Reset user password
	@PutMapping("/{customerName}/forgot")
	@CrossOrigin
	public ResponseEntity<UserDetails> resetPassword(@RequestBody UserDetails passwordResetReq, @PathVariable String customerName) {
		return new ResponseEntity<>(this.shoppingappService.resetUserPassword(passwordResetReq, customerName), HttpStatus.OK);
	}
	
	// View all Products 
//	@GetMapping("/all")
	@GetMapping({"/", "all"})
	@CrossOrigin
	public ResponseEntity<List<ProductDetails>> getAllProducts() {
		return new ResponseEntity<>(this.shoppingappService.getAllProducts(), HttpStatus.OK);
	}
	
	// Search by Product name 
	@GetMapping("/products/search/{productname}")
	@CrossOrigin
	public ResponseEntity<List<ProductDetails>> searchByProductName(@PathVariable String productname) {
		return new ResponseEntity<>(this.shoppingappService.getProductDetailsByName(productname), HttpStatus.OK);
	}
	
	// Add Product
	@PostMapping("/{productname}/add")
	@CrossOrigin
	public ResponseEntity<ProductDetails> addNewProduct(@Valid @RequestBody ProductDetails newProductRequest, @PathVariable String productname) {
		return new ResponseEntity<>(this.shoppingappService.addNewProduct(newProductRequest), HttpStatus.CREATED);
	}
	
	// Update Product status - Kafka	
	@PutMapping("/{productname}/update/{id}")
	@CrossOrigin
	public ResponseEntity<String> updateProduct(@Valid @RequestBody ProductDetails updateProductRequest, 
			@PathVariable String productname, @PathVariable int id) {
		ObjectMapper objMapper = new ObjectMapper();
		String productDetailsMsg = null;
		JSONObject responseObj = new JSONObject();
		responseObj.put("StatusMessage", "Product Status Updated");
		responseObj.put("Status", "Success");
		updateProductRequest.setProductId(id);
		try {
			productDetailsMsg = objMapper.writeValueAsString(updateProductRequest);
			this.producer.sendMessageToUpdateStatus(productDetailsMsg);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}		
		return new ResponseEntity<>(responseObj.toString(), HttpStatus.OK);
	}
	
	// Delete Product 
	@DeleteMapping("/{productname}/delete/{id}")
	@CrossOrigin
	public void deleteProduct(@PathVariable String productname, @PathVariable int id) {
		this.shoppingappService.deleteProduct(id);
	}
}
