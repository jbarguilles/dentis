package cmsc128.dentapp.modules.problem_list_worksheet.services;

import org.springframework.stereotype.Service;

import cmsc128.dentapp.modules.problem_list_worksheet.dto.AddProblemListWorksheetDTO;
import cmsc128.dentapp.modules.problem_list_worksheet.entities.ProblemListWorksheet;

@Service
public interface ProblemListWorksheetService {
  ProblemListWorksheet savePLW(AddProblemListWorksheetDTO addProblemListWorksheetDTO);
}
