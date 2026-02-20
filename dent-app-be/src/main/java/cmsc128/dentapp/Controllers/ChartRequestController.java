package cmsc128.dentapp.Controllers;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.Entities.ChartRequest;
import cmsc128.dentapp.Entities.DTO.AddChartRequestDTO;
import cmsc128.dentapp.Service.ChartRequestService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/chartrequest"})
public class ChartRequestController {
  private final ChartRequestService chartRequestService;

  public ChartRequestController(ChartRequestService chartRequestService) {
    this.chartRequestService = chartRequestService;
  }

  @PostMapping(path = "/add")
  ChartRequest addCRF(@RequestBody AddChartRequestDTO addChartRequestDTO) {
    return this.chartRequestService.saveCRF(addChartRequestDTO);
  }

  @GetMapping(path = "/getall")
  List<ChartRequest> getAllChartRequests() {
    return this.chartRequestService.getAllChartRequests();
  }

  @PutMapping(path = "/decide")
  ChartRequest acceptDenyCRF(@RequestParam Long crfId, @RequestParam String decision) {
    return this.chartRequestService.acceptDenyCRF(crfId, decision);
  }

  @GetMapping(path = "/requester/{requesterName}")
  List<ChartRequest> getChartRequestsByRequester(@PathVariable String requesterName) {
    // Decode the URL-encoded name (handles spaces and special characters)
    String decodedName = URLDecoder.decode(requesterName, StandardCharsets.UTF_8);
    return this.chartRequestService.getChartRequestsByRequester(decodedName);
  }

  @GetMapping(path = "/type/{type}")
  List<ChartRequest> getChartRequestsByType(@PathVariable String type) {
    return this.chartRequestService.getChartRequestsByType(type);
  }
}
