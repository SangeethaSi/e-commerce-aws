package com.shoppingapp.cogjava2915.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.shoppingapp.cogjava2915.model.DatabaseSequence;
import com.shoppingapp.cogjava2915.model.ProductDetails;
import com.shoppingapp.cogjava2915.model.UserDetails;
import com.shoppingapp.cogjava2915.repository.ProductDetailsRepository;
import com.shoppingapp.cogjava2915.repository.UserDetailsRepository;

import io.micrometer.common.util.StringUtils;

@Service
public class ShoppingappService {

	private UserDetailsRepository userDetailsRepository;
	private ProductDetailsRepository productDetailsRepository;
	private MongoTemplate mongoTemplate;
	private MongoOperations mongoOperations;
	
	ShoppingappService() {
		
	}
	
	@Autowired
	ShoppingappService(UserDetailsRepository userDetailsRepository, ProductDetailsRepository productDetailsRepository, 
			MongoTemplate mongoTemplate, MongoOperations mongoOperations) {
		this.userDetailsRepository = userDetailsRepository;
		this.productDetailsRepository = productDetailsRepository;
		this.mongoTemplate = mongoTemplate;
		this.mongoOperations = mongoOperations;
	}
	
	public UserDetails registerNewUser(UserDetails userDetailsRequest) {
		return this.userDetailsRepository.save(userDetailsRequest);
	}
	
	public UserDetails validateUser(UserDetails loginRequest) {
		Optional<UserDetails> userRec = this.userDetailsRepository.getUser(loginRequest.getEmail());
		if (userRec.isPresent()) {
			return userRec.get();
		}
		return new UserDetails();
	}
	
	public UserDetails resetUserPassword(UserDetails resetRequest, String customerName) {
		Optional<UserDetails> userRec = this.userDetailsRepository.getUser(customerName);
		if (userRec.isPresent()) {
			return this.userDetailsRepository.save(resetRequest);
			
		}
		return new UserDetails();		
	}
	
	// Products
	public List<ProductDetails> getAllProducts() {
		return this.productDetailsRepository.findAll();
	}
	
	public ProductDetails addNewProduct(ProductDetails addNewProduct) {
		addNewProduct.setProductId((int)generateSequence(ProductDetails.SEQUENCE_NAME));
		if (StringUtils.isBlank(addNewProduct.getProductQuantity()) || StringUtils.isEmpty(addNewProduct.getProductQuantity()) )
			addNewProduct.setProductQuantity("10");
		return this.productDetailsRepository.save(addNewProduct);
	}
	
	public ProductDetails updateProductStatus(ProductDetails updateProductRequest) {
		// DB record 
		Optional<ProductDetails> productDetails = this.productDetailsRepository.findById(updateProductRequest.getProductId());
		
		if (productDetails.isPresent()) {
			if ((!StringUtils.isBlank(updateProductRequest.getProductQuantity())
					&& !StringUtils.isEmpty(updateProductRequest.getProductQuantity())
					&& !updateProductRequest.getProductQuantity().equals("0"))) {
				updateProductRequest.setProductStatus("HURRY UP TO PURCHASE");	
				
			} else if ((!StringUtils.isBlank(productDetails.get().getProductQuantity())
					&& !StringUtils.isEmpty(productDetails.get().getProductQuantity())
					&& productDetails.get().getProductQuantity().equals("0")) || 
					
					(!StringUtils.isBlank(updateProductRequest.getProductQuantity())
					&& !StringUtils.isEmpty(updateProductRequest.getProductQuantity())
					&& updateProductRequest.getProductQuantity().equals("0"))) {
				updateProductRequest.setProductStatus("OUT OF STOCK");
				
			}
			
		}
		return this.productDetailsRepository.save(updateProductRequest);
	}
	
	public List<ProductDetails> getProductDetailsByName(String productname) {
		Query searchQuery = new Query();
		searchQuery.addCriteria(Criteria.where("productName").regex(productname, "i"));
		return this.mongoTemplate.find(searchQuery, ProductDetails.class);
	}
	
	public void deleteProduct(int productId) {
		this.productDetailsRepository.deleteById(productId); 
	}
	
// Generate Mongo DB sequence
	public long generateSequence(String seqName) {
		DatabaseSequence counter = this.mongoOperations.findAndModify(query(where("_id").is(seqName)), new Update().inc("seq",1), 
          options().returnNew(true).upsert(true), DatabaseSequence.class);
		return !Objects.isNull(counter) ? counter.getSeq() : 1;
	}
}
