package com.hms.appointment.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.dto.AppointmentStatus;
import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.AppointmentRepository;
import com.hms.appointment.service.ApiService;
import com.hms.appointment.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService{

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ApiService apiService;

    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO) {
        Boolean doctorExists = apiService.doctorExists(appointmentDTO.getDoctorId()).block();
        if(doctorExists==null || !doctorExists){
            throw new HMSException("DOCTOR_NOT_FOUND");
        }
        Boolean patientExists = apiService.patientExists(appointmentDTO.getPatientId()).block();
        if(patientExists==null || !patientExists){
            throw new HMSException("PATIENT_NOT_FOUND");
        }
        appointmentDTO.setAppointmentStatus(AppointmentStatus.SCHEDULED);
        return appointmentRepository.save(appointmentDTO.toEntity()).getId();
    }

    @Override
    public void cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_NOT_FOUND"));
        if(appointment.getAppointmentStatus().equals(AppointmentStatus.CANCELLED)){
            throw new HMSException("APPINTMENT_ALREADY_CANCELLED");
        }
        appointment.setAppointmentStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    @Override
    public void completeAppointment(Long appointmentId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'completeAppointment'");
    }

    @Override
    public void recheduleAppointment(Long appointmentId, String newDateTime) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'recheduleAppointment'");
    }

    @Override
    public AppointmentDTO getAppointmentDetails(Long appointmentId) throws HMSException {
        return appointmentRepository.findById(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_NOT_FOUND")).toDTO();
    }

    @Override
    public AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HMSException {
        AppointmentDTO appointmentDTO = appointmentRepository.findById(appointmentId).orElseThrow(()-> new HMSException("APPOINTMENT_NOT_FOUND")).toDTO();
        DoctorDTO doctorDTO = apiService.getDoctorById(appointmentDTO.getDoctorId()).block();
        PatientDTO patientDTO = apiService.getPatientById(appointmentDTO.getPatientId()).block();
        return new AppointmentDetails(appointmentDTO.getId(),appointmentDTO.getPatientId(),patientDTO.getName(),appointmentDTO.getDoctorId(),doctorDTO.getName(),appointmentDTO.getAppointmentTime(),appointmentDTO.getAppointmentStatus(),appointmentDTO.getReason(),appointmentDTO.getNotes());


    }

    
    
}
