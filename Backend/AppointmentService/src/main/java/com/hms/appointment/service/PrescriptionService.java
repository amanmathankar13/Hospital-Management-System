package com.hms.appointment.service;

import com.hms.appointment.dto.PrescriptionDTO;

public interface PrescriptionService {
    public Long savePrescription(PrescriptionDTO prescription);
    public PrescriptionDTO getPrescriptionById(Long prescriptionId);
    public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId);
}