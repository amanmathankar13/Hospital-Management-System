package com.hms.appointment.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.DoctorDetails;
import com.hms.appointment.dto.PatientDTO;

@FeignClient(name = "ProfileService")
public interface ProfileClient {
    // ...
    @GetMapping("/profile/doctor/exists/{id}")
    Boolean doctorExists(@PathVariable Long id);

   
    @GetMapping("/profile/patient/exists/{id}")
    Boolean patientExists(@PathVariable Long id);

    @GetMapping("/profile/patient/get/{id}")
    PatientDTO getPatientById(@PathVariable Long id);

    @GetMapping("/profile/doctor/get/{id}")
    DoctorDTO getDoctorById(@PathVariable Long id);

    @GetMapping("/profile/doctor/getDoctorsByIds")
    List<DoctorDetails> getDoctorsByIds(@RequestParam("ids") List<Long> ids);


}
