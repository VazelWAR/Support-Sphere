package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.SupportAgent;

@Repository
public interface SupportAgentRepo extends JpaRepository<SupportAgent,Long>{

}
