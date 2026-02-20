package cmsc128.dentapp.modules.medical_history.services;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.medical_history.dto.AddMedicalHistoryDTO;
import cmsc128.dentapp.modules.medical_history.entities.MedicalHistoryChart;

@Service
public interface MedicalHistoryChartService {
  MedicalHistoryChart addMHC(AddMedicalHistoryDTO addMedicalHistoryDTO);
}
