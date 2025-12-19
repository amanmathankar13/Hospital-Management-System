package com.hms.appointment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.appointment.entity.AppointmentRecord;

public interface AppointmentRecordRepository extends JpaRepository<AppointmentRecord, Long>{
    Optional<AppointmentRecord> findByAppointment_Id(Long appointmentId);

    List<AppointmentRecord> findByPatientId(Long patientId);
    Boolean existsByAppointmentId(Long appointmentId);
}
