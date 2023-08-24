package com.backend.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.bedatadriven.jackson.datatype.jts.JtsModule;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean 
	public JtsModule jtsModule(){
		return new JtsModule();
	}
}
