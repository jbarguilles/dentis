package cmsc128.dentapp.modules.radiographic_exam.services;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.radiographic_exam.dto.AddRadiographicExamDTO;
import cmsc128.dentapp.modules.radiographic_exam.entities.RadiographicExam;

@Service
public interface RadiographicExamService {
  RadiographicExam saveRE(AddRadiographicExamDTO addRadiographicExamDTO);
}
