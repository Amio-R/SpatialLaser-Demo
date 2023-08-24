package com.backend.backend;

import org.springframework.data.geo.Polygon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;

import java.util.List;
import java.util.ArrayList;
import java.lang.*;

@Service
public class MapService {

    @Autowired
    private MapRepository mapRepository;

    public List<Object[]> centroidBasedCalculation(Double[] latlon, Double radius) {
        // create circle shaped polygon using lonlat and raaius
        // 64 point polygon to be used as a circle
        // Latitude is approx 110.574 km and Longitude is 111.320km*cos(latitude)
        Double km = radius/1000.0;
        // get ratio of x and y distances
        Double distanceX = km/(111.320*Math.cos(latlon[0]*Math.PI/180));
        Double distanceY = km/110.574;

        List<Point> listOfPoints = new ArrayList<Point>();
        int points = 64;

        for(int i = 0; i < points; i++){
            // get angle of each point on the circumference
            Double theta = ((double)i/ (double) points)*(2*Math.PI);
            // get x and y coordinates
            Double x = distanceX*Math.cos(theta);
            Double y = distanceY*Math.sin(theta);

            System.out.printf("Lat Lon: %f, %f%n", x+latlon[0], y+latlon[1]);
            
            listOfPoints.add(new Point(y+latlon[1], x+latlon[0]));
        }

        Polygon circle = new Polygon(listOfPoints);
        

        // get x coordinate () 
        return mapRepository.centroidBasedIncomePopulation(circle);
    }
}
