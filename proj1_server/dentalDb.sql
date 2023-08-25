CREATE TABLE customer (
  cust_name varchar(255) NOT NULL,
  cust_id int NOT NULL AUTO_INCREMENT,
  cust_password varchar(255) NOT NULL,
  cust_pnum char(13) NOT NULL UNIQUE, 
  PRIMARY KEY(cust_id)  
);

CREATE TABLE dentist (
  d_name varchar(255) NOT NULL,
  d_id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(d_id)  
);

CREATE TABLE treatment (
  t_name varchar(255) NOT NULL,
  t_id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(t_id)  
);

CREATE TABLE appointment (
  a_id int NOT NULL AUTO_INCREMENT,
  cust_id int NOT NULL,
  d_id int NOT NULL, 
  t_id int NOT NULL, 
  a_date_time DATETIME NOT NULL,
  PRIMARY KEY (a_id),
  FOREIGN KEY (cust_id) REFERENCES customer(cust_id), 
  FOREIGN KEY (d_id) REFERENCES dentist(d_id), 
  FOREIGN KEY (t_id) REFERENCES treatment(t_id)
);