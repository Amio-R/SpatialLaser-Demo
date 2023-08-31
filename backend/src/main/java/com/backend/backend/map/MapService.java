package com.backend.backend.map;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.*;

@Service
public class MapService {

    @Autowired
    private MapRepository mapRepository;

    public HashMap <String, Integer> centroidBasedCalculation(Double[] latlon, Double radius) {
        // create circle shaped polygon using lonlat and raaius
        // 64 point polygon to be used as a circle
        // Latitude is approx 110.574 km per degree and Longitude is 111.320km*cos(latitude) per degree
        // get ratio of x and y distances
        Double distanceX = radius/(111320*Math.cos(latlon[0]*Math.PI/180));
        Double distanceY = radius/110574;

        String concatenatePoints = "";
        String closingPoint = "";
        int points = 360;

        for(int i = 0; i < points; i++){
            // get angle of each point on the circumference
            Double theta = ((double)i/ (double) points)*(2*Math.PI);
            // get x and y coordinates, latlon[0]=latitude at center, latlon[1]-longitude at center
            Double x = (distanceX*Math.cos(theta)) + latlon[1];
            Double y = (distanceY*Math.sin(theta)) + latlon[0];

            // Need to close polygon to be a circle, x and y at i=0 should be inserted
            // again at the end of the Polygon((first_points,...,first_points))
            if (i == 0) {
                closingPoint = x + " " + y;
            }

            concatenatePoints = concatenatePoints + x + " " + y + ",";
        }

        concatenatePoints = concatenatePoints + closingPoint;

        List<Object[]> centroidIncomePopulationResults = mapRepository.centroidBasedIncomePopulation(concatenatePoints);
        int totalPopulation = 0;
        int averageIncome = 0;

        // iterate and add up total #of income and population
        for(Object[] row: centroidIncomePopulationResults){
            totalPopulation = totalPopulation + (int)row[1];
            averageIncome = averageIncome + (int)row[0];
        }
        
        int sizeOfQuery = centroidIncomePopulationResults.size();

        if (sizeOfQuery != 0){
            averageIncome = averageIncome / sizeOfQuery;
        }

        HashMap <String, Integer> centroidResult = new HashMap<String, Integer>();
        centroidResult.put("averageIncome", averageIncome);
        centroidResult.put("totalPopulation", totalPopulation);

        return centroidResult;
    }
}
