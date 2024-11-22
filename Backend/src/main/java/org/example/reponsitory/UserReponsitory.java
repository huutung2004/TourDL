package org.example.reponsitory;

import org.example.modal.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserReponsitory extends JpaRepository<Users, Integer> {
    @Query("SELECT COUNT(u.id) FROM Users u WHERE u.role = 0")
    int totalAccountUser();
    @Query("SELECT u FROM Users u WHERE u.email = :email")
    Users findByEmail(@Param("email") String email);
    boolean existsByEmail(String email);
}
