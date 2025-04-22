package com.hms.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.hms.user.dto.Roles;
import com.hms.user.dto.UserDTO;

import reactor.core.publisher.Mono;

@Service
public class ApiService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    public Mono<Long> addProfile(UserDTO userDTO){
        if(userDTO.getRole().equals(Roles.DOCTOR)){
            return webClientBuilder.build().post().uri("http://localhost:8082/profile/doctor/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }
        else if(userDTO.getRole().equals(Roles.PATIENT)){
            return webClientBuilder.build().post().uri("http://localhost:8082/profile/patient/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }
        return null;
    }
}
