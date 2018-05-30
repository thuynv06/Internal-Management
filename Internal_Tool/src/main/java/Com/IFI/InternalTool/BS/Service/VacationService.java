package Com.IFI.InternalTool.BS.Service;

import java.util.List;

import Com.IFI.InternalTool.DS.Model.Vacation;
import Com.IFI.InternalTool.DS.Model.Vacation_Approved;
import Com.IFI.InternalTool.DS.Model.Vacation_Type;
import Com.IFI.InternalTool.DS.Model.SearchModel.VacationSearch;

public interface VacationService {
	List<Vacation> getAllVacationByEmp(long employee_id,int page, int pageSize,String sortedColumn,Boolean desc);
	boolean saveVacation(Vacation vacation);
	boolean deleteVacation(long vacation_id);
	Vacation getVacationById(long vacation_id);
	void saveVacationApproved(Vacation_Approved vacation_approved);
	List<Vacation_Type> getAllVacationType();
	List<Vacation> searchVacation(Long manager_id,int page, int pageSize,String sortedColumn,Boolean desc,VacationSearch vacationSearch);
	List<Vacation> searchVacationP2(Long employee_id,int page, int pageSize,String sortedColumn,Boolean desc,VacationSearch vacationSearch);
	int getMaxPriority(long vacation_id);
	int getPriority(long manager_id,long vacation_id);
	List<Vacation> getAllVacationByEmp2(long manager_id,int page, int pageSize,String sortedColumn,Boolean desc);

}
