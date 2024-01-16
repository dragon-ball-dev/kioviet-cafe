package com.ecommerce.backend.repository;


import com.ecommerce.backend.domain.models.Message;
import com.ecommerce.backend.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    Message findBySenderAndReceiver(User sender, User receiver);

    List<Message> findBySender(User sender);

    List<Message> findByReceiver(User receiver);

}
