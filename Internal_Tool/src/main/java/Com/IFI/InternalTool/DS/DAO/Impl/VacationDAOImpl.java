package Com.IFI.InternalTool.DS.DAO.Impl;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Com.IFI.InternalTool.DS.DAO.VacationDAO;
import Com.IFI.InternalTool.DS.Model.Vacation;
import Com.IFI.InternalTool.DS.Model.Vacation_Approved;
import Com.IFI.InternalTool.DS.Model.Vacation_Log;
import Com.IFI.InternalTool.DS.Model.Vacation_Type;
import Com.IFI.InternalTool.DS.Model.SearchModel.VacationSearch;
@Repository("VacationDAO")
@Transactional
public class VacationDAOImpl implements VacationDAO{
	@Autowired
	private EntityManagerFactory entityManagerFactory;
	//employee page
	@Override
	public List<Vacation> getAllVacationByEmp(long employee_id,int page, int pageSize,String sortedColumn,Boolean desc) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Vacation where employee_id=:employee_id ";
		if(sortedColumn != null && desc != null){
			String order = "";
			if(desc){
				order = "desc";
			}
			hql +="ORDER BY "+ sortedColumn + " " +  order;
		}
		
		Query query = session.createQuery(hql);
		query.setParameter("employee_id", employee_id);
		query.setFirstResult((page-1)*pageSize);
		query.setFetchSize(pageSize);
		query.setMaxResults(pageSize);
		List<Vacation> list = query.list();
		if(list.size() > pageSize){
			return list = list.subList(0, pageSize);
		}
		
		session.close();
		return list;
	}
	@Override
	public boolean saveVacation(Vacation vacation) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		session.saveOrUpdate(vacation);
		session.close();
		tx.commit();
		return true;
	}
	@Override
	public boolean deleteVacation(long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		String hql = "Delete from Vacation where vacation_id=:vacation_id";
		Query query = session.createQuery(hql);
		query.setParameter("vacation_id", vacation_id);
		query.executeUpdate();
		tx.commit();
		session.close();
		return true;
	}
	@Override
	public Vacation getVacationById(long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Vacation where vacation_id=:vacation_id";
		Query query = session.createQuery(hql);
		query.setParameter("vacation_id", vacation_id);
		Vacation v=(Vacation) query.uniqueResult();
		return v;
	}
	@Override
	public void saveVacationApproved(Vacation_Approved vacation_approved) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		session.saveOrUpdate(vacation_approved);
		session.close();
		tx.commit();
	}
	@Override
	public List<Vacation_Type> getAllVacationType() {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "from Vacation_Type";
		Query query = session.createQuery(hql);
		List<Vacation_Type> list=query.list();
		session.close();
		return list;
	}
	
	//search manager/leader page
	@Override
	public List<Vacation> searchVacation(Long manager_id,int page, int pageSize,String sortedColumn,Boolean desc,VacationSearch vacationSearch) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select v from Vacation v INNER JOIN Employee AS e ON v.employee_id= e.employee_id INNER JOIN Project AS p ON v.project_id=p.project_id INNER JOIN Project_Manager pm ON (pm.employee_id=v.employee_id and pm.project_id=v.project_id and pm.priority=v.status) ";
		hql+="WHERE (:emp_name IS NULL OR e.fullname LIKE CONCAT('%', :emp_name, '%')) ";
		hql+="AND (:status =0 or v.status=:status) ";
		hql+="AND (:pro_name IS NULL OR p.name LIKE CONCAT('%', :pro_name, '%')) ";
		hql+="AND ((:from_date IS NULL and ( :to_date IS NOT NULL and (:to_date>= v.to_date) or (:to_date < v.to_date and :to_date>=v.from_date))) "; 
		hql+="or (:to_date IS NULL and (:from_date IS NOT NULL and :from_date <= v.to_date)) ";
		hql+="or (:from_date >= v.from_date and :from_date <= v.to_date and :to_date >= v.from_date and :to_date <= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date <= v.from_date and :to_date >= v.from_date and :to_date <= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date >= v.from_date and :from_date <= v.to_date and :to_date >= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date <= v.from_date and :to_date >= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date IS NULL and :to_date IS NULL)) ";
		hql+="AND (pm.manager_id=:manager_id)";
		if(sortedColumn != null && desc != null){
			String order = "";
			if(desc){
				order = "desc";
			}
			hql +="ORDER BY "+ sortedColumn + " " +  order;
		}
		Query query = session.createQuery(hql);
		query.setParameter("manager_id", manager_id);
		query.setParameter("emp_name", vacationSearch.getEmp_name());
		query.setParameter("pro_name", vacationSearch.getPro_name());
		query.setParameter("from_date", vacationSearch.getFrom_date());
		query.setParameter("to_date", vacationSearch.getTo_date());
		query.setParameter("status", vacationSearch.getStatus());
		
	
		query.setFirstResult((page-1)*pageSize);
		query.setFetchSize(pageSize);
		query.setMaxResults(pageSize);
		List<Vacation> list = query.list();
		if(list.size() > pageSize){
			return list = list.subList(0, pageSize);
		}
		session.close();
		return list;
		
	}
	
	//search employee page
	@Override
	public List<Vacation> searchVacationP2(Long employee_id,int page, int pageSize,String sortedColumn,Boolean desc,VacationSearch vacationSearch) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select v from Vacation v INNER JOIN Employee AS e ON v.employee_id= e.employee_id INNER JOIN Project AS p ON v.project_id=p.project_id ";
		hql+="WHERE (:pro_name IS NULL OR p.name LIKE CONCAT('%', :pro_name, '%')) ";
		hql+="AND (:status =0 or v.status=:status) ";
		hql+="AND ((:from_date IS NULL and ( :to_date IS NOT NULL and (:to_date >= v.to_date) or (:to_date<v.to_date and :to_date>=v.from_date))) "; 
		hql+="or (:to_date IS NULL and (:from_date IS NOT NULL and :from_date <= v.to_date)) ";
		hql+="or (:from_date >= v.from_date and :from_date <= v.to_date and :to_date >= v.from_date and :to_date <= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date <= v.from_date and :to_date >= v.from_date and :to_date <= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date >= v.from_date and :from_date <= v.to_date and :to_date >= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date <= v.from_date and :to_date >= v.to_date and :from_date <= :to_date) ";
		hql+="or (:from_date IS NULL and :to_date IS NULL)) ";
		hql+="AND (v.employee_id=:employee_id) ";
		if(sortedColumn != null && desc != null){
			String order = "";
			if(desc){
				order = "desc";
			}
			hql +="ORDER BY "+ sortedColumn + " " +  order;
		}
		Query query = session.createQuery(hql);
		query.setParameter("employee_id", employee_id);
		query.setParameter("pro_name", vacationSearch.getPro_name());
		query.setParameter("from_date", vacationSearch.getFrom_date());
		query.setParameter("to_date", vacationSearch.getTo_date());
		query.setParameter("status", vacationSearch.getStatus());
		query.setFirstResult((page-1)*pageSize);
		query.setFetchSize(pageSize);
		query.setMaxResults(pageSize);
		List<Vacation> list = query.list();
		if(list.size() > pageSize){
			return list = list.subList(0, pageSize);
		}
		session.close();
		return list;
		
	}
	//get vacation's max priority
	@Override
	public int getMaxPriority(long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select MAX(t.priority) from Vacation_Approved t where vacation_id=:vacation_id";
		Query query = session.createQuery(hql);
		query.setParameter("vacation_id", vacation_id);
		int max=(int) query.uniqueResult();
		return max;
	}
	//get manager's priority
	@Override
	public int getPriority(long manager_id,long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select t.priority from Vacation_Approved t where manager_id=:manager_id and vacation_id=:vacation_id";
		Query query = session.createQuery(hql);
		query.setParameter("manager_id", manager_id);
		query.setParameter("vacation_id", vacation_id);
		int p=(int) query.uniqueResult();
		return p;
	}
	// get all vacation to approve manage/leader page
	@Override
	public List<Vacation> getAllVacationByEmp2(long manager_id,int page, int pageSize,String sortedColumn,Boolean desc) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select t From Vacation t INNER JOIN Project_Manager AS pm ON (t.employee_id=pm.employee_id and t.project_id=pm.project_id)  where  (pm.manager_id=:manager_id and t.status=pm.priority) ";
		Query query = session.createQuery(hql);
		query.setParameter("manager_id", manager_id);
		if(sortedColumn != null && desc != null){
			String order = "";
			if(desc){
				order = "desc";
			}
			hql +="ORDER BY "+ sortedColumn + " " +  order;
		}
		query.setFirstResult((page-1)*pageSize);
		query.setFetchSize(pageSize);
		query.setMaxResults(pageSize);
		List<Vacation> list = query.list();
		session.close();
		return list;
	}
	@Override
	public List<Long> getManagerByVacationId(long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select t.manager_id From Vacation_Approved t INNER JOIN Vacation AS v ON (t.vacation_id=v.vacation_id) where  t.vacation_id=:vacation_id ";
		Query query = session.createQuery(hql);
		query.setParameter("vacation_id", vacation_id);
		List<Long> list=query.list();
		session.close();
		return list;
	}
	@Override
	public boolean saveVacationLog(Vacation_Log vacation_log) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		session.saveOrUpdate(vacation_log);
		session.close();
		tx.commit();
		return true;
	}
	@Override
	public Vacation_Log getVacationLogByVacationIdAndNextApproveId(long vacation_id,long next_approve_id) {
		
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "From Vacation_Log where vacation_id=:vacation_id and next_approve_id=:next_approve_id";
		Query query = session.createQuery(hql);
		query.setParameter("next_approve_id", next_approve_id);
		query.setParameter("vacation_id", vacation_id);
		Vacation_Log vl=(Vacation_Log) query.uniqueResult();
		session.close();
		return vl;
	}
	@Override
	public List<Long> getNextApproveIdByVacationId(Long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select v.next_approve_id From Vacation_Log v where vacation_id=:vacation_id";
		Query query = session.createQuery(hql);
		query.setParameter("vacation_id", vacation_id);
		List<Long> list=query.list();
		session.close();
		return list;

	}
	@Override
	public List<Long> getApprovedIdByVacationId(Long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select v.approved_id From Vacation_Log v where vacation_id=:vacation_id and v.approved_id>0";
		Query query = session.createQuery(hql);
		query.setParameter("vacation_id", vacation_id);
		List<Long> list=query.list();
		session.close();
		return list;
	}
	@Override
	public Long getDisApproveIdByVacationId(Long vacation_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select v.disapproved_id From Vacation_Log v where vacation_id=:vacation_id and v.disapproved_id>0";
		Query query = session.createQuery(hql);
		query.setParameter("vacation_id", vacation_id);
		Long a=(Long) query.uniqueResult();
		session.close();
		return a;
	}



}

