import React from "react";
import { Line } from "react-chartjs-2";

// defaults.global.tooltips.enabled = false;

function Chart(props) {
  const { data } = props.graphData;
  console.log(data);
  if (!data.country2) {
    const { country, title, xaxis, xrange, yaxis, yrange } = data;
    console.log(country);

    return (
      <div>
        <Line
          data={{
            name: xaxis,
            labels: xrange,
            datasets: [
              {
                label: country,

                data: yrange,
                backgroundColor: ["black"],
                borderWidth: 4,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 17,
                },
              },
            },
            maintainAspectRatio: false,
            scales: {
              yAxes: {
                title: {
                  display: true,
                  text: yaxis,
                  font: {
                    size: 17,
                  },
                },
              },
              xAxes: {
                title: {
                  display: true,
                  text: xaxis,
                  font: {
                    size: 20,
                  },
                },
              },

              // yaxes: [{ ticks: { beginAtZero: true } }],
            },
          }}
        />
      </div>
    );
  } else {
    const {
      country1,
      country2,
      title,
      xaxis,
      xrange,
      yaxis,
      yrange1,
      yrange2,
    } = data;
    console.log("This is data: ", data);
    return (
      <div>
        <Line
          data={{
            name: xaxis,
            labels: xrange,
            datasets: [
              {
                label: country1,

                data: yrange1,
                backgroundColor: ["red"],
                borderWidth: 4,
              },
              {
                label: country2,

                data: yrange2,
                backgroundColor: ["blue"],
                borderWidth: 4,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            plugins: {
              title: {
                display: true,
                text: title,
                font: {
                  size: 17,
                },
              },
            },
            maintainAspectRatio: false,
            scales: {
              yAxes: {
                title: {
                  display: true,
                  text: yaxis,
                  font: {
                    size: 17,
                  },
                },
              },
              xAxes: {
                title: {
                  display: true,
                  text: xaxis,
                  font: {
                    size: 20,
                  },
                },
              },

              // yaxes: [{ ticks: { beginAtZero: true } }],
            },
          }}
        />
      </div>
    );
  }
}
export default Chart;
