import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DashboardProps } from '../../../types';

const Grafico = ({ resumen, result }: DashboardProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);


  useEffect(() => {
    if (chartRef.current && resumen) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy(); // destroy previous instance
        }
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: result.map((data: any) => data.fecha),
            datasets: [{
              label: 'Total',

              data: result.map((data: any) => data.total),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1

            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }

        });
      }
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [result, resumen]);


  return (
    <div className='grafico'>
    
        <canvas ref={chartRef}></canvas>
  
    </div>
  );
};

export default Grafico;
