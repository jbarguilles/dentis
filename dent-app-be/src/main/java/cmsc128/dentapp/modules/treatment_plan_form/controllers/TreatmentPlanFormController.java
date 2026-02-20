package cmsc128.dentapp.modules.treatment_plan_form.controllers;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.modules.treatment_plan_form.dto.AddTreatmentPlanFormDTO;
import cmsc128.dentapp.modules.treatment_plan_form.entities.TreatmentPlanForm;
import cmsc128.dentapp.modules.treatment_plan_form.services.TreatmentPlanFormService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/treatmentplan"})
public class TreatmentPlanFormController {
  private final TreatmentPlanFormService treatmentPlanFormService;

  public TreatmentPlanFormController(TreatmentPlanFormService treatmentPlanFormService) {
    this.treatmentPlanFormService = treatmentPlanFormService;
  }

  @PutMapping(path = "/add")
  public TreatmentPlanForm saveTPF(@RequestBody AddTreatmentPlanFormDTO addTreatmentPlanFormDTO) {
    return this.treatmentPlanFormService.saveTPF(addTreatmentPlanFormDTO);
  }
}
