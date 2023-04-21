package com.shoppingapp.cogjava2915.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.shoppingapp.cogjava2915.model.ProductDetails;

public interface ProductDetailsRepository extends MongoRepository<ProductDetails, Integer>{

	@Query("{productName: {$regex:?0} }")
	Optional<List<ProductDetails>> getProductByName (String productName);
}
