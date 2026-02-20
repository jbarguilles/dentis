package cmsc128.dentapp.modules.periodontal_chart.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.Entities.DTO.CreatePeriodontalChartDTO;
import cmsc128.dentapp.modules.periodontal_chart.dto.PeriodontalChartResponseDTO;
import cmsc128.dentapp.modules.periodontal_chart.dto.PeriodontalChartToothDTO;
import cmsc128.dentapp.modules.periodontal_chart.services.PeriodontalChartService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/periodontal-chart"})
public class PeriodontalChartController {

  private final PeriodontalChartService periodontalChartService;

  public PeriodontalChartController(PeriodontalChartService periodontalChartService) {
    this.periodontalChartService = periodontalChartService;
  }

  @PostMapping(path = {"/create"})
  @ResponseBody
  public ResponseEntity<PeriodontalChartResponseDTO> createPeriodontalChart(
      @RequestBody CreatePeriodontalChartDTO createDTO) {
    try {
      PeriodontalChartResponseDTO response =
          periodontalChartService.createPeriodontalChart(createDTO);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @GetMapping(path = {"/{chartId}"})
  @ResponseBody
  public ResponseEntity<PeriodontalChartResponseDTO> getPeriodontalChartById(
      @PathVariable Long chartId) {
    try {
      PeriodontalChartResponseDTO response =
          periodontalChartService.getPeriodontalChartById(chartId);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping(path = {"/patient/{patientId}"})
  @ResponseBody
  public ResponseEntity<List<PeriodontalChartResponseDTO>> getPeriodontalChartsByPatientId(
      @PathVariable Long patientId) {
    try {
      List<PeriodontalChartResponseDTO> response =
          periodontalChartService.getPeriodontalChartsByPatientId(patientId);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @PutMapping(path = {"/{chartId}"})
  @ResponseBody
  public ResponseEntity<PeriodontalChartResponseDTO> updatePeriodontalChart(
      @PathVariable Long chartId, @RequestBody CreatePeriodontalChartDTO updateDTO) {
    try {
      PeriodontalChartResponseDTO response =
          periodontalChartService.updatePeriodontalChart(chartId, updateDTO);
      return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @DeleteMapping(path = {"/{chartId}"})
  @ResponseBody
  public ResponseEntity<Void> deletePeriodontalChart(@PathVariable Long chartId) {
    try {
      periodontalChartService.deletePeriodontalChart(chartId);
      return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping(path = {"/{chartId}/teeth"})
  @ResponseBody
  public ResponseEntity<List<PeriodontalChartToothDTO>> getTeethByChartId(
      @PathVariable Long chartId) {
    try {
      List<PeriodontalChartToothDTO> teeth = periodontalChartService.getTeethByChartId(chartId);
      return ResponseEntity.ok(teeth);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping(path = {"/{chartId}/tooth/{toothNumber}"})
  @ResponseBody
  public ResponseEntity<PeriodontalChartToothDTO> getToothByChartIdAndToothNumber(
      @PathVariable Long chartId, @PathVariable Integer toothNumber) {
    try {
      PeriodontalChartToothDTO tooth =
          periodontalChartService.getToothByChartIdAndToothNumber(chartId, toothNumber);
      return ResponseEntity.ok(tooth);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping(path = {"/{chartId}/tooth/{toothNumber}"})
  @ResponseBody
  public ResponseEntity<PeriodontalChartToothDTO> updateTooth(
      @PathVariable Long chartId,
      @PathVariable Integer toothNumber,
      @RequestBody PeriodontalChartToothDTO toothDTO) {
    try {
      PeriodontalChartToothDTO updatedTooth =
          periodontalChartService.updateTooth(chartId, toothNumber, toothDTO);
      return ResponseEntity.ok(updatedTooth);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }
}
