package cmsc128.dentapp.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.Entities.ChartRequest;

@Repository
public interface ChartRequestRepository extends JpaRepository<ChartRequest, Long> {
  ChartRequest findByCrfId(Long crfId);

  List<ChartRequest> findByRequesterName(String requesterName);

  List<ChartRequest> findByType(String type);
}
