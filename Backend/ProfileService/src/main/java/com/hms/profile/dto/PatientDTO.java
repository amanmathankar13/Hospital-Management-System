package com.hms.profile.dto;

import java.time.LocalDate;

import com.hms.profile.entity.Patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    
    private Long id;
    private String name;
    private String email;
    private LocalDate dob;
    private String phoneNumber;
    private String address;
    private String identityNumber;
    private BloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;

    public Patient toEntity(){
        return new Patient(this.id, this.name, this.email, this.dob, this.phoneNumber, this.address, this.identityNumber, this.bloodGroup, this.allergies, this.chronicDisease);
    }
}
