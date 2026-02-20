package cmsc128.dentapp.modules.periodontal_chart.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.periodontal_chart.entities.*;

@Repository
public interface PeriodontalChartRepository extends JpaRepository<PeriodontalChart, Long> {

  List<PeriodontalChart> findByPatient_PatientID(Long patientId);

  Optional<PeriodontalChart> findByPeriodontalChartIdAndPatient_PatientID(
      Long chartId, Long patientId);

  @Query(
      "SELECT pc FROM PERIODONTAL_CHART pc JOIN FETCH pc.teeth WHERE pc.periodontalChartId = :chartId")
  Optional<PeriodontalChart> findByIdWithTeeth(@Param("chartId") Long chartId);

  @Query(
      "SELECT pc FROM PERIODONTAL_CHART pc JOIN FETCH pc.teeth WHERE pc.patient.patientID = :patientId")
  List<PeriodontalChart> findByPatientIdWithTeeth(@Param("patientId") Long patientId);
}
