package com.hms.profile.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hms.profile.dto.DoctorDropDown;
import com.hms.profile.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor,Long>{
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByLicenseNumber(String licenseNumber);

    @Query("SELECT d.id AS id, d.name AS name FROM Doctor d")
    List<DoctorDropDown> findAllDoctorDropDowns();
}
