import Plot from 'react-plotly.js';

const BarChart = ({ title, currentValue, recommendations, yLabel, unit }) => {
  const labels = ['CI', 'Optimal', 'Best', 'Good'];
  const values = [
    currentValue,
    recommendations[0]?.[yLabel],
    recommendations[1]?.[yLabel],
    recommendations[2]?.[yLabel],
  ];

  // Calculate differences from current
  const annotations = values.map((val, idx) => {
    if (idx === 0) return null;
    const diff = ((val - currentValue) / currentValue) * 100;
    const text = `${Math.abs(diff.toFixed(2))}% ${diff < 0 ? 'lower' : 'higher'}`;
    return {
      x: labels[idx],
      y: val,
      text: text,
      showarrow: false,
      font: { color: 'white' },
    };
  });

  return (
    <Plot
      data={[
        {
          x: labels,
          y: values,
          type: 'bar',
          marker: {
            color: ['gray', 'dodgerblue', 'dodgerblue', 'dodgerblue'],
          },
        },
      ]}
      layout={{
        title: `${title} (${unit})`,
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        font: { color: 'white' },
        annotations: annotations.filter(Boolean),
      }}
      config={{ displayModeBar: false }}
    />
  );
};

export default BarChart;
