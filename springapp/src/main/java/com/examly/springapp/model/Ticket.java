package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long ticketId;

    @Column
    private String title;

    @Column
    private String description;
    
    @Column
    private String priority;
    @Column
    private String status="Open";
    @Column
    private LocalDate createdDate;
    @Column(nullable = true)
    private LocalDate resolutionDate;
    @Column
    private String issueCategory;
    @Column(nullable = true)
    private String resolutionSummary;
    @Column(nullable = true)
    private boolean satisfied;
    
    @ManyToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="agent_id",nullable = true)
    private SupportAgent supportAgent;
}
