package com.hms.appointment.service.implementation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hms.appointment.clients.ProfileClient;
import com.hms.appointment.dto.AppointmentRecordDTO;
import com.hms.appointment.dto.DoctorDetails;
import com.hms.appointment.dto.RecordDetails;
import com.hms.appointment.entity.AppointmentRecord;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.AppointmentRecordRepository;
import com.hms.appointment.service.AppointmentRecordService;
import com.hms.appointment.service.PrescriptionService;
import com.hms.appointment.utility.StringListConverter;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AppointmentRecordImpl implements AppointmentRecordService {

    
    private final AppointmentRecordRepository appointmentRecordRepository;

    private final PrescriptionService prescriptionService;

    private final ProfileClient profileClient;

    @Override
    public Long createAppointmentRecord(AppointmentRecordDTO appointmentRecordDTO) throws HMSException {
        Optional<AppointmentRecord> existingRecord = appointmentRecordRepository.findByAppointment_Id(appointmentRecordDTO.getAppointmentId());
        if (existingRecord.isPresent()) {
            throw new HMSException("Appointment record already exists");
        }
        appointmentRecordDTO.setCreatedAt(LocalDateTime.now());
        Long id = appointmentRecordRepository.save(appointmentRecordDTO.toEntity()).getId();
        if(appointmentRecordDTO.getPrescription() != null) {
            appointmentRecordDTO.getPrescription().setAppointmentId(appointmentRecordDTO.getAppointmentId());
            prescriptionService.savePrescription(appointmentRecordDTO.getPrescription());
        } 
        return id;
    }

    @Override
    public void updateAppointmentRecord(AppointmentRecordDTO appointmentRecordDTO) throws HMSException {
        AppointmentRecord existingRecord = appointmentRecordRepository.findById(appointmentRecordDTO.getId()).orElseThrow(()-> new HMSException("Appointment Record not exists"));
        existingRecord.setNotes(appointmentRecordDTO.getNotes());
        existingRecord.setDiagnosis(appointmentRecordDTO.getDiagnosis());
        existingRecord.setFollowUpDate(appointmentRecordDTO.getFollowUpDate());
        existingRecord.setSymptoms(StringListConverter.convertListtoString(appointmentRecordDTO.getSymptoms()));
        existingRecord.setTests(StringListConverter.convertListtoString(appointmentRecordDTO.getTests()));
        existingRecord.setReferal(appointmentRecordDTO.getReferal());
        appointmentRecordRepository.save(existingRecord);
    }

    @Override
    public AppointmentRecordDTO getAppointmentRecordByAppointmentId(Long appointmentId) throws HMSException {
        return appointmentRecordRepository.findByAppointment_Id(appointmentId).orElseThrow(()-> new HMSException("Appointment record not exists")).toDto();
    }

    @Override
    public AppointmentRecordDTO getAppointmentRecordById(Long id) throws HMSException {
        return appointmentRecordRepository.findById(id).orElseThrow(()->new HMSException("Appointment record not exists")).toDto();
    }

    @Override
    public AppointmentRecordDTO getAppointmentRecordDetailsByAppoitmentId(Long appointmentId) {
        AppointmentRecordDTO appointmentRecord = appointmentRecordRepository.findByAppointment_Id(appointmentId).orElseThrow(()-> new HMSException("Appointment record not exists")).toDto();
        appointmentRecord.setPrescription(prescriptionService.getPrescriptionByAppointmentId(appointmentId));
        return appointmentRecord;
    }

    @Override
    public List<RecordDetails> getAppointmentRecordsByPatientId(Long patientId) {
        List<AppointmentRecord> records = appointmentRecordRepository.findByPatientId(patientId);
        List<RecordDetails> recordDetails =  records.stream().map(AppointmentRecord::toRecordDetails).toList();
        List<Long> doctorIds = recordDetails.stream().map(RecordDetails::getDoctorId).distinct().toList();

        List<DoctorDetails> doctors = profileClient.getDoctorsByIds(doctorIds);

        Map<Long, String> doctorMap = doctors.stream()
            .collect(Collectors.toMap(DoctorDetails::getId, DoctorDetails::getName));

        recordDetails.forEach(record -> {
            String name = doctorMap.get(record.getDoctorId());
            if(name != null){
                record.setDoctorName(doctorMap.get(record.getDoctorId()));
            }
            else {
                record.setDoctorName("Unknown Doctor");
            }
        });

        return recordDetails;

    }

    

    @Override
    public List<AppointmentRecordDTO> getAppointmentRecordsById(Long recordId) {
        List<AppointmentRecord> records = appointmentRecordRepository.findAllById(List.of(recordId));
        return records.stream().map(AppointmentRecord::toDto).toList();
    }

    @Override
    public Boolean isRecordExists(Long appointmentId) throws HMSException {
        return appointmentRecordRepository.existsByAppointmentId(appointmentId);
    }

}
