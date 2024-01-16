package com.ecommerce.backend.domain.payload.DTO;


import com.ecommerce.backend.domain.payload.response.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

	private String content;
	private Double rateRating;
	private Long room_id;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private UserResponse user;
}
