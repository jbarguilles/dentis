package cmsc128.dentapp.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.periodontal_chart.entities.PeriodontalChartTooth;

@Repository
public interface PeriodontalChartToothRepository
    extends JpaRepository<PeriodontalChartTooth, Long> {

  List<PeriodontalChartTooth> findByPeriodontalChart_PeriodontalChartId(Long chartId);

  Optional<PeriodontalChartTooth> findByPeriodontalChart_PeriodontalChartIdAndToothNumber(
      Long chartId, Integer toothNumber);

  @Query(
      "SELECT pct FROM PERIODONTAL_CHART_TOOTH pct WHERE pct.periodontalChart.periodontalChartId = :chartId ORDER BY pct.toothNumber")
  List<PeriodontalChartTooth> findByChartIdOrderByToothNumber(@Param("chartId") Long chartId);

  void deleteByPeriodontalChart_PeriodontalChartId(Long chartId);
}
