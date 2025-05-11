package com.hms.user.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.hms.user.dto.UserDTO;




@FeignClient(name = "ProfileService")
public interface ProfileClient {


    @PostMapping("/profile/doctor/add")
    public Long addDoctorProfile(@RequestBody UserDTO userDTO);

    @PostMapping("/profile/patient/add")
    public Long addPatientProfile(@RequestBody UserDTO userDTO);

}
