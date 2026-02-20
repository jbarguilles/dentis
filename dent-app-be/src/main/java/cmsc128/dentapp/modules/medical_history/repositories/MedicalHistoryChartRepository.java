package cmsc128.dentapp.modules.medical_history.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.medical_history.entities.MedicalHistoryChart;

@Repository
public interface MedicalHistoryChartRepository extends JpaRepository<MedicalHistoryChart, Long> {}
