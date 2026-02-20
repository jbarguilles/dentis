package cmsc128.dentapp.modules.patient.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import cmsc128.dentapp.modules.patient.entities.Patient;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterPatientDTO {

  @JsonProperty("patient_number")
  private String patientNumber;

  @JsonProperty("registration_date")
  private String registrationDate;

  @JsonProperty("last_name")
  private String lastName;

  @JsonProperty("first_name")
  private String firstName;

  @JsonProperty("middle_name")
  private String middleName;

  @JsonProperty("suffix")
  private String suffix;

  @JsonProperty("sex")
  private String sex;

  @JsonProperty("civil_status")
  private String civilStatus;

  @JsonProperty("birthdate")
  private String birthdate;

  @JsonProperty("age")
  private int age;

  @JsonProperty("contact_number")
  private String contactNumber;

  @JsonProperty("emergency_contact")
  private String emergencyContact;

  @JsonProperty("emergency_number")
  private String emergencyNumber;

  @JsonProperty("emergency_relationship")
  private String emergencyRelationship;

  @JsonProperty("house_street_subdivision")
  private String houseStreetSubdivision;

  @JsonProperty("barangay")
  private String barangay;

  @JsonProperty("city")
  private String city;

  @JsonProperty("province")
  private String province;

  @JsonProperty("region")
  private String region;

  public Patient mapToPatient() {
    Patient patient = new Patient();
    patient.setPatientNumber(this.patientNumber);
    patient.setRegistrationDate(Date.valueOf(this.registrationDate));
    patient.setLastName(this.lastName);
    patient.setFirstName(this.firstName);
    patient.setMiddleName(this.middleName);
    patient.setSuffix(this.suffix);
    patient.setSex(this.sex);
    patient.setCivilStatus(this.civilStatus);
    patient.setBirthdate(Date.valueOf(this.birthdate));
    patient.setAge(this.age);
    patient.setHouseStreetSubdivision(this.houseStreetSubdivision);
    patient.setBarangay(this.barangay);
    patient.setCity(this.city);
    patient.setProvince(this.province);
    patient.setRegion(this.region);
    patient.setContactNumber(this.contactNumber);
    patient.setEmergencyContact(this.emergencyContact);
    patient.setEmergencyNumber(this.emergencyNumber);
    patient.setEmergencyRelationship(this.emergencyRelationship);
    patient.setCreatedAt(new Date(System.currentTimeMillis()));

    return patient;
  }
}
