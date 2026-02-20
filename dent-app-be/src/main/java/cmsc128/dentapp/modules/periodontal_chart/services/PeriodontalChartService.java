package cmsc128.dentapp.modules.periodontal_chart.services;

import java.util.List;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.Entities.DTO.CreatePeriodontalChartDTO;
import cmsc128.dentapp.modules.periodontal_chart.dto.PeriodontalChartResponseDTO;
import cmsc128.dentapp.modules.periodontal_chart.dto.PeriodontalChartToothDTO;

@Service
public interface PeriodontalChartService {

  PeriodontalChartResponseDTO createPeriodontalChart(CreatePeriodontalChartDTO createDTO);

  PeriodontalChartResponseDTO getPeriodontalChartById(Long chartId);

  List<PeriodontalChartResponseDTO> getPeriodontalChartsByPatientId(Long patientId);

  PeriodontalChartResponseDTO updatePeriodontalChart(
      Long chartId, CreatePeriodontalChartDTO updateDTO);

  void deletePeriodontalChart(Long chartId);

  PeriodontalChartToothDTO updateTooth(
      Long chartId, Integer toothNumber, PeriodontalChartToothDTO toothDTO);

  PeriodontalChartToothDTO getToothByChartIdAndToothNumber(Long chartId, Integer toothNumber);

  List<PeriodontalChartToothDTO> getTeethByChartId(Long chartId);

  // Validation methods
  boolean isValidToothNumber(Integer toothNumber);

  void validateTeethCount(List<PeriodontalChartToothDTO> teeth);

  void validatePeriodontalChart(CreatePeriodontalChartDTO chartDTO);
}
