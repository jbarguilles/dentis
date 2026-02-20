package cmsc128.dentapp.modules.physical_assessment.services;

import java.util.List;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.physical_assessment.dto.PhysicalAssessmentDTO;
import cmsc128.dentapp.modules.physical_assessment.entities.PhysicalAssessment;
import cmsc128.dentapp.modules.physical_assessment.repositories.PhysicalAssessmentRepository;

@Service
public class PhysicalAssessmentServiceImpl implements PhysicalAssessmentService {

  private final PhysicalAssessmentRepository physicalAssessmentRepository;

  public PhysicalAssessmentServiceImpl(PhysicalAssessmentRepository physicalAssessmentRepository) {
    this.physicalAssessmentRepository = physicalAssessmentRepository;
  }

  @Override
  public PhysicalAssessment findPhysicalAssessmentById(Long physicalAssessmentId) {
    return physicalAssessmentRepository.findPhysicalAssessmentByPhysicalAssessmentId(
        physicalAssessmentId);
  }

  @Override
  public PhysicalAssessment addPhysicalAssessment(PhysicalAssessmentDTO physicalAssessmentDTO) {
    PhysicalAssessment physicalAssessment = physicalAssessmentDTO.mapToPhysicalAssessment();
    return this.physicalAssessmentRepository.save(physicalAssessment);
  }

  @Override
  public PhysicalAssessment editPhysicalAssessment(
      Long physicalAssessmentId, PhysicalAssessmentDTO physicalAssessmentDTO) {
    PhysicalAssessment physicalAssessment = findPhysicalAssessmentById(physicalAssessmentId);

    //        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    //        try {
    //            Date date = dateFormat.parse(physicalAssessmentDTO.getDate());
    //            physicalAssessment.setDate(date);
    //        } catch (ParseException e) {
    //            e.printStackTrace();
    //        }

    physicalAssessment.setGait(physicalAssessmentDTO.getGait());
    physicalAssessment.setAppearance(physicalAssessmentDTO.getAppearance());
    physicalAssessment.setDefects(physicalAssessmentDTO.getDefects());
    physicalAssessment.setWeight(physicalAssessmentDTO.getWeight());
    physicalAssessment.setHeight(physicalAssessmentDTO.getHeight());
    physicalAssessment.setBloodPressure(physicalAssessmentDTO.getBloodPressure());
    physicalAssessment.setPulseRate(physicalAssessmentDTO.getPulseRate());
    physicalAssessment.setRespiratoryRate(physicalAssessmentDTO.getRespiratoryRate());
    physicalAssessment.setTemperature(physicalAssessmentDTO.getTemperature());

    return this.physicalAssessmentRepository.save(physicalAssessment);
  }

  @Override
  public List<PhysicalAssessment> findByPatientId(Long patientId) {
    return physicalAssessmentRepository.findByPatientId(patientId);
  }

  @Override
  public List<PhysicalAssessment> findByPatientNumber(String patientNumber) {
    return physicalAssessmentRepository.findByPatientNumber(patientNumber);
  }

  @Override
  public PhysicalAssessment findLatestByPatientNumber(String patientNumber) {
    return physicalAssessmentRepository.findLatestByPatientNumber(patientNumber);
  }

  @Override
  public Long findLatestPhysicalAssessmentId() {
    PhysicalAssessment latestPhysicalAssessment =
        physicalAssessmentRepository.findTopByOrderByPhysicalAssessmentIdDesc();
    return (latestPhysicalAssessment == null)
        ? 0
        : latestPhysicalAssessment.getPhysicalAssessmentId();
  }
}
