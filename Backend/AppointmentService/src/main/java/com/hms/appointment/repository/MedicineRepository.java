package com.hms.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.appointment.entity.Medicine;
import java.util.List;


public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findAllByPrescription_Id(Long prescriptionId);
}
