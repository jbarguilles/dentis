package cmsc128.dentapp.modules.chart.controllers;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.modules.chart.dto.AddChartDTO;
import cmsc128.dentapp.modules.chart.entities.Chart;
import cmsc128.dentapp.modules.chart.services.ChartService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/chart"})
public class ChartController {

  private final ChartService chartService;

  public ChartController(ChartService chartService) {
    this.chartService = chartService;
  }

  @PostMapping(path = {"/save"})
  @ResponseBody
  public Chart saveChart(@RequestBody AddChartDTO addChartDTO) {
    return this.chartService.saveChart(addChartDTO);
  }

  @GetMapping(path = {"/findbyid"})
  @ResponseBody
  public Chart findByID(@RequestParam(value = "chartid") Long chartID) {
    return chartService.findByID(chartID);
  }

  //    @GetMapping(path={"/findbypatient"})
  //    @ResponseBody
  //    public Chart findByPatientID(@RequestParam(value="patientid") Long patientID){
  //        return this.chartService.findByPatientID(patientID);
  //    }
}
