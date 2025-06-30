package com.hms.appointment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.appointment.entity.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    
    Optional<Prescription> findByAppointment_Id(Long appointmentId);

    List<Prescription> findAllByPatientId(Long patientId);
}
