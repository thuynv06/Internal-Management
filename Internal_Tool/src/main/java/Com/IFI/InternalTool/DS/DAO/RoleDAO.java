package Com.IFI.InternalTool.DS.DAO;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Com.IFI.InternalTool.DS.Model.Role;
import Com.IFI.InternalTool.DS.Model.RoleName;

import java.util.Optional;

@Repository
public interface RoleDAO extends JpaRepository<Role, Long> {
	
    Optional<Role> findByName(RoleName roleName);
}