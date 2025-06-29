package com.hms.appointment.service.implementation;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hms.appointment.dto.AppointmentRecordDTO;
import com.hms.appointment.entity.AppointmentRecord;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.AppointmentRecordRepository;
import com.hms.appointment.service.AppointmentRecordService;
import com.hms.appointment.utility.StringListConverter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentRecordImpl implements AppointmentRecordService {

    
    private final AppointmentRecordRepository appointmentRecordRepository;

    @Override
    public Long createAppointmentRecord(AppointmentRecordDTO appointmentRecordDTO) throws HMSException {
        Optional<AppointmentRecord> existingRecord = appointmentRecordRepository.findByAppointment_Id(appointmentRecordDTO.getAppointmentId());
        if (existingRecord.isPresent()) {
            throw new HMSException("Appointment record already exists");
        }
        return appointmentRecordRepository.save(appointmentRecordDTO.toEntity()).getId();
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
    
    
}
