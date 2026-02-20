package cmsc128.dentapp.modules.treatment_plan_form.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.treatment_plan_form.entities.TreatmentPlanForm;

@Repository
public interface TreatmentPlanFormRepository extends JpaRepository<TreatmentPlanForm, Long> {}
