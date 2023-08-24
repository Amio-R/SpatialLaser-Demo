package com.backend.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.geo.Polygon;

import java.util.List;

public interface MapRepository extends JpaRepository<Map, String> {
   
    @Query(value = "select income, population from dfw_demo where ST_Within(spatialobj, :circle) or ST_Intersects(spatialobj, :circle);", nativeQuery = true)
    List<Object[]> centroidBasedIncomePopulation(Polygon circle);
}
