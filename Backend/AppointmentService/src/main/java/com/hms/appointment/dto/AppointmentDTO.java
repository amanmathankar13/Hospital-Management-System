package com.hms.appointment.dto;

import java.time.LocalDateTime;

import com.hms.appointment.entity.Appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {

    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentTime;
    private AppointmentStatus appointmentStatus;
    private String reason;
    private String notes;

    public Appointment toEntity(){
        return new Appointment(this.id, this.patientId, this.doctorId, this.appointmentTime, this.appointmentStatus, this.reason, this.notes);
    }
}
