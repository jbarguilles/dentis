package cmsc128.dentapp.Service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.medical_history.dto.AddMedicalHistoryDTO;
import cmsc128.dentapp.modules.medical_history.entities.MedicalHistoryChart;
import cmsc128.dentapp.modules.medical_history.repositories.MedicalHistoryChartRepository;
import cmsc128.dentapp.modules.medical_history.services.MedicalHistoryChartService;
import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.services.PatientService;

@Service
public class MedicalHistoryChartServiceImpl implements MedicalHistoryChartService {
  private final MedicalHistoryChartRepository medicalHistoryChartRepository;

  @Qualifier("PatientServiceImpl")
  private final PatientService patientService;

  public MedicalHistoryChartServiceImpl(
      MedicalHistoryChartRepository medicalHistoryChartRepository, PatientService patientService) {
    this.medicalHistoryChartRepository = medicalHistoryChartRepository;
    this.patientService = patientService;
  }

  @Override
  public MedicalHistoryChart addMHC(AddMedicalHistoryDTO medicalHistoryRequest) {

    Patient patient =
        patientService.findPatientByID(Long.valueOf(medicalHistoryRequest.getPatientNumber()));
    MedicalHistoryChart medicalHistoryChart = new MedicalHistoryChart();

    medicalHistoryChart.setHighBloodPressure(medicalHistoryRequest.getHighBloodPressure());
    medicalHistoryChart.setHeartAttack(medicalHistoryRequest.getHeartAttack());
    medicalHistoryChart.setAnginaPectorisChestPain(
        medicalHistoryRequest.getAnginaPectorisChestPain());
    medicalHistoryChart.setSwollenAnkles(medicalHistoryRequest.getSwollenAnkles());
    medicalHistoryChart.setFrequentHighFever(medicalHistoryRequest.getFrequentHighFever());
    medicalHistoryChart.setPacemakersArtificialHeartValves(
        medicalHistoryRequest.getPacemakersArtificialHeartValves());
    medicalHistoryChart.setEmphysema(medicalHistoryRequest.getEmphysema());
    medicalHistoryChart.setAsthma(medicalHistoryRequest.getAsthma());
    medicalHistoryChart.setAfternoonFever(medicalHistoryRequest.getAfternoonFever());
    medicalHistoryChart.setChronicCough(medicalHistoryRequest.getChronicCough());
    medicalHistoryChart.setBreathingProblems(medicalHistoryRequest.getBreathingProblems());
    medicalHistoryChart.setBloodySputum(medicalHistoryRequest.getBloodySputum());
    medicalHistoryChart.setSinusitis(medicalHistoryRequest.getSinusitis());
    medicalHistoryChart.setFrequentHeadaches(medicalHistoryRequest.getFrequentHeadaches());
    medicalHistoryChart.setDizziness(medicalHistoryRequest.getDizziness());
    medicalHistoryChart.setFaintingSpellOrLossOfConsciousness(
        medicalHistoryRequest.getFaintingSpellOrLossOfConsciousness());
    medicalHistoryChart.setVisualImpairment(medicalHistoryRequest.getVisualImpairment());
    medicalHistoryChart.setArthritis(medicalHistoryRequest.getArthritis());
    medicalHistoryChart.setPainInJoints(medicalHistoryRequest.getPainInJoints());
    medicalHistoryChart.setTremors(medicalHistoryRequest.getTremors());
    medicalHistoryChart.setBloodTransfusion(medicalHistoryRequest.getBloodTransfusion());
    medicalHistoryChart.setDeniedPermissionToGiveBlood(
        medicalHistoryRequest.getDeniedPermissionToGiveBlood());
    medicalHistoryChart.setPallor(medicalHistoryRequest.getPallor());
    medicalHistoryChart.setDiabetes(medicalHistoryRequest.getDiabetes());
    medicalHistoryChart.setGoiter(medicalHistoryRequest.getGoiter());
    medicalHistoryChart.setBleedingOrBruisingTendency(
        medicalHistoryRequest.getBleedingOrBruisingTendency());
    medicalHistoryChart.setSuddenWeightLossGain(medicalHistoryRequest.getSuddenWeightLossGain());
    medicalHistoryChart.setFrequentThirst(medicalHistoryRequest.getFrequentThirst());
    medicalHistoryChart.setFrequentHunger(medicalHistoryRequest.getFrequentHunger());
    medicalHistoryChart.setFrequentUrination(medicalHistoryRequest.getFrequentUrination());
    medicalHistoryChart.setChemotherapy(medicalHistoryRequest.getChemotherapy());
    medicalHistoryChart.setPainUponUrination(medicalHistoryRequest.getPainUponUrination());
    medicalHistoryChart.setBloodOrPushInUrine(medicalHistoryRequest.getBloodOrPushInUrine());
    medicalHistoryChart.setPelvicOrLowerAbdominalDiscomfort(
        medicalHistoryRequest.getPelvicOrLowerAbdominalDiscomfort());
    medicalHistoryChart.setNervousness(medicalHistoryRequest.getNervousness());
    medicalHistoryChart.setDepression(medicalHistoryRequest.getDepression());
    medicalHistoryChart.setAnxiety(medicalHistoryRequest.getAnxiety());
    medicalHistoryChart.setS1Others(medicalHistoryRequest.getS1Others());
    medicalHistoryChart.setS1OthersSpecify(medicalHistoryRequest.getS1OthersSpecify());
    medicalHistoryChart.setFhDiabetes(medicalHistoryRequest.getFhDiabetes());
    medicalHistoryChart.setFhHeartDisease(medicalHistoryRequest.getFhHeartDisease());
    medicalHistoryChart.setFhBleedingDisorders(medicalHistoryRequest.getFhBleedingDisorders());
    medicalHistoryChart.setFhCancer(medicalHistoryRequest.getFhCancer());
    medicalHistoryChart.setFhOthers(medicalHistoryRequest.getFhOthers());
    medicalHistoryChart.setFhOthersSpecify(medicalHistoryRequest.getFhOthersSpecify());

    medicalHistoryChart.setAllergiesDrugs(medicalHistoryRequest.getAllergiesDrugs());
    medicalHistoryChart.setAllergiesDrugsSpecify(medicalHistoryRequest.getAllergiesDrugsSpecify());
    medicalHistoryChart.setAllergiesFood(medicalHistoryRequest.getAllergiesFood());
    medicalHistoryChart.setAllergiesFoodSpecify(medicalHistoryRequest.getAllergiesFoodSpecify());
    medicalHistoryChart.setAllergiesRubber(medicalHistoryRequest.getAllergiesRubber());
    medicalHistoryChart.setAllergiesRubberSpecify(
        medicalHistoryRequest.getAllergiesRubberSpecify());
    medicalHistoryChart.setAllergiesOthers(medicalHistoryRequest.getAllergiesOthers());
    medicalHistoryChart.setAllergiesOthersSpecify(
        medicalHistoryRequest.getAllergiesOthersSpecify());

    medicalHistoryChart.setFemalesPregnant(medicalHistoryRequest.getFemalesPregnant());
    medicalHistoryChart.setFemalesPregnantMonths(medicalHistoryRequest.getFemalesPregnantMonths());
    medicalHistoryChart.setFemalesBreastfeeding(medicalHistoryRequest.getFemalesBreastfeeding());
    medicalHistoryChart.setFemalesUnderHrt(medicalHistoryRequest.getFemalesUnderHrt());
    medicalHistoryChart.setFemalesMenstruation(medicalHistoryRequest.getFemalesMenstruation());
    medicalHistoryChart.setFemalesContraceptive(medicalHistoryRequest.getFemalesContraceptive());
    medicalHistoryChart.setFemalesContraceptiveSpecify(
        medicalHistoryRequest.getFemalesContraceptiveSpecify());

    return medicalHistoryChartRepository.save(medicalHistoryChart);
  }
}
