package ru.itis.javalab.models;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@EqualsAndHashCode
public class WebClientModel {
    private UUID springId;
    private UUID issueId;
    private String issueName;
    private String status;
    private String projectName;
    private double estimatedDueTimeInHours;
    private double totalSpentTimeInHours;
}
