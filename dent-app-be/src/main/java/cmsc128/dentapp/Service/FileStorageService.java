package cmsc128.dentapp.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

  @Value("${app.upload.dir:uploads}")
  private String uploadDir;

  public String saveDrawingImage(Long patientId, String imageType, MultipartFile imageFile)
      throws IOException {
    // Validate file
    if (imageFile.isEmpty()) {
      throw new IllegalArgumentException("Image file cannot be empty");
    }

    // Validate file type
    String contentType = imageFile.getContentType();
    if (contentType == null || !contentType.startsWith("image/")) {
      throw new IllegalArgumentException("File must be an image");
    }

    // Create patient-specific directory
    String patientFolder = "patient_" + patientId;
    String softTissueFolder = "soft_tissue_drawings";

    Path uploadPath = Paths.get(uploadDir, patientFolder, softTissueFolder);

    // Create directories if they don't exist
    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    // Generate unique filename with timestamp
    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
    String fileName =
        imageType
            + "_drawing_"
            + timestamp
            + "_"
            + UUID.randomUUID().toString().substring(0, 8)
            + ".png";

    Path filePath = uploadPath.resolve(fileName);

    // Save the file
    Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

    // Return relative path for database storage
    return patientFolder + "/" + softTissueFolder + "/" + fileName;
  }

  public String saveChartImage(int patientId, String toothNumber, byte[] imageData)
      throws IOException {
    // Create patient-specific directory
    String patientFolder = "patient_" + patientId;
    String chartsFolder = "dental_charts";

    Path uploadPath = Paths.get(uploadDir, patientFolder, chartsFolder);

    // Create directories if they don't exist
    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    // Generate unique filename with timestamp
    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
    String fileName =
        toothNumber + "_" + timestamp + "_" + UUID.randomUUID().toString().substring(0, 8) + ".png";

    Path filePath = uploadPath.resolve(fileName);

    // Save the file
    Files.write(filePath, imageData);

    // Return relative path for database storage
    return patientFolder + "/" + chartsFolder + "/" + fileName;
  }

  public String saveDrawingImage(Long patientId, String imageType, byte[] imageData)
      throws IOException {
    // Create patient-specific directory
    String patientFolder = "patient_" + patientId;
    String softTissueFolder = "soft_tissue_drawings";

    Path uploadPath = Paths.get(uploadDir, patientFolder, softTissueFolder);

    // Create directories if they don't exist
    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    // Generate unique filename with timestamp
    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
    String fileName =
        imageType + "_" + timestamp + "_" + UUID.randomUUID().toString().substring(0, 8) + ".png";

    Path filePath = uploadPath.resolve(fileName);

    // Save the file
    Files.write(filePath, imageData);

    // Return relative path for database storage
    return patientFolder + "/" + softTissueFolder + "/" + fileName;
  }

  public String saveUploadedFile(Long patientId, String imageType, MultipartFile file)
      throws IOException {
    // Create patient-specific directory
    String patientFolder = "patient_" + patientId;
    String softTissueFolder = "soft_tissue_drawings";

    Path uploadPath = Paths.get(uploadDir, patientFolder, softTissueFolder);

    // Create directories if they don't exist
    if (!Files.exists(uploadPath)) {
      Files.createDirectories(uploadPath);
    }

    // Generate unique filename
    String originalFileName = file.getOriginalFilename();
    String fileExtension =
        originalFileName != null
            ? originalFileName.substring(originalFileName.lastIndexOf("."))
            : ".png";

    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
    String fileName =
        imageType
            + "_"
            + timestamp
            + "_"
            + UUID.randomUUID().toString().substring(0, 8)
            + fileExtension;

    Path filePath = uploadPath.resolve(fileName);

    // Save the file
    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

    // Return relative path for database storage
    return patientFolder + "/" + softTissueFolder + "/" + fileName;
  }

  public void deleteFile(String relativePath) {
    try {
      Path filePath = Paths.get(uploadDir, relativePath);
      Files.deleteIfExists(filePath);
    } catch (IOException e) {
      // Log error but don't throw exception
      System.err.println("Failed to delete file: " + relativePath + " - " + e.getMessage());
    }
  }

  public String getFullPath(String relativePath) {
    return Paths.get(uploadDir, relativePath).toString();
  }

  public boolean fileExists(String relativePath) {
    Path filePath = Paths.get(uploadDir, relativePath);
    return Files.exists(filePath);
  }
}
