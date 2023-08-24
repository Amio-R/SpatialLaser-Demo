package com.backend.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import org.locationtech.jts.geom.Polygon;
import org.hibernate.annotations.Type;
import java.io.Serializable;

import lombok.Data;

@Entity
@Table(name="dfw_demo")
@Data
public class Map {

    @Id
    @Column(name="[Key]")
    private String key;

    @Column(name="income")
    private int income;

    @Column(name="population")
    private int population;

    @Column(name="spatialobj")
    @Convert(converter = Polygon.class)
    private Polygon spatialobj;
}
