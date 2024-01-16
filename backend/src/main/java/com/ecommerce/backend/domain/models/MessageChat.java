package com.ecommerce.backend.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageChat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String content;
	
	private Date sentAt;
 
	@Column(name = "is_read")
	private Boolean read;
	
	@Column(name = "send_by")
	private Boolean sendBy;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	private Message message;

}
