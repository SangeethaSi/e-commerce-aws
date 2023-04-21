package com.shoppingapp.cogjava2915.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.shoppingapp.cogjava2915.model.UserDetails;

@Repository
public interface UserDetailsRepository extends MongoRepository<UserDetails, Integer>{

	@Query("{_id:?0}")
	Optional<UserDetails> getUser(String emailId);

}
