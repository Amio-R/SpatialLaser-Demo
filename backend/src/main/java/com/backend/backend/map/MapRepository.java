package com.backend.backend;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MapRepository extends JpaRepository<Map, String> {
   
    @Query(value = "SELECT income, population FROM dfw_demo WHERE ST_Within(ST_Centroid(spatialobj), ST_GeomFromText('Polygon(( ' || ?1 || ' ))', 4326)) OR ST_Intersects(ST_Centroid(spatialobj), ST_GeomFromText('Polygon(( ' || ?1 || ' ))',4326))",
    nativeQuery = true)
    List<Object[]> centroidBasedIncomePopulation(String polygon);
}

