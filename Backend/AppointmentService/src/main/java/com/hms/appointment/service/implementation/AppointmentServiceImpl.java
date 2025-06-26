package com.hms.appointment.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.appointment.clients.ProfileClient;
import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.dto.AppointmentStatus;
import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.AppointmentRepository;
import com.hms.appointment.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService{

    @Autowired
    private AppointmentRepository appointmentRepository;


    @Autowired
    private ProfileClient profileClient;

    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO) {
        Boolean doctorExists = profileClient.doctorExists(appointmentDTO.getDoctorId());
        if(doctorExists==null || !doctorExists){
            throw new HMSException("DOCTOR_NOT_FOUND");
        }
        Boolean patientExists = profileClient.patientExists(appointmentDTO.getPatientId());
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
        DoctorDTO doctorDTO = profileClient.getDoctorById(appointmentDTO.getDoctorId());
        PatientDTO patientDTO = profileClient.getPatientById(appointmentDTO.getPatientId());
        return new AppointmentDetails(appointmentDTO.getId(),appointmentDTO.getPatientId(),patientDTO.getName(),patientDTO.getEmail(), patientDTO.getPhoneNumber(), appointmentDTO.getDoctorId(),doctorDTO.getName(),appointmentDTO.getAppointmentTime(),appointmentDTO.getAppointmentStatus(),appointmentDTO.getReason(),appointmentDTO.getNotes());


    }

    @Override
    public List<AppointmentDetails> getAppointmentDetailsByPatientId(Long id) {
        return appointmentRepository.findAllByPatientId(id).stream().map(appointment -> {
            DoctorDTO doctorDTO = profileClient.getDoctorById(appointment.getDoctorId());
            appointment.setDoctorName(doctorDTO.getName());
            return appointment;
        }).toList();
    }

    @Override
    public List<AppointmentDetails> getAppointmentDetailsByDoctorId(Long id) {
        return appointmentRepository.findAllByDoctorId(id).stream().map(appointment -> {
            PatientDTO patientDTO = profileClient.getPatientById(appointment.getPatientId());
            appointment.setPatientName(patientDTO.getName());
            appointment.setPatientEmail(patientDTO.getEmail());
            appointment.setPatientPhone(patientDTO.getPhoneNumber());
            return appointment;
        }).toList();
    }

}
