package com.backend.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.List;

@RestController
@ResponseBody
public class MapController {

    @Autowired
    private MapService mapService;
     
    @CrossOrigin
    @GetMapping("/api/map")
    public HashMap<String, Integer> getIncomePopulation(@RequestParam Double[] latlon, @RequestParam Double radius) {
        
        HashMap <String, Integer> result = mapService.centroidBasedCalculation(latlon, radius);;
        
        return result;
        // return String.format("Hello %f %f %f", lonlat[0], lonlat[1], radius);
    }
}
