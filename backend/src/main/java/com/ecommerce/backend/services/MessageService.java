package com.ecommerce.backend.services;

public interface MessageService {
	
	void Producer(String senderName, String receiverName);
	
	void Consumer(String senderName, String receiverName);
	

}
