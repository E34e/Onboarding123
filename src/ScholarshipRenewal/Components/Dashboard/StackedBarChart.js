import React from "react";
import Chart from 'react-apexcharts';

function Stackedbarchart()
{
  return(
        <React.Fragment>
            <div className="container-fluid mb-3">
               
                <Chart
                type="bar"
                width={530}
                height={430}
                series= {[{
                    name: 'PROMOTED',
                    data: [53, 55, 41, 52, 22, 43, 81]
                  }, {
                    name: 'NON-PROMOTED',
                    data: [39, 32, 33, 32, 13, 30, 61]
                  }, {
                    name: 'PENDING',
                    data: [14, 23, 8, 20, 9, 13, 20]
                  },]}

                options={{
                    title:{
                        text:"Degree Academic Student Details Course Wise"
                    },
                    chart:{
                        stacked:true,
                    },
                    plotOptions:{
                        bar:{
                            vertical:true,
                            columnWidth:'50%'
                          }
                    },
                    stroke: {
                        width: 1,
                    },
                    xaxis:{
                        title:{
                            text:"Degree Academic Student Details Course Wise"
                        },
                        categories:['B.vocational','B.Ed(Hindi)','BSc','B.A','BCom','B.Sc(Zoology)','HC SOCIO']
                    },
                    yaxis:{
                        title:{
                            text:"Data "
                        },
                    },
                    legend:{
                        position: 'bottom'
                    },
                    dataLabels:{
                        enabled:true,
                    },
                    grid: {
                        show:true,
                        xaxis:{
                            lines:{
                                show:false
                            }
                        },
                        yaxis:{
                            lines:{
                                show:false
                            }
                        }

                    }

                }}

                />
            </div>
        </React.Fragment>
    );
}
export default Stackedbarchart;