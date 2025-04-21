package com.hms.profile.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.profile.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor,Long>{
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByLicenseNumber(String licenseNumber);
}
