package cmsc128.dentapp.Entities;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "CHART_REQUEST")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChartRequest {
  @Id
  @SequenceGenerator(name = "CRF_SEQ", sequenceName = "CRF_SEQ", allocationSize = 1)
  @Column(name = "CRF_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "CRF_SEQ")
  private Long crfId;

  @Column(name = "REQUESTER_NAME")
  private String requesterName;

  @Column(name = "CRF_DATE")
  private Date crfDate;

  @Column(name = "TIME")
  private LocalDateTime time;

  @Column(name = "PURPOSE", length = 50)
  private String purpose;

  @Column(name = "CHART_NUMBER_REQUESTED", length = 6)
  private Long chartNumberRequested;

  @Column(name = "SECTION", length = 10)
  private String section;

  @Column(name = "STATUS")
  private String status;

  @Column(name = "TYPE")
  private String type;
}
