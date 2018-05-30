package Com.IFI.InternalTool.BS.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Com.IFI.InternalTool.BS.Service.EmployeeService;
import Com.IFI.InternalTool.DS.DAO.EmployeeDAO;
import Com.IFI.InternalTool.DS.Model.Employee;
import Com.IFI.InternalTool.DS.Model.Group_IFI;

@Service("EmployeeService")
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	EmployeeDAO employeeDAO;
	@Override
	public List<Employee> getAllEmployee(int page, int pageSize,String sortedColumn,Boolean desc) {
//		List<Employee> list= employeeDAO.getAllEmployee(sortedColumn,desc);
//		int from = Math.max(0,page*pageSize);
//		int to = Math.min(list.size(),(page+1)*pageSize);
//		return list.subList(from,to); 
		return employeeDAO.getAllEmployee(page, pageSize, sortedColumn, desc);
	}
	@Override
	public Long saveEmployee(Employee employee) {
		 return employeeDAO.saveEmployee(employee);
	}
	@Override
	public Long deleteEmployee(long employee_id) {
		return employeeDAO.deleteEmployee(employee_id);
	}
	@Override
	public Employee getEmployeeById(long employee_id) {
		return employeeDAO.getEmployeeById(employee_id);
	}
	@Override
	public List<Group_IFI> getAllGroup() {
		return employeeDAO.getAllGroup();
	}
	@Override
	public List<Long> getEmployeeByManager(long manager_id) {
		return employeeDAO.getEmployeeByManager(manager_id);
	}

}
