package cmsc128.dentapp.modules.medical_history.controllers;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.modules.medical_history.dto.AddMedicalHistoryDTO;
import cmsc128.dentapp.modules.medical_history.entities.MedicalHistoryChart;
import cmsc128.dentapp.modules.medical_history.services.MedicalHistoryChartService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/medicalhistory"})
public class MedicalHistoryChartController {
  private final MedicalHistoryChartService medicalHistoryChartService;

  public MedicalHistoryChartController(MedicalHistoryChartService medicalHistoryChartService) {
    this.medicalHistoryChartService = medicalHistoryChartService;
  }

  @PutMapping(path = "/add")
  public MedicalHistoryChart addMHC(@RequestBody AddMedicalHistoryDTO addMedicalHistoryDTO) {
    return this.medicalHistoryChartService.addMHC(addMedicalHistoryDTO);
  }
}
