package Com.IFI.InternalTool.BS.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import Com.IFI.InternalTool.BS.Service.ProjectService;
import Com.IFI.InternalTool.DS.Model.Project;
@RestController
public class ProjectRestController {
	/*-----------Begin Project MainRestController--------*/
	@Autowired
	ProjectService projectService;
	@GetMapping("/projects")
	public List<Project> getAllProject() {
		return projectService.getAllProject();
	}

	// get project by id
	@GetMapping("/projects/{project_id}")
	public @ResponseBody Payload getProjectById(@PathVariable long project_id) {
		Payload message = new Payload();
		if(projectService.getProjectById(project_id)!=null) {
			message.setDescription("Get project successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(projectService.getProjectById(project_id));
		}
		else {
			message.setDescription("Project not found");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
		}
		return message;
	}

	// save or update project

	@PostMapping("/projects")
	public @ResponseBody Payload saveProject(@RequestBody Project project) {
		Payload message = new Payload();
		Date start_date=project.getStart_date();
		Date end_date=project.getEnd_date();
		if (start_date.compareTo(end_date)<0 || end_date==null) {
			projectService.saveProject(project);
			message.setDescription("Save or Update project successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(project);
		} else {
			message.setDescription("Error Date!");
			message.setCode("Error");
			message.setStatus("Error!");
		}
		;
		return message;
	}

	// delete project by id

	@DeleteMapping("/projects/{project_id}")
	public @ResponseBody Payload deleteProject(@PathVariable long project_id) {
		Payload message = new Payload();
		if (projectService.deleteProject(project_id)==true) {
			message.setDescription("Delete project successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData("");
		} else {
			message.setDescription("Can not delete. Project not found");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData("");
			}
		return message;
	}

	// get project by employee_id from project_manager table
	@GetMapping("/projects/employee")
	public List<Project> getProjectByEmp(HttpServletRequest request) throws ServletException{
	       HttpSession session = (request.getSession());
	       Long employee_id= (Long) session.getAttribute("userId");
		List<Long> list = projectService.getProjectByEmp(employee_id);
		List<Project> list2 = new ArrayList<>();
		for (Long m : list) {
			list2.add(projectService.getProjectById(m));
		}
		return list2;
	}

	/*-----------End Project MainRestController--------*/
}
