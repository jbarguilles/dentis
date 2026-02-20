package cmsc128.dentapp.modules.periodontal_chart.entities;

import java.util.Date;
import java.util.List;

import cmsc128.dentapp.modules.patient.entities.Patient;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "PERIODONTAL_CHART")
@Data
@NoArgsConstructor
public class PeriodontalChart {
  @Id
  @SequenceGenerator(
      name = "PERIODONTAL_CHART_SEQ",
      sequenceName = "PERIODONTAL_CHART_SEQ",
      allocationSize = 1)
  @Column(name = "PERIODONTAL_CHART_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "PERIODONTAL_CHART_SEQ")
  private Long periodontalChartId;

  @Column(name = "CREATED_AT", nullable = false)
  private Date createdAt;

  @Column(name = "UPDATED_AT", nullable = false)
  private Date updatedAt;

  // ===== RELATIONSHIPS =====
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "PATIENT_ID")
  private Patient patient;

  @OneToMany(mappedBy = "periodontalChart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @Size(max = 32, message = "A periodontal chart can have a maximum of 32 teeth")
  private List<PeriodontalChartTooth> teeth;
}
