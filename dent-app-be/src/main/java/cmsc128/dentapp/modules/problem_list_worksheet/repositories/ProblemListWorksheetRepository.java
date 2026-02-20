package cmsc128.dentapp.modules.problem_list_worksheet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.problem_list_worksheet.entities.ProblemListWorksheet;

@Repository
public interface ProblemListWorksheetRepository extends JpaRepository<ProblemListWorksheet, Long> {}
