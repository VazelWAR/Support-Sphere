package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.AgentDeletionException;
import com.examly.springapp.exceptions.DuplicateAgentException;
import com.examly.springapp.model.SupportAgent;
import com.examly.springapp.repository.SupportAgentRepo;

@Service
public class SupportAgentServiceImpl implements SupportAgentService{

    @Autowired
    private SupportAgentRepo sServ;

    @Override
    public SupportAgent addSupportAgent(SupportAgent supportAgent) {
        if(sServ.existsById(supportAgent.getAgentId())){
            throw new DuplicateAgentException("Agent with ID "+supportAgent.getAgentId()+" already exists.");
        }
        return sServ.save(supportAgent);
    }

    @Override
    public SupportAgent getSupportAgentById(long agentId) {
        Optional<SupportAgent> opt = sServ.findById(agentId);
        if(opt.isPresent()){
            return opt.get();
        }
        return null;
    }

    @Override
    public List<SupportAgent> getAllSupportAgents() {
        return sServ.findAll();
    }

    @Override
    public SupportAgent updateSupportAgent(long agentId, SupportAgent supportAgent) {
        Optional<SupportAgent> opt = sServ.findById(agentId);
        if(opt.isPresent()){
            SupportAgent s = opt.get();
            s.setAddedDate(supportAgent.getAddedDate());
            s.setEmail(supportAgent.getEmail());
            s.setExperience(supportAgent.getExperience());
            s.setExpertise(supportAgent.getExpertise());
            s.setName(supportAgent.getName());
            s.setPhone(supportAgent.getPhone());
            s.setProfile(supportAgent.getProfile());
            s.setRemarks(supportAgent.getRemarks());
            s.setShiftTiming(supportAgent.getShiftTiming());
            s.setStatus(supportAgent.getStatus());
            return sServ.save(s);
        }
        return null;
    }

    @Override
    public SupportAgent deleteSupportAgent(long agentId) {
        Optional<SupportAgent> opt = sServ.findById(agentId);
        if(opt.isPresent()){
            sServ.deleteById(agentId);
            return opt.get();
        }
        throw new AgentDeletionException("Failed to delete agent with ID: "+agentId);
    }

}
