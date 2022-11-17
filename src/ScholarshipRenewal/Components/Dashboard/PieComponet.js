import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function PieChart() {
  const [studentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentmarks] = useState([]);
  useEffect(() => {
    const studentsubjects = [];
    const studentmarks = [];
    const getStudentdata = async () => {
      const reqData = await fetch(
        "http://172.16.150.61:8302/jnbap/promotestudents"
      );
      const resData = await reqData.json();
      console.log(resData);
      for (let i = 0; i < resData.length; i++) {
        studentsubjects.push(resData[i].course);
        studentmarks.push(parseInt(resData[i].promoted));
      }
      setStudentsubject(studentsubjects);
      setStudentmarks(studentmarks);
      console.log(resData);
    };
    getStudentdata();
  }, []);

  return (
    <div>
      <React.Fragment>
        <div className="container-fluid mb-3">
          <h3 className="mt-3">Status of Renewals</h3>
          <Chart
            type="pie"
            width={350}
            height={350}
            series={studentMarks}
            //   {[23,43,50,54,65]}
            options={{
              title: { text: "" },
              noData: { text: "empty data" },
              labels: studentSubject,
              // ['a','b','d','e','r']
            }}
          ></Chart>
        </div>
      </React.Fragment>
    </div>
  );
}
