package com.hms.appointment.service.implementation;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hms.appointment.clients.ProfileClient;
import com.hms.appointment.dto.DoctorDetails;
import com.hms.appointment.dto.MedicineDTO;
import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.dto.PrescriptionDetails;
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

   private final ProfileClient profileClient;

   @Override
    public Long savePrescription(PrescriptionDTO prescription) {
        prescription.setPrescriptionDate(LocalDate.now());
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

   @Override
   public List<PrescriptionDetails> getPrescriptionsByPatientId(Long patientId) {
        List<Prescription> prescriptions = prescriptionRepository.findAllByPatientId(patientId);
        List<PrescriptionDetails> prescriptionDetails = prescriptions.stream().map(Prescription::toDetails).toList();
        prescriptionDetails.forEach(prescriptionDetail->{
            List<MedicineDTO> medicineNames = medicineService.getAllMedicinesByPrescriptionId(prescriptionDetail.getId());
            prescriptionDetail.setMedicines(medicineNames);
        });

        List<Long> doctorIds = prescriptionDetails.stream().map(PrescriptionDetails::getDoctorId).distinct().toList();
        List<DoctorDetails> doctors = profileClient.getDoctorsByIds(doctorIds);
        Map<Long, String> doctorMap = doctors.stream()
            .collect(Collectors.toMap(DoctorDetails::getId, DoctorDetails::getName));
        prescriptionDetails.forEach(prescriptionDetail->{
            String name = doctorMap.get(prescriptionDetail.getDoctorId());
            if(name != null){
                prescriptionDetail.setDoctorName(name);
            }
            else{
                prescriptionDetail.setDoctorName("Unknown Doctor");
            }
        });
        return prescriptionDetails;
   }
   
}
