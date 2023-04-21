package com.shoppingapp.cogjava2915;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.shoppingapp.cogjava2915.model.ProductDetails;
import com.shoppingapp.cogjava2915.model.UserDetails;
import com.shoppingapp.cogjava2915.repository.ProductDetailsRepository;
import com.shoppingapp.cogjava2915.repository.UserDetailsRepository;
import com.shoppingapp.cogjava2915.service.ShoppingappService;

@RunWith(SpringRunner.class)
@SpringBootTest
class ShoppingappApplicationTests {

	@Test
	void contextLoads() {
	}
	
	@Autowired
	private ShoppingappService shoppingappService;
	
	@MockBean
	private UserDetailsRepository userDetailsRepository;
	
	@MockBean
	private ProductDetailsRepository productDetailsRepository;
	
	@Test
	public void foo() {

	}
	
	@Test
	public void registerNewUserTest() {
		UserDetails newUserDetailsExpected = new UserDetails("Shoppingapptest@gmail.com", "26578451", "Shopping", "app", "pass123", "8454333245");		
		Mockito.when(this.userDetailsRepository.save(newUserDetailsExpected)).thenReturn(newUserDetailsExpected);
		assertEquals(newUserDetailsExpected, this.shoppingappService.registerNewUser(newUserDetailsExpected));
	}
	
	@Test
	public void loginUserTest() {
		UserDetails userDetailsExpected = new UserDetails("Shoppingapptest@gmail.com", "26578451", "Shopping", "app", "pass123", "8454333245");
		Mockito.when(this.userDetailsRepository.getUser("Shoppingapptest@gmail.com")).thenReturn(Optional.of(userDetailsExpected));
		assertEquals(userDetailsExpected, this.shoppingappService.validateUser(userDetailsExpected));
	}
	
	@Test
	public void resetPasswordTest() {
		UserDetails resetUserDetailsExpected = new UserDetails("Shoppingapptest@gmail.com", "26578451", "Shopping", "app", "pass456", "8454333245");
		Mockito.when(this.userDetailsRepository.getUser("Shoppingapptest@gmail.com")).thenReturn(Optional.of(resetUserDetailsExpected));
		Mockito.when(this.userDetailsRepository.save(resetUserDetailsExpected)).thenReturn(resetUserDetailsExpected);
		assertEquals(resetUserDetailsExpected, this.shoppingappService.resetUserPassword(resetUserDetailsExpected, "Shoppingapptest@gmail.com"));
	}
	
	@Test
	public void getAllProductsList() {
		List<ProductDetails> productDetailsListExpected = new ArrayList<>();
		productDetailsListExpected.add(new ProductDetails(1234, "Shampoo", "For smooth hair", "$2", "No itching and side effect", "HURRY UP TO PURCHASE"));
		Mockito.when(this.productDetailsRepository.findAll()).thenReturn(productDetailsListExpected);
		assertEquals(productDetailsListExpected, this.shoppingappService.getAllProducts());
	}
	
	@Test
	public void addNewProductTest() {
		ProductDetails newProductDetailsExpected = new ProductDetails(1234, "Shampoo", "For smooth hair", "$2", "No itching and side effect", "HURRY UP TO PURCHASE");
		Mockito.when(this.productDetailsRepository.save(newProductDetailsExpected)).thenReturn(newProductDetailsExpected);
		assertEquals(newProductDetailsExpected, this.shoppingappService.addNewProduct(newProductDetailsExpected));
	}
	
	@Test
	public void updateProductTest() {
		ProductDetails updatedProductDetailsExpected = new ProductDetails(1234, "Shampoo", "For smooth hair", "$2", "No itching and side effect", "HURRY UP TO PURCHASE");
		Mockito.when(this.productDetailsRepository.findById(1234)).thenReturn(Optional.of(updatedProductDetailsExpected));
		Mockito.when(this.productDetailsRepository.save(updatedProductDetailsExpected)).thenReturn(updatedProductDetailsExpected);
		assertEquals(updatedProductDetailsExpected, this.shoppingappService.updateProductStatus(updatedProductDetailsExpected));
	}

}
