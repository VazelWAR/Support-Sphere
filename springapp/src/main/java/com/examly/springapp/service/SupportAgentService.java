package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.SupportAgent;

public interface SupportAgentService {
    SupportAgent addSupportAgent(SupportAgent supportAgent);
    SupportAgent getSupportAgentById(long agentId);
    List<SupportAgent> getAllSupportAgents();
    SupportAgent updateSupportAgent(long agentId, SupportAgent supportAgent);
    SupportAgent deleteSupportAgent(long agentId);
}
