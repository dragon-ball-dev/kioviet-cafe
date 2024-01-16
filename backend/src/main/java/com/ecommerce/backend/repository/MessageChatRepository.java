package com.ecommerce.backend.repository;


import com.ecommerce.backend.domain.models.MessageChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageChatRepository extends JpaRepository<MessageChat, Long> {
}
