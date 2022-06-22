import React from "react";
import "./Table.css";

function Table({ data }) {
  return (
    <>
      {data.length > 0 ? (
        <>
          <table className="Ad-table">
            <thead className="Ad-table-header">
              <tr className="T-tr2">
                <th>Dentist.Appoint</th>
                <th>Treatment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr className="T-tr1">
                  <td>{d.d_name}</td>
                  <td>{d.t_name}</td>
                  <td>{d.a_date_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="T-wrapper">no appointment</div>
        </>
      )}
    </>
  );
}

export default Table;
