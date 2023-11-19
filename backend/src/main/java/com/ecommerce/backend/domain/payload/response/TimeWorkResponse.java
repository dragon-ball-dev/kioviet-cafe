package com.ecommerce.backend.domain.payload.response;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class TimeWorkResponse {
    private Long employeesId;
    private String nameEmployees;
    private String timeToStart;

    public TimeWorkResponse(Long employeesId, String nameEmployees, String timeToStart) {
        this.employeesId = employeesId;
        this.nameEmployees = nameEmployees;
        this.timeToStart = timeToStart;
    }
}
