package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.TicketDeletionException;
import com.examly.springapp.model.SupportAgent;
import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.SupportAgentRepo;
import com.examly.springapp.repository.TicketRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class TicketServiceImpl implements TicketService{

    @Autowired
    private TicketRepo ticketRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SupportAgentRepo supportAgentRepo;

    @Override
    public Ticket addTicket(Ticket ticket) {
        User user = userRepo.findById(ticket.getUser().getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        SupportAgent agent = supportAgentRepo.findById(ticket.getSupportAgent().getAgentId()).orElse(null);

        ticket.setUser(user);
        ticket.setSupportAgent(agent);

        return ticketRepo.save(ticket);
    }
    

    @Override
    public Ticket getTicketById(Long ticketId) {
        return ticketRepo.findById(ticketId).orElse(null);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    @Override
    public Ticket updateTicket(Long ticketId, Ticket ticket) {
        Ticket oldTicket = ticketRepo.findById(ticketId).orElse(null);
        if (oldTicket!=null) {
            SupportAgent agent = supportAgentRepo.findById(ticket.getSupportAgent().getAgentId()).orElse(null);
            oldTicket.setTitle(ticket.getTitle());
            oldTicket.setDescription(ticket.getDescription());
            oldTicket.setPriority(ticket.getPriority());
            oldTicket.setStatus(ticket.getStatus());
            oldTicket.setCreatedDate(ticket.getCreatedDate());
            oldTicket.setResolutionDate(ticket.getResolutionDate());
            oldTicket.setIssueCategory(ticket.getIssueCategory());
            oldTicket.setResolutionSummary(ticket.getResolutionSummary());
            oldTicket.setSatisfied(ticket.isSatisfied());
            oldTicket.setSupportAgent(agent);
            return ticketRepo.save(oldTicket);
        }
        return null;
    }


    @Override
    public Ticket deleteTicket(Long ticketId) {
        Ticket t = ticketRepo.findById(ticketId).orElse(null);
        if (t != null) {
            ticketRepo.deleteById(ticketId);
            return t;
        }
        throw new TicketDeletionException("Failed to delete ticket with ID: "+ticketId);
    }

    @Override
    public List<Ticket> getTicketsByAgentId(Long agentId) {
        return ticketRepo.findBySupportAgentAgentId(agentId);
    }

    @Override
    public List<Ticket> getTicketsByUserId(Long userId) {
        return ticketRepo.findByUserUserId(userId);
    }

}