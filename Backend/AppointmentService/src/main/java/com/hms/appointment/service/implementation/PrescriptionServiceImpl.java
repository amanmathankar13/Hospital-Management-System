package com.hms.appointment.service.implementation;

import org.springframework.stereotype.Service;

import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.entity.Prescription;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.PrescriptionRepository;
import com.hms.appointment.service.MedicineService;
import com.hms.appointment.service.PrescriptionService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PrescriptionServiceImpl implements PrescriptionService {
   private final PrescriptionRepository prescriptionRepository;

   private final MedicineService medicineService;

   @Override
    public Long savePrescription(PrescriptionDTO prescription) {
        Long prescriptionId = prescriptionRepository.save(prescription.toEntity()).getId();
        prescription.getMedicines().forEach(medicine->{
            medicine.setPrescriptionId(prescriptionId);
        });
        medicineService.saveAllMedicines(prescription.getMedicines());
        return prescriptionId;
    }

   @Override
    public PrescriptionDTO getPrescriptionById(Long prescriptionId) {
        PrescriptionDTO prescriptionDTO = prescriptionRepository.findById(prescriptionId).map(Prescription::toDTO).orElseThrow(()-> new HMSException("Prescription Not Found"));
        prescriptionDTO.setMedicines(medicineService.getAllMedicinesByPrescriptionId(prescriptionDTO.getId()));
        return prescriptionDTO;
    }

   @Override
   public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId) {
        PrescriptionDTO prescriptionDTO = prescriptionRepository.findByAppointment_Id(appointmentId).map(Prescription::toDTO).orElseThrow(()-> new HMSException("Prescription Not Found"));
        prescriptionDTO.setMedicines(medicineService.getAllMedicinesByPrescriptionId(prescriptionDTO.getId()));
        return prescriptionDTO;
   }
   
}
