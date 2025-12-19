package com.hms.appointment.service;

import java.util.List;

import com.hms.appointment.dto.PrescriptionDTO;
import com.hms.appointment.dto.PrescriptionDetails;

public interface PrescriptionService {
    public Long savePrescription(PrescriptionDTO prescription);
    public PrescriptionDTO getPrescriptionById(Long prescriptionId);
    public PrescriptionDTO getPrescriptionByAppointmentId(Long appointmentId);
    public List<PrescriptionDetails> getPrescriptionsByPatientId(Long patientId);
}