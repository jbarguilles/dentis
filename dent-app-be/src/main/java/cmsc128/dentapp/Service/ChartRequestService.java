package cmsc128.dentapp.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.Entities.ChartRequest;
import cmsc128.dentapp.Entities.DTO.AddChartRequestDTO;

@Service
public interface ChartRequestService {
  ChartRequest saveCRF(AddChartRequestDTO addChartRequestDTO);

  List<ChartRequest> getAllChartRequests();

  ChartRequest acceptDenyCRF(Long crfId, String decision);

  List<ChartRequest> getChartRequestsByRequester(String requesterName);

  List<ChartRequest> getChartRequestsByType(String type);
}
