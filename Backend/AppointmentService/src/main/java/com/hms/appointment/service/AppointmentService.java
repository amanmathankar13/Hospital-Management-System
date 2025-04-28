package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.exception.HMSException;

public interface AppointmentService {

    Long scheduleAppointment(AppointmentDTO appointmentDTO);
    void cancelAppointment(Long appointmentId);
    void completeAppointment(Long appointmentId);
    void recheduleAppointment(Long appointmentId, String newDateTime);
    AppointmentDTO getAppointmentDetails(Long appointmentId) throws HMSException;

}
