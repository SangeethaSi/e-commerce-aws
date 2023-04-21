package com.shoppingapp.cogjava2915.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shoppingapp.cogjava2915.model.ProductDetails;
import com.shoppingapp.cogjava2915.service.ShoppingappService;

@Component
public class Consumer {

	private ShoppingappService shoppingappService;
	
	@Autowired
	Consumer(ShoppingappService shoppingappService) {
		this.shoppingappService = shoppingappService;
	}
	@KafkaListener(topics = "Shoppingapp", groupId = "shoppingapp")
	public void consumerMessage(String productDetailsMesg) {
		try {
			this.shoppingappService.updateProductStatus(new ObjectMapper().readValue(productDetailsMesg, ProductDetails.class));
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
}
