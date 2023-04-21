package com.shoppingapp.cogjava2915.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "UserDetails")
public class UserDetails {
	
	@Id
	private String email;
	private String loginId;
	private String firstName;
	private String lastName;		
	private String password;
	private String contactNumber;
	private String role;

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	public UserDetails() {
		
	}
	
	public UserDetails(String email, String loginId, String firstName, String lastName, String password,
			String contactNumber) {
		super();
		this.email = email;
		this.loginId = loginId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.contactNumber = contactNumber;
	}
	@Override
	public String toString() {
		return "UserDetails [email=" + email + ", loginId=" + loginId + ", firstName=" + firstName + ", lastName="
				+ lastName + ", password=" + password + ", contactNumber=" + contactNumber + "]";
	}
		
}
