import Chart from 'chart.js';
import React, { useEffect, useRef } from 'react';

export enum EChartType {
  Bar = 'bar',
  Pie = 'pie',
}

interface Props {
  id: string;
  type: EChartType;
  options: Chart.ChartOptions;
  data: Chart.ChartData;
}

export function CustomChart({ data, id, options, type }: Props) {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const chart = new Chart(ref.current, {
      type,
      options,
      data,
    });

    return () => {
      chart.destroy();
    };
  }, [data, options, type]);

  return (
    <>
      <style jsx>{`
        canvas {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
      <canvas key={id} ref={ref} />
    </>
  );
}
