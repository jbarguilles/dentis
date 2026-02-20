package cmsc128.dentapp.modules.treatment_plan_form.services;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;
import cmsc128.dentapp.modules.treatment_plan_form.dto.AddTreatmentPlanFormDTO;
import cmsc128.dentapp.modules.treatment_plan_form.entities.TreatmentPlanForm;
import cmsc128.dentapp.modules.treatment_plan_form.repositories.TreatmentPlanFormRepository;

@Service
public class TreatmentPlanFormServiceImpl implements TreatmentPlanFormService {
  private final TreatmentPlanFormRepository treatmentPlanFormRepository;

  public TreatmentPlanFormServiceImpl(
      TreatmentPlanFormRepository treatmentPlanFormRepository, PatientService patientService) {
    this.treatmentPlanFormRepository = treatmentPlanFormRepository;
    this.patientService = patientService;
  }

  @Qualifier("PatientServiceImpl")
  private final PatientService patientService;

  @Override
  public TreatmentPlanForm saveTPF(AddTreatmentPlanFormDTO treatmentPlanFormRequest) {

    Patient patient = patientService.findPatientByID(treatmentPlanFormRequest.getPatientNumber());
    TreatmentPlanForm treatmentPlanForm = new TreatmentPlanForm();

    treatmentPlanForm.setProposedTreatmentPlan(treatmentPlanFormRequest.getProposedTreatmentPlan());
    treatmentPlanForm.setClinicianName(treatmentPlanFormRequest.getClinicianName());
    treatmentPlanForm.setClinicianSignature(treatmentPlanFormRequest.getClinicianSignature());
    if (treatmentPlanFormRequest.getClinicianDate() != "") {
      treatmentPlanForm.setClinicianDate(
          java.sql.Date.valueOf(treatmentPlanFormRequest.getClinicianDate()));
    }
    treatmentPlanForm.setFacultyName(treatmentPlanFormRequest.getFacultyName());
    treatmentPlanForm.setFacultySignature(treatmentPlanFormRequest.getFacultySignature());
    if (treatmentPlanFormRequest.getFacultyDate() != "") {
      treatmentPlanForm.setFacultyDate(
          java.sql.Date.valueOf(treatmentPlanFormRequest.getFacultyDate()));
    }

    return this.treatmentPlanFormRepository.save(treatmentPlanForm);
  }
}
