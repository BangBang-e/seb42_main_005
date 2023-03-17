package com.project.mainproject.review.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.review.enums.ReviewStatus;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.tag.entity.ReviewTag;
import com.project.mainproject.user.entity.User;
import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;
import static lombok.Builder.Default;

@Entity
@Getter
@Setter
@Table(name = "REVIEW")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long reviewIdx;
    private String content;
    private int rating;

    @Formula("(SELECT count(1) FROM report r WHERE r.review_idx = review_idx)")
    private int reportCnt;

    @Default
    @Enumerated(value = STRING)
    private ReviewStatus reviewStatus = ReviewStatus.POSTED;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_IDX")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "STORE_IDX")
    private Store store;

    @Default
    @OneToMany(mappedBy = "review", fetch = LAZY, cascade = {ALL}, orphanRemoval = true)
    private Set<ReviewTag> reviewTags = new HashSet<>();

    @Default
    @OneToMany(mappedBy = "review", fetch = LAZY, cascade = {ALL}, orphanRemoval = true)
    private List<ReviewImage> reviewImages = new ArrayList<>();

    //### 간단한 동작메서드 ###//
    public void addReviewImage(String imagePath) {
        reviewImages.add(ReviewImage.builder()
                        .imagePath(imagePath)
                        .review(this)
                        .build());
    }

    public void updateReviewImage(String imagePath) {
        deleteReviewImage();
        if (!imagePath.equals("")) {
            reviewImages.add(ReviewImage.builder()
                    .imagePath(imagePath)
                    .review(this)
                    .build());
        }
    }

    public void deleteReviewImage() {
        reviewImages.clear();
    }

    // ###연관관계  편의 메서드 ###//

}
