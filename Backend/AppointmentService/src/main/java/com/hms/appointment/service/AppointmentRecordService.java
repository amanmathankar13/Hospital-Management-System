package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentRecordDTO;
import com.hms.appointment.exception.HMSException;

public interface AppointmentRecordService {
    
    public Long createAppointmentRecord(AppointmentRecordDTO appointmentRecordDTO) throws HMSException;
    public void updateAppointmentRecord(AppointmentRecordDTO appointmentRecordDTO) throws HMSException;
    public AppointmentRecordDTO getAppointmentRecordByAppointmentId(Long appointmentId) throws HMSException;

    public AppointmentRecordDTO getAppointmentRecordById(Long id) throws HMSException;
    public AppointmentRecordDTO getAppointmentRecordDetailsByAppoitmentId (Long appointmentId);
}
