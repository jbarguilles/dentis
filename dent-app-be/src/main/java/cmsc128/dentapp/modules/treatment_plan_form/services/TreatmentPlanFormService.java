package cmsc128.dentapp.modules.treatment_plan_form.services;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.treatment_plan_form.dto.AddTreatmentPlanFormDTO;
import cmsc128.dentapp.modules.treatment_plan_form.entities.TreatmentPlanForm;

@Service
public interface TreatmentPlanFormService {
  TreatmentPlanForm saveTPF(AddTreatmentPlanFormDTO addTreatmentPlanFormDTO);
}
