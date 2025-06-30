package com.hms.appointment.service;

import java.util.List;

import com.hms.appointment.dto.MedicineDTO;

public interface MedicineService {
    public Long saveMedicine(MedicineDTO medicineDTO);

    public List<MedicineDTO> saveAllMedicines(List<MedicineDTO> requetList);

    public List<MedicineDTO> getAllMedicinesByPrescriptionId(Long prescriptionId);
}
