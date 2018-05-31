package Com.IFI.InternalTool.BS.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import Com.IFI.InternalTool.DS.Model.Vacation_Log;
import Com.IFI.InternalTool.DS.Model.Vacation_Type;
import Com.IFI.InternalTool.DS.Model.SearchModel.VacationSearch;

@RestController
public class MainRestController {
	@Autowired
	EmployeeService employeeService;
	@Autowired
	ProjectService projectService;
	@Autowired
	VacationService vacationService;
	/*-----------Begin Employee MainRestController--------*/

	// get all employee data
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(@RequestParam ("page") int page,
										 @RequestParam ("pageSize") int pageSize,
										 @RequestParam ("sortedColumn") String sortedColumn,
										 @RequestParam ("desc") Boolean desc) {
			return employeeService.getAllEmployee(page,pageSize,sortedColumn,desc);
		
	}

	// get all Group data
	@GetMapping("/groups")
	public List<Group_IFI> getAllGroup() {
		return employeeService.getAllGroup();
	}

	// get employee by id
	@GetMapping("/employees/{employee_id}")
	public @ResponseBody Payload getEmployeeById(@PathVariable long employee_id) {
		Payload message = new Payload();
		if(employeeService.getEmployeeById(employee_id)!=null) {
			message.setDescription("Get employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(employeeService.getEmployeeById(employee_id));
		}
		else {
			message.setDescription("Employee not found");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(employeeService.getEmployeeById(employee_id));
		}
		
		return message;
	}
	// save or update employee

	@PostMapping("/employees")
	public @ResponseBody Payload saveEmployee(@RequestBody Employee employee) {
		Payload message = new Payload();
			try {
			employeeService.saveEmployee(employee);
			message.setDescription("Save or Update employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(employee);
			}
			catch (Exception ex) {
				message.setDescription(ex.getMessage());
				message.setCode("Error");
				message.setStatus("Error");
			}
		return message;
	}

	// delete employee by id

	@DeleteMapping("/employees/{employee_id}")
	public @ResponseBody Payload deleteEmployee(@PathVariable long employee_id) {
		Payload message = new Payload();
			if(employeeService.deleteEmployee(employee_id)==true)
			{
			message.setDescription("Delete employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData("");
		} 
		else   {
			message.setDescription("Can not delete! Employee not found");
			message.setCode("OK");
			message.setStatus("OK");
			}
		
		return message;
	}
	/*-----------End Employee MainRestController--------*/

	/*-----------Begin Project MainRestController--------*/

	// get all project data
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
	//get vacation by id
	@GetMapping("/vacations/{vacation_id}")
	public Vacation getVacationById(@PathVariable("vacation_id") long vacation_id) {
		Vacation v= vacationService.getVacationById(vacation_id);
		return v;
	}
	
	
	//get all vacation (employee page)
	@GetMapping("/vacations/employee")
	public @ResponseBody Payload getVacationByEmp(@RequestParam long employee_id,
												  @RequestParam ("page") int page,
												  @RequestParam ("pageSize") int pageSize,
												  @RequestParam ("sortedColumn") String sortedColumn,
												  @RequestParam ("desc") Boolean desc) {
		Payload message = new Payload();
		if(vacationService.getAllVacationByEmp(employee_id,page,pageSize,sortedColumn,desc).size()!=0) {
			message.setDescription("Get vacations by employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(vacationService.getAllVacationByEmp(employee_id,page,pageSize,sortedColumn,desc));
		}
		else {
			message.setDescription("Vacation by employee not found!");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
		}
		

		return message;
	}
	//get all vacation type
	
	@GetMapping("/vacationTypes")
	public List<Vacation_Type> getAllVacationType() {
		return vacationService.getAllVacationType();
	}
	
	// save vacation

	@PostMapping("/vacations")
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
							List<Long> listManagerId= vacationService.getManagerByVacationId(vacation.getVacation_id());
							Vacation_Log v=new Vacation_Log();
							for(Long a:listManagerId) {
								v.setVacation_id(vacation.getVacation_id());
								v.setNext_approve_id(a);	
								vacationService.saveVacationLog(v);
							}
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
							List<Long> listManagerId= vacationService.getManagerByVacationId(vacation.getVacation_id());
							Vacation_Log v=new Vacation_Log();
							for(Long a:listManagerId) {
								v.setVacation_id(vacation.getVacation_id());
								v.setNext_approve_id(a);	
								vacationService.saveVacationLog(v);
							}
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
	//get all next approve manager/leader
	@GetMapping("/vacations/nextApproveLog/{vacation_id}")
	public List<Employee> getNextApproveManagerByVacationId(@PathVariable long vacation_id) {
		List<Long> list = vacationService.getNextApproveIdByVacationId(vacation_id);
		List<Employee> list2 = new ArrayList<>();
		for (Long m : list) {
			list2.add(employeeService.getEmployeeById(m));
		}
		return list2;
	}
	//get all approved manager/leader
	@GetMapping("/vacations/approvedLog/{vacation_id}")
	public List<Employee> getApprovedManagerByVacationId(@PathVariable long vacation_id) {
		List<Employee> list3 = new ArrayList<>();
		List<Long> list = vacationService.getApprovedIdByVacationId(vacation_id);
		for (Long m : list) {
			list3.add(employeeService.getEmployeeById(m));
		}
	return list3;

	
	}
	//get disapproved manager/leader ( one disapprove >> vacation disapprove)
	@GetMapping("/vacations/disapprovedLog/{vacation_id}")
	public Employee getDisApprovedManagerByVacationId(@PathVariable long vacation_id) {
		return employeeService.getEmployeeById(vacationService.getDisApproveIdByVacationId(vacation_id));
	}
	
	// edit vacation
	@PutMapping("/vacations")
	public @ResponseBody Payload editVacation(@RequestBody Vacation vacation) {
		Payload message = new Payload();
        Vacation v=vacationService.getVacationById(vacation.getVacation_id());
		if (v.getStatus() == 1) {
			Date date = new java.util.Date();
			vacation.setCreated_at(v.getCreated_at());
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

	@DeleteMapping("/vacations/{vacation_id}")
	public @ResponseBody Payload deleteVacation(@PathVariable long vacation_id) {
		Payload message = new Payload();
		Vacation v = vacationService.getVacationById(vacation_id);
		if(v!=null)
		{
			if (v.getStatus() == 1)
			{
				if (vacationService.deleteVacation(vacation_id)) {
					message.setDescription("Delete vacation successfully");
					message.setCode("CODE OK!");
					message.setStatus("OK!");
					message.setData("");
				} 
			}
			else {
				message.setCode("CODE OK!");
				message.setStatus("OK!");
				message.setDescription("Vacation is processing, You can not delete");
			}
		}
			else {
				message.setDescription("Can not delete, vacation not found");
				message.setCode("CODE OK!");
				message.setStatus("OK!");
			}
		return message;
	}
	
	//get vacation  ( manager/leader page)
		@GetMapping("/vacations/manager")
		public List<Vacation> getEmployeeVacationByManager(@RequestParam("manager_id") long manager_id,
																@RequestParam ("page") int page,
																@RequestParam ("pageSize") int pageSize,
																@RequestParam ("sortedColumn") String sortedColumn,
																@RequestParam ("desc") Boolean desc) {
			List<Vacation> listVacation=vacationService.getAllVacationByEmp2(manager_id, page, pageSize, sortedColumn, desc);
			return listVacation;

		}
		
		//approve a request
		@GetMapping("/vacations/approve")
		public Vacation approveEmployeeRequest(@RequestParam("manager_id") long manager_id, @RequestParam("vacation_id") long vacation_id) {
				Vacation v=vacationService.getVacationById(vacation_id);
				Vacation_Log v_log=vacationService.getVacationLogByVacationIdAndNextApproveId(vacation_id, manager_id);
				int max=vacationService.getMaxPriority(vacation_id);
				int my_prio=vacationService.getPriority(manager_id, vacation_id);
					if(my_prio<max) {
						v.setStatus(my_prio+1);
						v.setIs_approved(false);
						v_log.setApproved_id(manager_id);
						vacationService.saveVacationLog(v_log);
						vacationService.saveVacation(v);
					}
					if(my_prio==max) {
						v.setStatus(max+1);
						v.setIs_approved(true);	
						vacationService.saveVacation(v);
						v_log.setApproved_id(manager_id);
						vacationService.saveVacationLog(v_log);
					}
				return v;
		}
		
		//disapprove a request
			@GetMapping("/vacations/disapprove")
			public Vacation disapproveEmployeeRequest( @RequestParam("manager_id") long manager_id,@RequestParam("vacation_id") long vacation_id) {
					
					Vacation v=vacationService.getVacationById(vacation_id);
					Vacation_Log v_log=vacationService.getVacationLogByVacationIdAndNextApproveId(vacation_id, manager_id);
					v.setStatus(-1);
					v.setIs_approved(false);
					vacationService.saveVacation(v);
					v_log.setDisapproved_id(manager_id);
					vacationService.saveVacationLog(v_log);
					return v;
			}
	
	
	
	//search page  manager/leader
	

	@PostMapping("/vacations/searchv1")
	public @ResponseBody Payload searchVacation(@RequestParam ("manager_id") Long manager_id,
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
	
	@PostMapping("/vacations/searchv2")
	public @ResponseBody Payload searchVacationP2(  @RequestParam ("employee_id")Long employee_id,
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
