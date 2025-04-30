package com.hms.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class ApiService {

    @Autowired
    private WebClient.Builder webClient;

    public Mono<Boolean> doctorExists(Long id){
        return webClient.build().get().uri("http://localhost:8081/profile/doctor/exists/" + id).retrieve().bodyToMono(Boolean.class);
    }

    public Mono<Boolean> patientExists(Long id){
        return webClient.build().get().uri("http://localhost:8081/profile/patient/exists/" + id).retrieve().bodyToMono(Boolean.class);
    }

    // public Mono<PatientDTO> getPatientById(Long id){
    //     return webClient.build().get().u
    // }
}
