package cmsc128.dentapp.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.Entities.ChartRequest;
import cmsc128.dentapp.Entities.DTO.AddChartRequestDTO;
import cmsc128.dentapp.Repositories.ChartRequestRepository;

@Service
public class ChartRequestServiceImpl implements ChartRequestService {
  private final ChartRequestRepository chartRequestRepository;

  public ChartRequestServiceImpl(ChartRequestRepository chartRequestRepository) {
    this.chartRequestRepository = chartRequestRepository;
  }

  @Override
  public ChartRequest saveCRF(AddChartRequestDTO addChartRequestDTO) {
    ChartRequest chartRequest = addChartRequestDTO.mapToCRF();
    return this.chartRequestRepository.save(chartRequest);
  }

  @Override
  public List<ChartRequest> getAllChartRequests() {
    return this.chartRequestRepository.findAll();
  }

  @Override
  public ChartRequest acceptDenyCRF(Long crfId, String decision) {
    ChartRequest chartRequest = chartRequestRepository.findByCrfId(crfId);
    chartRequest.setStatus(decision);
    chartRequestRepository.save(chartRequest);
    return null;
  }

  @Override
  public List<ChartRequest> getChartRequestsByRequester(String requesterName) {
    return chartRequestRepository.findByRequesterName(requesterName);
  }

  @Override
  public List<ChartRequest> getChartRequestsByType(String type) {
    return chartRequestRepository.findByType(type);
  }
}
