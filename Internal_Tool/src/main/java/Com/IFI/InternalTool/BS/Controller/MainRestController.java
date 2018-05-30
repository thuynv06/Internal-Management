package Com.IFI.InternalTool.BS.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import Com.IFI.InternalTool.BS.Service.EmployeeService;
import Com.IFI.InternalTool.BS.Service.ProjectService;
import Com.IFI.InternalTool.BS.Service.VacationService;
import Com.IFI.InternalTool.DS.Model.Employee;
import Com.IFI.InternalTool.DS.Model.Group_IFI;
import Com.IFI.InternalTool.DS.Model.Project;
import Com.IFI.InternalTool.DS.Model.Project_Manager;
import Com.IFI.InternalTool.DS.Model.Vacation;
import Com.IFI.InternalTool.DS.Model.Vacation_Approved;
import Com.IFI.InternalTool.DS.Model.Vacation_Type;
import Com.IFI.InternalTool.DS.Model.SearchModel.VacationSearch;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/private/vacation")
@CrossOrigin(origins = "http://localhost:3000")
public class MainRestController {
	@Autowired
	EmployeeService employeeService;
	@Autowired
	ProjectService projectService;
	@Autowired
	VacationService vacationService;
	/*-----------Begin Employee MainRestController--------*/

	// get all employee data
	@RequestMapping("/getAllEmployee")
	public List<Employee> getAllEmployee(@RequestParam ("page") int page,
										 @RequestParam ("pageSize") int pageSize,
										 @RequestParam ("sortedColumn") String sortedColumn,
										 @RequestParam ("desc") Boolean desc) {
			return employeeService.getAllEmployee(page,pageSize,sortedColumn,desc);
		
	}

	// get all Group
	@RequestMapping("/getAllGroup")
	public List<Group_IFI> getAllGroup() {
		return employeeService.getAllGroup();
	}

	// get employee by id
	@RequestMapping("/getEmployeeById")
	public @ResponseBody Payload getEmployeeById(@RequestParam long employee_id) {
		Payload message = new Payload();
		employeeService.getEmployeeById(employee_id);
		message.setDescription("Get employee successfully");
		message.setCode("CODE OK!");
		message.setStatus("OK!");
		message.setData(employeeService.getEmployeeById(employee_id));
		return message;
	}
	// save or update employee

	@RequestMapping("/saveEmployee")
	public @ResponseBody Payload saveEmployee(@RequestBody Employee employee) {
		Payload message = new Payload();
		if (employeeService.saveEmployee(employee)>0) {
			message.setDescription("Save or Update employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(employee);
		} else {
			message.setStatus("Error!");
		}
		;
		return message;
	}

	// delete employee by id

	@RequestMapping("/deleteEmployee")
	public @ResponseBody Payload deleteEmployee(@RequestParam long employee_id) {
		Payload message = new Payload();
		if (employeeService.deleteEmployee(employee_id)>0) {
			message.setDescription("Delete employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData("");
		} else {
			message.setStatus("Error!");
		}
		;
		return message;
	}
	/*-----------End Employee MainRestController--------*/

	/*-----------Begin Project MainRestController--------*/

	// get all project data
	@RequestMapping("/getAllProject")
	public List<Project> getAllProject() {
		return projectService.getAllProject();
	}

	// get project by id
	@RequestMapping("/getProjectById")
	public @ResponseBody Payload getProjectById(@RequestParam long project_id) {
		Payload message = new Payload();
		projectService.getProjectById(project_id);
		message.setDescription("Get project successfully");
		message.setCode("CODE OK!");
		message.setStatus("OK!");
		message.setData(projectService.getProjectById(project_id));
		return message;
	}

	// save or update project

	@RequestMapping("/saveProject")
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
			message.setStatus("Error Date!");
		}
		;
		return message;
	}

	// delete project by id

	@RequestMapping("/deleteProject")
	public @ResponseBody Payload deleteProject(@RequestParam long project_id) {
		Payload message = new Payload();
		if (projectService.deleteProject(project_id)) {
			message.setDescription("Delete project successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData("");
		} else {
			message.setStatus("Error!");
		}
		;
		return message;
	}

	// get project by employee_id from project_manager table
	@RequestMapping("/getProjectByEmp")
	public List<Project> getProjectByEmp(@RequestParam long employee_id) {
		List<Long> list = projectService.getProjectByEmp(employee_id);
		List<Project> list2 = new ArrayList<>();
		for (Long m : list) {
			list2.add(projectService.getProjectById(m));
		}
		return list2;
	}

	/*-----------End Project MainRestController--------*/

	/*-----------Begin Vacation MainRestController--------*/
	//get all vacation (employee page)
	@RequestMapping("/getVacationByEmp")
	public @ResponseBody Payload getVacationByEmp(@RequestParam long employee_id,
												  @RequestParam ("page") int page,
												  @RequestParam ("pageSize") int pageSize,
												  @RequestParam ("sortedColumn") String sortedColumn,
												  @RequestParam ("desc") Boolean desc) {
		Payload message = new Payload();
		vacationService.getAllVacationByEmp(employee_id,page,pageSize,sortedColumn,desc);
		message.setDescription("Get vacation by employee successfully");
		message.setCode("CODE OK!");
		message.setStatus("OK!");
		message.setData(vacationService.getAllVacationByEmp(employee_id,page,pageSize,sortedColumn,desc));

		return message;
	}
	//get all vacation type
	
	@RequestMapping("/getAllVacationType")
	public List<Vacation_Type> getAllVacationType() {
		return vacationService.getAllVacationType();
	}
	
	// save vacation

	@RequestMapping("/saveVacation")
	public @ResponseBody Payload saveVacation(@RequestBody Vacation vacation) {
		Payload message = new Payload();		
			List<Project_Manager> pm= projectService.getProjectManagerByEmp(vacation.getEmployee_id(),vacation.getProject_id());
			for(Project_Manager u:pm) {
				Project p=projectService.getProjectById(u.getProject_id());//get project to check date
				if(p.getEnd_date()!=null) {
					Date end_date=p.getEnd_date();
					Date start_date=p.getStart_date();
					Date from_date=vacation.getFrom_date();
					Date to_date=vacation.getTo_date();
						if(from_date.compareTo(start_date)>0 && from_date.compareTo(end_date)<0
								&& to_date.compareTo(start_date)>0 
								&& to_date.compareTo(end_date)<0 && from_date.compareTo(to_date)<0 
								) {
							Date date = new java.util.Date();
							vacation.setCreated_at(date);
							vacation.setUpdated_at(date);
							vacation.setStatus(1);
							vacation.setIs_approved(null);
							vacationService.saveVacation(vacation);
							Vacation_Approved va=new Vacation_Approved();
							va.setVacation_id(vacation.getVacation_id());
							va.setManager_id(u.getManager_id());
							va.setPriority(u.getPriority());
							vacationService.saveVacationApproved(va);
							message.setDescription("Save vacation successfully");
							message.setCode("CODE OK!");
							message.setStatus("OK!");
							message.setData(vacation);
						}
						else {
							message.setDescription("Wrong Date");
							message.setCode("Error!");
							message.setStatus("Error");
						}
				}
				
				if(p.getEnd_date()==null) {
					Date start_date=p.getStart_date();
					Date from_date=vacation.getFrom_date();
					Date to_date=vacation.getTo_date();
						if(from_date.compareTo(start_date)>0
								&& to_date.compareTo(start_date)>0 
								&& from_date.compareTo(to_date)<0 
								) {
							Date date = new java.util.Date();
							vacation.setCreated_at(date);
							vacation.setUpdated_at(date);
							vacation.setStatus(1);
							vacationService.saveVacation(vacation);
							Vacation_Approved va=new Vacation_Approved();
							va.setVacation_id(vacation.getVacation_id());
							va.setManager_id(u.getManager_id());
							va.setPriority(u.getPriority());
							vacationService.saveVacationApproved(va);
							message.setDescription("Save vacation successfully");
							message.setCode("CODE OK!");
							message.setStatus("OK!");
							message.setData(vacation);
						}
						else {
							message.setDescription("Wrong Date");
							message.setCode("Error!");
							message.setStatus("Error");
						}
				}
		
			}
		
		return message;
	}

	// edit vacation
	@RequestMapping("/editVacation")
	public @ResponseBody Payload editVacation(@RequestBody Vacation vacation) {
		Payload message = new Payload();

		if (vacation.getStatus() == 1 && vacation.getIs_approved()==null) {
			Date date = new java.util.Date();
			vacation.setUpdated_at(date);
			if (vacationService.saveVacation(vacation)) {
				message.setDescription("Edit project successfully");
				message.setCode("CODE OK!");
				message.setStatus("OK!");
				message.setData(vacation);
			}

		} else {
			message.setStatus("Error!");
			message.setDescription("Vacation is processing, You can not update");
		}
		return message;
	}

	// delete vacation by id

	@RequestMapping("/deleteVacation")
	public @ResponseBody Payload deleteVacation(@RequestParam long vacation_id) {
		Payload message = new Payload();
		Vacation v = vacationService.getVacationById(vacation_id);
		if (v.getStatus() == 1 && v.getIs_approved()==null)
		{
			if (vacationService.deleteVacation(vacation_id)) {
				message.setDescription("Delete vacation successfully");
				message.setCode("CODE OK!");
				message.setStatus("OK!");
				message.setData("");
			} 
		}
		else {
			message.setStatus("Error!");
			message.setDescription("Vacation is processing, You can not delete");
		}
		return message;
	}
	
	//get vacation  ( manager/leader page)
		@RequestMapping("/getEmployeeVacationByManager")
		public List<Vacation> getEmployeeVacationByManager(@RequestParam("manager_id") long manager_id,
																@RequestParam ("page") int page,
																@RequestParam ("pageSize") int pageSize,
																@RequestParam ("sortedColumn") String sortedColumn,
																@RequestParam ("desc") Boolean desc) {
			List<Vacation> listVacation=vacationService.getAllVacationByEmp2(manager_id, page, pageSize, sortedColumn, desc);
			return listVacation;

		}
		
		//approve a request
		@RequestMapping("/approveEmployeeRequest")
		public Vacation approveEmployeeRequest(@RequestParam("manager_id") long manager_id, @RequestParam("vacation_id") long vacation_id) {
				Vacation v=vacationService.getVacationById(vacation_id);
				int max=vacationService.getMaxPriority(vacation_id);
				int my_prio=vacationService.getPriority(manager_id, vacation_id);
				if(my_prio<max) {
					v.setStatus(my_prio+1);
					v.setIs_approved(false);
					vacationService.saveVacation(v);
				}
				if(my_prio==max) {
					v.setStatus(max);
					v.setIs_approved(true);
					vacationService.saveVacation(v);
				}
				return v;
		}
		
		//disapprove a request
			@RequestMapping("/disapproveEmployeeRequest")
			public Vacation disapproveEmployeeRequest( @RequestParam("vacation_id") long vacation_id) {
					Vacation v=vacationService.getVacationById(vacation_id);
					v.setStatus(-1);
					v.setIs_approved(false);
					vacationService.saveVacation(v);
					return v;
			}
	
	
	
	//search page  manager/leader
	

	@RequestMapping("/searchVacation")
	public @ResponseBody Payload searchVacation(@RequestParam Long manager_id,
												@RequestParam ("page") int page,
												@RequestParam ("pageSize") int pageSize,
												@RequestParam ("sortedColumn") String sortedColumn,
												@RequestParam ("desc") Boolean desc,
												@RequestBody VacationSearch vacationSearch) {
		Payload message = new Payload();
		List<Vacation> list = vacationService.searchVacation(manager_id,page,pageSize,sortedColumn,desc,vacationSearch);
		if (list.size()>0)
			{
				message.setDescription("Search vacation successfully");
				message.setCode("CODE OK!");
				message.setStatus("OK!");
				message.setData(list);
			} 
	
		else {
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setDescription("No result!");
		}
		return message;
	}
	
	//search page employee
	
	@RequestMapping("/searchVacationP2")
	public @ResponseBody Payload searchVacationP2(  @RequestParam Long employee_id,
													@RequestParam ("page") int page,
													@RequestParam ("pageSize") int pageSize,
													@RequestParam ("sortedColumn") String sortedColumn,
													@RequestParam ("desc") Boolean desc,
													@RequestBody VacationSearch vacationSearch) {
		Payload message = new Payload();
		List<Vacation> list = vacationService.searchVacationP2(employee_id,page,pageSize,sortedColumn,desc,vacationSearch);
		if (list.size()>0)
			{
				message.setDescription("Search vacation successfully");
				message.setCode("CODE OK!");
				message.setStatus("OK!");
				message.setData(list);
			} 
	
		else {
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setDescription("No result!");
		}
		return message;
	}
	
	
	
	/*-----------End Vacation MainRestController--------*/
	
	
}
