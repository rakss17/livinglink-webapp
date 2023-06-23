import React, { useEffect, useRef, useState } from 'react';
import { Chart, BarController, PointElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './styles.css'

Chart.register(BarController,LinearScale, PointElement, BarElement, CategoryScale);


function AnalyticsGraph() {
  const canvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const node = canvasRef.current;
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [5, 5, 3, 5, 2, 3, 9, 5],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          
        },
        {
          label: 'Dataset 2',
          data: [2, 3, 10, 5, 1, 4, 12, 4],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        
      ]
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: {
              size: 18,
              family: 'Times New Roman'
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white',
            font: {
              size: 20,
              family: 'Times New Roman'
            }
          },
          grid: {
            color: 'white' // change grid line color to blue
          }
        },
        y: {
          ticks: {
            color: 'white',
            font: {
              size: 20,
              family: 'Times New Roman'
            }
          },
          grid: {
            color: 'white' 
          }
        }
        
      }
    };
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    const newChartInstance = new Chart(node, {
      type: 'bar',
      data: data,
      options: options
    });
    setChartInstance(newChartInstance);
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas className='canvass' ref={canvasRef} />
      
    </div>
  );
}

export default AnalyticsGraph;
