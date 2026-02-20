package cmsc128.dentapp.modules.radiographic_exam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.radiographic_exam.entities.RadiographicExam;

@Repository
public interface RadiographicExamRepository extends JpaRepository<RadiographicExam, Long> {}
