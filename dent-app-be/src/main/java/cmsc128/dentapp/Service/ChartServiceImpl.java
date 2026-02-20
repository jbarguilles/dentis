package cmsc128.dentapp.Service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.chart.dto.AddChartDTO;
import cmsc128.dentapp.modules.chart.entities.Chart;
import cmsc128.dentapp.modules.chart.repositories.ChartRepository;
import cmsc128.dentapp.modules.chart.services.ChartService;
import cmsc128.dentapp.modules.patient.services.PatientService;

@Service
public class ChartServiceImpl implements ChartService {
  private final ChartRepository chartRepository;

  @Qualifier("PatientServiceImpl")
  private final PatientService patientService;

  private final FileStorageService fileStorageService;

  public ChartServiceImpl(
      ChartRepository chartRepository,
      PatientService patientService,
      FileStorageService fileStorageService) {
    this.chartRepository = chartRepository;
    this.patientService = patientService;
    this.fileStorageService = fileStorageService;
  }

  @Override
  public Chart saveChart(AddChartDTO addChartDTO) {
    try {
      //            Patient patient =
      // patientService.findPatientByID(Long.valueOf(addChartDTO.getPatientNumber()));
      Chart chart = new Chart();

      // Save image files and set paths
      if (addChartDTO.getTeeth11() != null && addChartDTO.getTeeth11().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth11", addChartDTO.getTeeth11());
        chart.setTeeth11Path(path);
      }
      if (addChartDTO.getTeeth12() != null && addChartDTO.getTeeth12().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth12", addChartDTO.getTeeth12());
        chart.setTeeth12Path(path);
      }
      if (addChartDTO.getTeeth13() != null && addChartDTO.getTeeth13().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth13", addChartDTO.getTeeth13());
        chart.setTeeth13Path(path);
      }
      if (addChartDTO.getTeeth14() != null && addChartDTO.getTeeth14().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth14", addChartDTO.getTeeth14());
        chart.setTeeth14Path(path);
      }
      if (addChartDTO.getTeeth15() != null && addChartDTO.getTeeth15().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth15", addChartDTO.getTeeth15());
        chart.setTeeth15Path(path);
      }
      if (addChartDTO.getTeeth16() != null && addChartDTO.getTeeth16().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth16", addChartDTO.getTeeth16());
        chart.setTeeth16Path(path);
      }
      if (addChartDTO.getTeeth17() != null && addChartDTO.getTeeth17().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth17", addChartDTO.getTeeth17());
        chart.setTeeth17Path(path);
      }
      if (addChartDTO.getTeeth18() != null && addChartDTO.getTeeth18().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth18", addChartDTO.getTeeth18());
        chart.setTeeth18Path(path);
      }

      if (addChartDTO.getTeeth21() != null && addChartDTO.getTeeth21().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth21", addChartDTO.getTeeth21());
        chart.setTeeth21Path(path);
      }
      if (addChartDTO.getTeeth22() != null && addChartDTO.getTeeth22().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth22", addChartDTO.getTeeth22());
        chart.setTeeth22Path(path);
      }
      if (addChartDTO.getTeeth23() != null && addChartDTO.getTeeth23().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth23", addChartDTO.getTeeth23());
        chart.setTeeth23Path(path);
      }
      if (addChartDTO.getTeeth24() != null && addChartDTO.getTeeth24().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth24", addChartDTO.getTeeth24());
        chart.setTeeth24Path(path);
      }
      if (addChartDTO.getTeeth25() != null && addChartDTO.getTeeth25().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth25", addChartDTO.getTeeth25());
        chart.setTeeth25Path(path);
      }
      if (addChartDTO.getTeeth26() != null && addChartDTO.getTeeth26().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth26", addChartDTO.getTeeth26());
        chart.setTeeth26Path(path);
      }
      if (addChartDTO.getTeeth27() != null && addChartDTO.getTeeth27().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth27", addChartDTO.getTeeth27());
        chart.setTeeth27Path(path);
      }
      if (addChartDTO.getTeeth28() != null && addChartDTO.getTeeth28().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth28", addChartDTO.getTeeth28());
        chart.setTeeth28Path(path);
      }

      if (addChartDTO.getTeeth31() != null && addChartDTO.getTeeth31().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth31", addChartDTO.getTeeth31());
        chart.setTeeth31Path(path);
      }
      if (addChartDTO.getTeeth32() != null && addChartDTO.getTeeth32().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth32", addChartDTO.getTeeth32());
        chart.setTeeth32Path(path);
      }
      if (addChartDTO.getTeeth33() != null && addChartDTO.getTeeth33().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth33", addChartDTO.getTeeth33());
        chart.setTeeth33Path(path);
      }
      if (addChartDTO.getTeeth34() != null && addChartDTO.getTeeth34().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth34", addChartDTO.getTeeth34());
        chart.setTeeth34Path(path);
      }
      if (addChartDTO.getTeeth35() != null && addChartDTO.getTeeth35().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth35", addChartDTO.getTeeth35());
        chart.setTeeth35Path(path);
      }
      if (addChartDTO.getTeeth36() != null && addChartDTO.getTeeth36().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth36", addChartDTO.getTeeth36());
        chart.setTeeth36Path(path);
      }
      if (addChartDTO.getTeeth37() != null && addChartDTO.getTeeth37().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth37", addChartDTO.getTeeth37());
        chart.setTeeth37Path(path);
      }
      if (addChartDTO.getTeeth38() != null && addChartDTO.getTeeth38().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth38", addChartDTO.getTeeth38());
        chart.setTeeth38Path(path);
      }

      if (addChartDTO.getTeeth41() != null && addChartDTO.getTeeth41().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth41", addChartDTO.getTeeth41());
        chart.setTeeth41Path(path);
      }
      if (addChartDTO.getTeeth42() != null && addChartDTO.getTeeth42().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth42", addChartDTO.getTeeth42());
        chart.setTeeth42Path(path);
      }
      if (addChartDTO.getTeeth43() != null && addChartDTO.getTeeth43().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth43", addChartDTO.getTeeth43());
        chart.setTeeth43Path(path);
      }
      if (addChartDTO.getTeeth44() != null && addChartDTO.getTeeth44().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth44", addChartDTO.getTeeth44());
        chart.setTeeth44Path(path);
      }
      if (addChartDTO.getTeeth45() != null && addChartDTO.getTeeth45().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth45", addChartDTO.getTeeth45());
        chart.setTeeth45Path(path);
      }
      if (addChartDTO.getTeeth46() != null && addChartDTO.getTeeth46().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth46", addChartDTO.getTeeth46());
        chart.setTeeth46Path(path);
      }
      if (addChartDTO.getTeeth47() != null && addChartDTO.getTeeth47().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth47", addChartDTO.getTeeth47());
        chart.setTeeth47Path(path);
      }
      if (addChartDTO.getTeeth48() != null && addChartDTO.getTeeth48().length > 0) {
        String path = fileStorageService.saveChartImage(1, "teeth48", addChartDTO.getTeeth48());
        chart.setTeeth48Path(path);
      }

      // Save EC images
      if (addChartDTO.getEC11() != null && addChartDTO.getEC11().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC11", addChartDTO.getEC11());
        chart.setEC11Path(path);
      }
      if (addChartDTO.getEC12() != null && addChartDTO.getEC12().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC12", addChartDTO.getEC12());
        chart.setEC12Path(path);
      }
      if (addChartDTO.getEC13() != null && addChartDTO.getEC13().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC13", addChartDTO.getEC13());
        chart.setEC13Path(path);
      }
      if (addChartDTO.getEC14() != null && addChartDTO.getEC14().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC14", addChartDTO.getEC14());
        chart.setEC14Path(path);
      }
      if (addChartDTO.getEC15() != null && addChartDTO.getEC15().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC15", addChartDTO.getEC15());
        chart.setEC15Path(path);
      }
      if (addChartDTO.getEC16() != null && addChartDTO.getEC16().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC16", addChartDTO.getEC16());
        chart.setEC16Path(path);
      }
      if (addChartDTO.getEC17() != null && addChartDTO.getEC17().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC17", addChartDTO.getEC17());
        chart.setEC17Path(path);
      }
      if (addChartDTO.getEC18() != null && addChartDTO.getEC18().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC18", addChartDTO.getEC18());
        chart.setEC18Path(path);
      }

      if (addChartDTO.getEC21() != null && addChartDTO.getEC21().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC21", addChartDTO.getEC21());
        chart.setEC21Path(path);
      }
      if (addChartDTO.getEC22() != null && addChartDTO.getEC22().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC22", addChartDTO.getEC22());
        chart.setEC22Path(path);
      }
      if (addChartDTO.getEC23() != null && addChartDTO.getEC23().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC23", addChartDTO.getEC23());
        chart.setEC23Path(path);
      }
      if (addChartDTO.getEC24() != null && addChartDTO.getEC24().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC24", addChartDTO.getEC24());
        chart.setEC24Path(path);
      }
      if (addChartDTO.getEC25() != null && addChartDTO.getEC25().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC25", addChartDTO.getEC25());
        chart.setEC25Path(path);
      }
      if (addChartDTO.getEC26() != null && addChartDTO.getEC26().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC26", addChartDTO.getEC26());
        chart.setEC26Path(path);
      }
      if (addChartDTO.getEC27() != null && addChartDTO.getEC27().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC27", addChartDTO.getEC27());
        chart.setEC27Path(path);
      }
      if (addChartDTO.getEC28() != null && addChartDTO.getEC28().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC28", addChartDTO.getEC28());
        chart.setEC28Path(path);
      }

      if (addChartDTO.getEC31() != null && addChartDTO.getEC31().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC31", addChartDTO.getEC31());
        chart.setEC31Path(path);
      }
      if (addChartDTO.getEC32() != null && addChartDTO.getEC32().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC32", addChartDTO.getEC32());
        chart.setEC32Path(path);
      }
      if (addChartDTO.getEC33() != null && addChartDTO.getEC33().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC33", addChartDTO.getEC33());
        chart.setEC33Path(path);
      }
      if (addChartDTO.getEC34() != null && addChartDTO.getEC34().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC34", addChartDTO.getEC34());
        chart.setEC34Path(path);
      }
      if (addChartDTO.getEC35() != null && addChartDTO.getEC35().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC35", addChartDTO.getEC35());
        chart.setEC35Path(path);
      }
      if (addChartDTO.getEC36() != null && addChartDTO.getEC36().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC36", addChartDTO.getEC36());
        chart.setEC36Path(path);
      }
      if (addChartDTO.getEC37() != null && addChartDTO.getEC37().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC37", addChartDTO.getEC37());
        chart.setEC37Path(path);
      }
      if (addChartDTO.getEC38() != null && addChartDTO.getEC38().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC38", addChartDTO.getEC38());
        chart.setEC38Path(path);
      }

      if (addChartDTO.getEC41() != null && addChartDTO.getEC41().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC41", addChartDTO.getEC41());
        chart.setEC41Path(path);
      }
      if (addChartDTO.getEC42() != null && addChartDTO.getEC42().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC42", addChartDTO.getEC42());
        chart.setEC42Path(path);
      }
      if (addChartDTO.getEC43() != null && addChartDTO.getEC43().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC43", addChartDTO.getEC43());
        chart.setEC43Path(path);
      }
      if (addChartDTO.getEC44() != null && addChartDTO.getEC44().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC44", addChartDTO.getEC44());
        chart.setEC44Path(path);
      }
      if (addChartDTO.getEC45() != null && addChartDTO.getEC45().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC45", addChartDTO.getEC45());
        chart.setEC45Path(path);
      }
      if (addChartDTO.getEC46() != null && addChartDTO.getEC46().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC46", addChartDTO.getEC46());
        chart.setEC46Path(path);
      }
      if (addChartDTO.getEC47() != null && addChartDTO.getEC47().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC47", addChartDTO.getEC47());
        chart.setEC47Path(path);
      }
      if (addChartDTO.getEC48() != null && addChartDTO.getEC48().length > 0) {
        String path = fileStorageService.saveChartImage(1, "EC48", addChartDTO.getEC48());
        chart.setEC48Path(path);
      }

      chart.setTreatmentPlans(addChartDTO.getTreatmentPlans());
      chart.setLesionStatuses(addChartDTO.getLesionStatuses());
      chart.setIcdasCodes(addChartDTO.getIcdasCodes());

      //            chart.setPatient(patient);
      return this.chartRepository.save(chart);
    } catch (IOException e) {
      throw new RuntimeException("Error saving chart images: " + e.getMessage(), e);
    }
  }

  @Override
  public Chart findByID(Long chartID) {
    return this.chartRepository.findByChartID(chartID);
  }

  //    @Override
  //    public Chart findByPatientID(Long patientID) {
  //        return this.chartRepository.findByPatient_PatientID(patientID);
  //    }
}
