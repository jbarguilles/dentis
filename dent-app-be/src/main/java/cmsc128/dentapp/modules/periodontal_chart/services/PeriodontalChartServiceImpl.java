package cmsc128.dentapp.modules.periodontal_chart.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cmsc128.dentapp.Entities.DTO.CreatePeriodontalChartDTO;
import cmsc128.dentapp.Repositories.PeriodontalChartToothRepository;
import cmsc128.dentapp.modules.patient.entities.Patient;
import cmsc128.dentapp.modules.patient.repositories.PatientRepository;
import cmsc128.dentapp.modules.periodontal_chart.dto.PeriodontalChartResponseDTO;
import cmsc128.dentapp.modules.periodontal_chart.dto.PeriodontalChartToothDTO;
import cmsc128.dentapp.modules.periodontal_chart.entities.PeriodontalChart;
import cmsc128.dentapp.modules.periodontal_chart.entities.PeriodontalChartTooth;
import cmsc128.dentapp.modules.periodontal_chart.repositories.PeriodontalChartRepository;

@Service
public class PeriodontalChartServiceImpl implements PeriodontalChartService {

  private final PeriodontalChartRepository periodontalChartRepository;
  private final PeriodontalChartToothRepository periodontalChartToothRepository;
  private final PatientRepository patientRepository;

  public PeriodontalChartServiceImpl(
      PeriodontalChartRepository periodontalChartRepository,
      PeriodontalChartToothRepository periodontalChartToothRepository,
      PatientRepository patientRepository) {
    this.periodontalChartRepository = periodontalChartRepository;
    this.periodontalChartToothRepository = periodontalChartToothRepository;
    this.patientRepository = patientRepository;
  }

  @Override
  @Transactional
  public PeriodontalChartResponseDTO createPeriodontalChart(CreatePeriodontalChartDTO createDTO) {
    // Validate the request
    validatePeriodontalChart(createDTO);

    // Find patient
    Patient patient =
        patientRepository
            .findById(createDTO.getPatientId())
            .orElseThrow(
                () ->
                    new RuntimeException("Patient not found with ID: " + createDTO.getPatientId()));

    // Create periodontal chart
    PeriodontalChart chart = new PeriodontalChart();
    chart.setPatient(patient);
    chart.setCreatedAt(new Date());
    chart.setUpdatedAt(new Date());

    // Save chart first to get ID
    chart = periodontalChartRepository.save(chart);

    // Create teeth if provided, otherwise create default 32 teeth
    List<PeriodontalChartTooth> teeth = new ArrayList<>();
    if (createDTO.getTeeth() != null && !createDTO.getTeeth().isEmpty()) {
      teeth = createTeethFromDTO(createDTO.getTeeth(), chart);
    } else {
      teeth = createDefaultTeeth(chart);
    }

    // Save all teeth
    teeth = periodontalChartToothRepository.saveAll(teeth);
    chart.setTeeth(teeth);

    return mapToResponseDTO(chart);
  }

  @Override
  public PeriodontalChartResponseDTO getPeriodontalChartById(Long chartId) {
    PeriodontalChart chart =
        periodontalChartRepository
            .findByIdWithTeeth(chartId)
            .orElseThrow(
                () -> new RuntimeException("Periodontal chart not found with ID: " + chartId));

    return mapToResponseDTO(chart);
  }

  @Override
  public List<PeriodontalChartResponseDTO> getPeriodontalChartsByPatientId(Long patientId) {
    List<PeriodontalChart> charts = periodontalChartRepository.findByPatientIdWithTeeth(patientId);
    return charts.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public PeriodontalChartResponseDTO updatePeriodontalChart(
      Long chartId, CreatePeriodontalChartDTO updateDTO) {
    PeriodontalChart chart =
        periodontalChartRepository
            .findByIdWithTeeth(chartId)
            .orElseThrow(
                () -> new RuntimeException("Periodontal chart not found with ID: " + chartId));

    validatePeriodontalChart(updateDTO);

    chart.setUpdatedAt(new Date());

    // Update teeth if provided
    if (updateDTO.getTeeth() != null) {
      updateTeeth(chart, updateDTO.getTeeth());
    }

    chart = periodontalChartRepository.save(chart);
    return mapToResponseDTO(chart);
  }

  @Override
  @Transactional
  public void deletePeriodontalChart(Long chartId) {
    if (!periodontalChartRepository.existsById(chartId)) {
      throw new RuntimeException("Periodontal chart not found with ID: " + chartId);
    }

    // Delete all associated teeth first
    periodontalChartToothRepository.deleteByPeriodontalChart_PeriodontalChartId(chartId);

    // Delete the chart
    periodontalChartRepository.deleteById(chartId);
  }

  @Override
  @Transactional
  public PeriodontalChartToothDTO updateTooth(
      Long chartId, Integer toothNumber, PeriodontalChartToothDTO toothDTO) {
    if (!isValidToothNumber(toothNumber)) {
      throw new IllegalArgumentException("Invalid tooth number: " + toothNumber);
    }

    PeriodontalChartTooth tooth =
        periodontalChartToothRepository
            .findByPeriodontalChart_PeriodontalChartIdAndToothNumber(chartId, toothNumber)
            .orElseThrow(
                () ->
                    new RuntimeException(
                        "Tooth not found: " + toothNumber + " in chart: " + chartId));

    updateToothFromDTO(tooth, toothDTO);
    tooth = periodontalChartToothRepository.save(tooth);

    return mapToToothDTO(tooth);
  }

  @Override
  public PeriodontalChartToothDTO getToothByChartIdAndToothNumber(
      Long chartId, Integer toothNumber) {
    PeriodontalChartTooth tooth =
        periodontalChartToothRepository
            .findByPeriodontalChart_PeriodontalChartIdAndToothNumber(chartId, toothNumber)
            .orElseThrow(
                () ->
                    new RuntimeException(
                        "Tooth not found: " + toothNumber + " in chart: " + chartId));

    return mapToToothDTO(tooth);
  }

  @Override
  public List<PeriodontalChartToothDTO> getTeethByChartId(Long chartId) {
    List<PeriodontalChartTooth> teeth =
        periodontalChartToothRepository.findByChartIdOrderByToothNumber(chartId);
    return teeth.stream().map(this::mapToToothDTO).collect(Collectors.toList());
  }

  @Override
  public boolean isValidToothNumber(Integer toothNumber) {
    if (toothNumber == null) return true; // nullable field

    // FDI tooth numbering system validation
    // Upper right: 11-18, Upper left: 21-28
    // Lower left: 31-38, Lower right: 41-48
    return (toothNumber >= 11 && toothNumber <= 18)
        || (toothNumber >= 21 && toothNumber <= 28)
        || (toothNumber >= 31 && toothNumber <= 38)
        || (toothNumber >= 41 && toothNumber <= 48);
  }

  @Override
  public void validateTeethCount(List<PeriodontalChartToothDTO> teeth) {
    if (teeth != null && teeth.size() > 32) {
      throw new IllegalArgumentException("A periodontal chart cannot have more than 32 teeth");
    }
  }

  @Override
  public void validatePeriodontalChart(CreatePeriodontalChartDTO chartDTO) {
    if (chartDTO.getPatientId() == null) {
      throw new IllegalArgumentException("Patient ID is required");
    }

    validateTeethCount(chartDTO.getTeeth());

    if (chartDTO.getTeeth() != null) {
      for (PeriodontalChartToothDTO tooth : chartDTO.getTeeth()) {
        if (!isValidToothNumber(tooth.getToothNumber())) {
          throw new IllegalArgumentException(
              "Invalid tooth number: "
                  + tooth.getToothNumber()
                  + ". Valid ranges: 11-18, 21-28, 31-38, 41-48");
        }
      }
    }
  }

  // Helper methods
  private List<PeriodontalChartTooth> createDefaultTeeth(PeriodontalChart chart) {
    List<PeriodontalChartTooth> teeth = new ArrayList<>();

    // Create all 32 teeth using FDI numbering
    int[] toothNumbers = {
      11, 12, 13, 14, 15, 16, 17, 18, // Upper right
      21, 22, 23, 24, 25, 26, 27, 28, // Upper left
      31, 32, 33, 34, 35, 36, 37, 38, // Lower left
      41, 42, 43, 44, 45, 46, 47, 48 // Lower right
    };

    for (int toothNumber : toothNumbers) {
      PeriodontalChartTooth tooth = new PeriodontalChartTooth();
      tooth.setToothNumber(toothNumber);
      tooth.setPeriodontalChart(chart);
      teeth.add(tooth);
    }

    return teeth;
  }

  private List<PeriodontalChartTooth> createTeethFromDTO(
      List<PeriodontalChartToothDTO> teethDTO, PeriodontalChart chart) {
    return teethDTO.stream()
        .map(
            dto -> {
              PeriodontalChartTooth tooth = new PeriodontalChartTooth();
              updateToothFromDTO(tooth, dto);
              tooth.setPeriodontalChart(chart);
              return tooth;
            })
        .collect(Collectors.toList());
  }

  private void updateTeeth(PeriodontalChart chart, List<PeriodontalChartToothDTO> teethDTO) {
    for (PeriodontalChartToothDTO toothDTO : teethDTO) {
      Optional<PeriodontalChartTooth> existingTooth =
          chart.getTeeth().stream()
              .filter(tooth -> tooth.getToothNumber().equals(toothDTO.getToothNumber()))
              .findFirst();

      if (existingTooth.isPresent()) {
        updateToothFromDTO(existingTooth.get(), toothDTO);
      }
    }
  }

  private void updateToothFromDTO(PeriodontalChartTooth tooth, PeriodontalChartToothDTO dto) {
    if (dto.getToothNumber() != null) tooth.setToothNumber(dto.getToothNumber());

    // PI fields
    tooth.setTopPi(dto.getTopPi());
    tooth.setBottomPi(dto.getBottomPi());

    // BOP fields
    tooth.setTopLeftBop(dto.getTopLeftBop());
    tooth.setTopMidBop(dto.getTopMidBop());
    tooth.setTopRightBop(dto.getTopRightBop());
    tooth.setBotLeftBop(dto.getBotLeftBop());
    tooth.setBotMidBop(dto.getBotMidBop());
    tooth.setBotRightBop(dto.getBotRightBop());

    // Other fields
    tooth.setMob(dto.getMob());
    tooth.setSup(dto.getSup());

    // CAL fields
    tooth.setTopLeftCal(dto.getTopLeftCal());
    tooth.setTopMidCal(dto.getTopMidCal());
    tooth.setTopRightCal(dto.getTopRightCal());
    tooth.setBotLeftCal(dto.getBotLeftCal());
    tooth.setBotMidCal(dto.getBotMidCal());
    tooth.setBotRightCal(dto.getBotRightCal());

    // PPD fields
    tooth.setPpdLeft(dto.getPpdLeft());
    tooth.setPpdMid(dto.getPpdMid());
    tooth.setPpdRight(dto.getPpdRight());

    // CEJGM fields
    tooth.setCejgmLeft(dto.getCejgmLeft());
    tooth.setCejgmMid(dto.getCejgmMid());
    tooth.setCejgmRight(dto.getCejgmRight());
  }

  private PeriodontalChartResponseDTO mapToResponseDTO(PeriodontalChart chart) {
    PeriodontalChartResponseDTO dto = new PeriodontalChartResponseDTO();
    dto.setPeriodontalChartId(chart.getPeriodontalChartId());
    dto.setPatientId(chart.getPatient().getPatientID());
    dto.setCreatedAt(chart.getCreatedAt());
    dto.setUpdatedAt(chart.getUpdatedAt());

    if (chart.getTeeth() != null) {
      List<PeriodontalChartToothDTO> teethDTO =
          chart.getTeeth().stream().map(this::mapToToothDTO).collect(Collectors.toList());
      dto.setTeeth(teethDTO);
    }

    return dto;
  }

  private PeriodontalChartToothDTO mapToToothDTO(PeriodontalChartTooth tooth) {
    PeriodontalChartToothDTO dto = new PeriodontalChartToothDTO();
    dto.setToothId(tooth.getToothId());
    dto.setToothNumber(tooth.getToothNumber());

    // PI fields
    dto.setTopPi(tooth.getTopPi());
    dto.setBottomPi(tooth.getBottomPi());

    // BOP fields
    dto.setTopLeftBop(tooth.getTopLeftBop());
    dto.setTopMidBop(tooth.getTopMidBop());
    dto.setTopRightBop(tooth.getTopRightBop());
    dto.setBotLeftBop(tooth.getBotLeftBop());
    dto.setBotMidBop(tooth.getBotMidBop());
    dto.setBotRightBop(tooth.getBotRightBop());

    // Other fields
    dto.setMob(tooth.getMob());
    dto.setSup(tooth.getSup());

    // CAL fields
    dto.setTopLeftCal(tooth.getTopLeftCal());
    dto.setTopMidCal(tooth.getTopMidCal());
    dto.setTopRightCal(tooth.getTopRightCal());
    dto.setBotLeftCal(tooth.getBotLeftCal());
    dto.setBotMidCal(tooth.getBotMidCal());
    dto.setBotRightCal(tooth.getBotRightCal());

    // PPD fields
    dto.setPpdLeft(tooth.getPpdLeft());
    dto.setPpdMid(tooth.getPpdMid());
    dto.setPpdRight(tooth.getPpdRight());

    // CEJGM fields
    dto.setCejgmLeft(tooth.getCejgmLeft());
    dto.setCejgmMid(tooth.getCejgmMid());
    dto.setCejgmRight(tooth.getCejgmRight());

    return dto;
  }
}
