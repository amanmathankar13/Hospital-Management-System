package com.hms.appointment.service;

import java.util.List;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.exception.HMSException;

public interface AppointmentService {

    Long scheduleAppointment(AppointmentDTO appointmentDTO);
    void cancelAppointment(Long appointmentId);
    void completeAppointment(Long appointmentId);
    void recheduleAppointment(Long appointmentId, String newDateTime);
    AppointmentDTO getAppointmentDetails(Long appointmentId) throws HMSException;
    AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HMSException;
    List<AppointmentDetails> getAppointmentDetailsByPatientId(Long id);

}
