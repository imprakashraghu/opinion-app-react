import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Public Opinion',
    },
  },
};

const labels = ['Useful', 'Enjoyed', 'Bored'];

export const _data = {
  labels,
  datasets: [
    {
      label: 'Useful',
      data: [5,0,0],
      backgroundColor: 'rgba(0, 255, 0, 0.5)',
    },
    {
      label: 'Enjoyed',
      data: [0,10,0],
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    },
    {
      label: 'Bored',
      data: [0,0,1],
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
    }
  ],
};

function OpinionViewer({ data=null }) {

  const buildFromData = (input) => {
    let result = {
      labels,
      datasets: [
        {
          label: input[0].label,
          data: [input[0].votes||0, 0, 0],
          backgroundColor: input[0].color
        },
        {
          label: input[1].label,
          data: [0, input[1].votes||0, 0],
          backgroundColor: input[1].color
        },
        {
          label: input[2].label,
          data: [0, 0, input[2].votes||0],
          backgroundColor: input[2].color
        }
      ]
    };
    return result;
  }

  return (
    <Bar options={options} data={data?buildFromData(data):_data} />
  )
}

export default OpinionViewer