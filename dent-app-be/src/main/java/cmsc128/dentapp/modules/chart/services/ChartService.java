package cmsc128.dentapp.modules.chart.services;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.chart.dto.AddChartDTO;
import cmsc128.dentapp.modules.chart.entities.Chart;

@Service
public interface ChartService {
  Chart saveChart(AddChartDTO addChartDTO);

  Chart findByID(Long chartID);
  //    Chart findByPatientID(Long patientID);
}
