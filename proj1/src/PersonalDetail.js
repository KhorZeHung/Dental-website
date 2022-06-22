import React from "react";
import "./PersonalDetail.css";

function PersonalDetail() {
  return (
    <>
      <div className="Pd-container">
        <div className="Pd-wrapper">
          <div className="Pd-item1">
            <div className="Pd-label">Phone Number</div>
            <div className="Pd-detail">
              {sessionStorage.getItem("cust_pnum")}
            </div>
          </div>
          <div className="Pd-item1">
            <div className="Pd-label">Name</div>
            <div className="Pd-detail">
              {sessionStorage.getItem("cust_name")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalDetail;
