package cmsc128.dentapp.modules.patient.dto;

public class PatientProjection {
  private Long patientID;
  private String patientNumber;
  private String name;

  public PatientProjection(
      Long patientID, String patientNumber, String firstName, String middleName, String lastName) {
    this.patientID = patientID;
    this.patientNumber = patientNumber;
    this.name = combineName(firstName, middleName, lastName);
  }

  private static String combineName(String firstName, String middleName, String lastName) {
    StringBuilder nameBuilder = new StringBuilder();
    if (firstName != null && !firstName.isEmpty()) {
      nameBuilder.append(firstName);
    }
    if (middleName != null && !middleName.isEmpty()) {
      if (nameBuilder.length() > 0) {
        nameBuilder.append(" ");
      }
      nameBuilder.append(middleName);
    }
    if (lastName != null && !lastName.isEmpty()) {
      if (nameBuilder.length() > 0) {
        nameBuilder.append(" ");
      }
      nameBuilder.append(lastName);
    }
    return nameBuilder.toString();
  }

  // Getters
  public Long getPatientID() {
    return patientID;
  }

  public String getPatientNumber() {
    return patientNumber;
  }

  public String getName() {
    return name;
  }

  // Setters (optional)
  public void setPatientID(Long patientID) {
    this.patientID = patientID;
  }

  public void setPatientNumber(String patientNumber) {
    this.patientNumber = patientNumber;
  }

  public void setName(String name) {
    this.name = name;
  }
}
