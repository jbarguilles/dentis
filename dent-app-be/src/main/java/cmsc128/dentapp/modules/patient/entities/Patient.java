package cmsc128.dentapp.modules.patient.entities;

import java.util.Date;
import java.util.List;

import cmsc128.dentapp.modules.chart.entities.Chart;
import cmsc128.dentapp.modules.periodontal_chart.entities.PeriodontalChart;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "PATIENT")
@Data
@NoArgsConstructor
public class Patient {
  @Id
  @SequenceGenerator(name = "PATIENT_SEQ", sequenceName = "PATIENT_SEQ", allocationSize = 1)
  @Column(name = "PATIENT_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "PATIENT_SEQ")
  private long patientID;

  @Column(name = "PATIENT_NUMBER", nullable = false)
  private String patientNumber;

  @Column(name = "REGISTRATION_DATE", nullable = false)
  private Date registrationDate;

  @Column(name = "LAST_NAME", nullable = false)
  private String lastName;

  @Column(name = "FIRST_NAME", nullable = false)
  private String firstName;

  @Column(name = "MIDDLE_NAME", nullable = false)
  private String middleName;

  @Column(name = "SUFFIX", nullable = true)
  private String suffix;

  @Column(name = "sex", nullable = false)
  private String sex;

  @Column(name = "CIVIL_STATUS", nullable = false)
  private String civilStatus;

  @Column(name = "BIRTHDATE", nullable = false)
  private Date birthdate;

  @Column(name = "AGE", nullable = false)
  private int age;

  @Column(name = "CONTACT_NUMBER", nullable = false)
  private String contactNumber;

  @Column(name = "EMERGENCY_CONTACT", nullable = false)
  private String emergencyContact;

  @Column(name = "EMERGENCY_NUMBER", nullable = false)
  private String emergencyNumber;

  @Column(name = "EMERGENCY_RELATIONSHIP", nullable = false)
  private String emergencyRelationship;

  @Column(name = "HOUSE_STREET_SUBDIVISION", nullable = false)
  private String houseStreetSubdivision;

  @Column(name = "BARANGAY", nullable = false)
  private String barangay;

  @Column(name = "CITY", nullable = false)
  private String city;

  @Column(name = "PROVINCE", nullable = false)
  private String province;

  @Column(name = "REGION", nullable = false)
  private String region;

  @Column(name = "CREATED_AT", nullable = false)
  private Date createdAt;

  // ===== RELATIONSHIPS =====
  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Chart> charts;

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<PeriodontalChart> periodontalCharts;
}
