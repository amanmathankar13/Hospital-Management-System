package com.hms.profile.entity;



import java.time.LocalDate;

import com.hms.profile.dto.BloodGroup;
import com.hms.profile.dto.PatientDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private LocalDate dob;
    private String phoneNumber;
    private String address;
    @Column(unique = true)
    private String identityNumber;
    private BloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;

    public PatientDTO toDTO(){
        return new PatientDTO(this.id, this.name, this.email, this.dob, this.phoneNumber, this.address, this.identityNumber, this.bloodGroup, this.allergies, this.chronicDisease);
    }

}