package com.hms.profile.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.profile.entity.Patient;



public interface PatientRepository extends JpaRepository<Patient,Long> {
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByIdentityNumber(String identityNumber);
}
