package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.Ticket;
import com.examly.springapp.service.TicketService;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    @Autowired
    TicketService tService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){
        Ticket t = tService.addTicket(ticket);
        if (t!=null) {
            return ResponseEntity.status(201).body(t);
        } else {
            return ResponseEntity.status(409).build();
        }
    }

    @GetMapping("/{ticketId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long ticketId){
        Ticket t = tService.getTicketById(ticketId);
        if (t!=null) {
            return ResponseEntity.status(200).body(t);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'CLIENT')")
    public ResponseEntity<List<Ticket>> getAllTickets(){
        List<Ticket> tList = tService.getAllTickets();
        if (tList.isEmpty()) {
            return ResponseEntity.status(400).build();
        } else {
            return ResponseEntity.status(200).body(tList);
        }
    }

    @PutMapping("/{ticketId}")
    @PreAuthorize("hasAnyRole('MANAGER', 'CLIENT')")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long ticketId, @RequestBody Ticket ticket){
        Ticket t = tService.updateTicket(ticketId, ticket);
        if (t!=null) {
            return ResponseEntity.status(200).body(t);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @DeleteMapping("/{ticketId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Ticket> deleteTicket(@PathVariable Long ticketId){
        Ticket t = tService.deleteTicket(ticketId);
        if (t!=null) {
            return ResponseEntity.status(200).body(t);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/agent/{agentId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<Ticket>> getTicketsByAgentId(@PathVariable Long agentId){
        List<Ticket> tList = tService.getTicketsByAgentId(agentId);
        if (tList.isEmpty()) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(200).body(tList);
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<Ticket>> getTicketsByUserId(@PathVariable Long userId){
        List<Ticket> tList = tService.getTicketsByUserId(userId);
        if (tList.isEmpty()) {
            return ResponseEntity.status(404).build();
        } else {
            return ResponseEntity.status(200).body(tList);
        }
    }
}

