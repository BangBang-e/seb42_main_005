package com.project.mainproject.user.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.user.enums.UserStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.IDENTITY;
import static javax.persistence.InheritanceType.JOINED;

@SuperBuilder
@Entity
@Getter
@Setter
@Inheritance(strategy = JOINED)
@NoArgsConstructor
@ToString
@Table(name = "USERS")
public class User extends Auditable{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userIdx;
    @Column(name = "USER_PASSWORD")
    private String password;
    @Column(name = "USER_EMAIL")
    private String email;
    @Column(name = "USER_NAME")
    private String name;
    @Column(name = "USER_ADDRESS")
    private String address;
    private String imagePath;
    @Enumerated(value = STRING)
    @Builder.Default
    private UserStatus userStatus = UserStatus.TEMPORARY;
    private LocalDateTime lastConnectedDate;
    @ElementCollection(fetch = EAGER)
    @CollectionTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "USER_IDX"))
    private List<String> role;


    @Builder // For Mapper
    public User(Long userIdx) {
        this.userIdx = userIdx;
    }

    @Builder
    public User(Long userIdx, String password, String email, String name) {
        this.userIdx = userIdx;
        this.password = password;
        this.email = email;
        this.name = name;
    }

    public User(User user) {
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.name = user.getName();
    }



    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//



}
