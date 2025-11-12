package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SupportAgent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long agentId;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String phone;
    @Column
    private String expertise;
    @Column
    private String experience;
    @Column
    private String status;
    @Column
    private LocalDate addedDate;
    @Lob
    @Column(nullable = true)
    private String profile;
    @Column
    private String shiftTiming;
    @Column
    private String remarks;
}
