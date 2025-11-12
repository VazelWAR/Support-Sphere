package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;


@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    FeedbackService feedbackService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback){
        Feedback f=feedbackService.createFeedback(feedback);
        if(f!=null){
            return ResponseEntity.status(201).body(f);
        }
        else{
            return ResponseEntity.status(409).build();
        }
        
    }

    @GetMapping("/{feedbackId}")
    @PreAuthorize("hasAnyRole('MANAGER', 'CLIENT')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable long feedbackId){
        Feedback f=feedbackService.getFeedbackById(feedbackId);
        if(f!=null){
            return ResponseEntity.status(200).body(f);
        }
        else{
            return ResponseEntity.status(404).build();
        }

    }

    @GetMapping
    @PreAuthorize("hasAnyRole('MANAGER', 'CLIENT')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks(){
        List<Feedback> f=feedbackService.getAllFeedbacks();
        if(f!=null){
            return ResponseEntity.status(200).body(f);
        }
        else{
            return ResponseEntity.status(400).build();
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<Feedback>> getFeedbackByUser(@PathVariable long userId){
        List<Feedback> f=feedbackService.getFeedbacksByUserId(userId);
        if(f!=null){
            return ResponseEntity.status(200).body(f);
        }
        else{
            return ResponseEntity.status(404).build();
        }
    }

    @DeleteMapping("/{feedbackId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Feedback> deleteFeedback(@PathVariable long feedbackId){
        Feedback f=feedbackService.deleteFeedback(feedbackId);
        if(f!=null){
            return ResponseEntity.status(200).body(f);
        }
        else{
            return ResponseEntity.status(404).build();
        }
    }

}
