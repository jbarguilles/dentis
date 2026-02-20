package cmsc128.dentapp.modules.radiographic_exam.controllers;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.modules.radiographic_exam.dto.AddRadiographicExamDTO;
import cmsc128.dentapp.modules.radiographic_exam.entities.RadiographicExam;
import cmsc128.dentapp.modules.radiographic_exam.services.RadiographicExamService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/radiographicexam"})
public class RadiographicExamController {
  private final RadiographicExamService radiographicExamService;

  public RadiographicExamController(RadiographicExamService radiographicExamService) {
    this.radiographicExamService = radiographicExamService;
  }

  @PutMapping(path = "/add")
  public RadiographicExam saveRE(@RequestBody AddRadiographicExamDTO addRadiographicExamDTO) {
    return this.radiographicExamService.saveRE(addRadiographicExamDTO);
  }
}
