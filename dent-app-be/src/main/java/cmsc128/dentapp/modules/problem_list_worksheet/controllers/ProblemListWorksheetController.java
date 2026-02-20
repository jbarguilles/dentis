package cmsc128.dentapp.modules.problem_list_worksheet.controllers;

import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.modules.problem_list_worksheet.dto.AddProblemListWorksheetDTO;
import cmsc128.dentapp.modules.problem_list_worksheet.entities.ProblemListWorksheet;
import cmsc128.dentapp.modules.problem_list_worksheet.services.ProblemListWorksheetService;

@CrossOrigin
@RestController
@RequestMapping(path = {"/problemlistworksheet"})
public class ProblemListWorksheetController {
  private final ProblemListWorksheetService problemListWorksheetService;

  public ProblemListWorksheetController(ProblemListWorksheetService problemListWorksheetService) {
    this.problemListWorksheetService = problemListWorksheetService;
  }

  @PutMapping(path = "/add")
  public ProblemListWorksheet savePLW(
      @RequestBody AddProblemListWorksheetDTO addProblemListWorksheetDTO) {
    return this.problemListWorksheetService.savePLW(addProblemListWorksheetDTO);
  }
}
