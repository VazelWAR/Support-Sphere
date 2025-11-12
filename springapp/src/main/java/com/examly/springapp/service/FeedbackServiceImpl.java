package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.SupportAgent;
import com.examly.springapp.model.Ticket;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.SupportAgentRepo;
import com.examly.springapp.repository.TicketRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackRepo feedbackRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SupportAgentRepo supportAgentRepo;

    @Autowired
    private TicketRepo ticketRepo;

    @Override
    public Feedback createFeedback(Feedback feedback) {
        User user = userRepo.findById(feedback.getUser().getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        SupportAgent agent = supportAgentRepo.findById(feedback.getSupportAgent().getAgentId()).orElseThrow(() -> new RuntimeException("Ticket not found"));
        Ticket ticket = ticketRepo.findById(feedback.getTicket().getTicketId()).orElseThrow();

        feedback.setUser(user);
        feedback.setSupportAgent(agent);
        feedback.setTicket(ticket);

        return feedbackRepo.save(feedback);
        
    }

    @Override
    public Feedback getFeedbackById(long feedbackId) {
        return feedbackRepo.findById(feedbackId).orElse(null);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public Feedback deleteFeedback(long feedbackId) {
        Feedback fb = feedbackRepo.findById(feedbackId).orElse(null);
        if (fb != null) {
            feedbackRepo.deleteById(feedbackId);
            return fb;
        }
        return null;
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(long userId) {
        return feedbackRepo.findByUserUserId(userId);
    }

}