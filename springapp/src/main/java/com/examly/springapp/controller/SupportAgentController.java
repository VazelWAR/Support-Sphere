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

import com.examly.springapp.exceptions.DuplicateAgentException;
import com.examly.springapp.model.SupportAgent;
import com.examly.springapp.service.SupportAgentServiceImpl;

@RestController
@RequestMapping("api/supportAgent")
public class SupportAgentController {

    @Autowired
    private SupportAgentServiceImpl sServ;

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> addSupportAgent(@RequestBody SupportAgent supportAgent) {
        SupportAgent s = sServ.addSupportAgent(supportAgent);
        if (s != null) {
            return ResponseEntity.status(201).body(s);
        }
        return ResponseEntity.status(403).build();
    }

    @GetMapping("/{agentId}")
    @PreAuthorize("hasAnyRole('MANAGER', 'CLIENT')")
    public ResponseEntity<?> getSupportAgentById(@PathVariable("agentId") long agentId) {
        SupportAgent s = sServ.getSupportAgentById(agentId);
        if (s != null) {
            return ResponseEntity.status(200).body(s);
        }
        return ResponseEntity.status(204).build();
    }

    @GetMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> getAllSupportAgents() {
        List<SupportAgent> supportAgents = sServ.getAllSupportAgents();
        if (supportAgents != null) {
            return ResponseEntity.status(200).body(supportAgents);
        }
        return ResponseEntity.status(204).build();
    }

    @PutMapping("/{agentId}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> updateSupportAgent(@PathVariable("agentId") long agentId,
            @RequestBody SupportAgent supportAgent) {
        SupportAgent s = sServ.updateSupportAgent(agentId, supportAgent);
        if (s != null) {
            return ResponseEntity.status(200).body(s);
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/{agentId}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> deleteSupportAgent(@PathVariable("agentId") long agentId) {
        SupportAgent s = sServ.deleteSupportAgent(agentId);
        if (s != null) {
            return ResponseEntity.status(200).body(s);
        }
        return ResponseEntity.status(404).build();
    }
}