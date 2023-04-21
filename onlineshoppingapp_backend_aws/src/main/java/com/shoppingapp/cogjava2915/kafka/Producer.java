package com.shoppingapp.cogjava2915.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class Producer {

   private static final String TOPIC = "Shoppingapp";
   @Autowired
   private KafkaTemplate<String, Object> kafkaTemplate;
   
   public void sendMessageToUpdateStatus(String productDetailsMessage) {
	   this.kafkaTemplate.send(TOPIC, productDetailsMessage);
   }
   
}
