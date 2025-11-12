package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Ticket;

@Repository
public interface TicketRepo extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUserUserId(long userId);

    List<Ticket> findBySupportAgentAgentId(long agentId);

}
