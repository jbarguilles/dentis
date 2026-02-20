package cmsc128.dentapp.modules.chart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.chart.entities.Chart;

@Repository
public interface ChartRepository extends JpaRepository<Chart, Long> {
  Chart findByChartID(Long chartID);
  //    Chart findByPatient_PatientID(Long patientID);
}
