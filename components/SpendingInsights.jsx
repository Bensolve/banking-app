// components/SpendingInsights.js
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js plugins
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SpendingInsights({ chartData }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 col-span-1 md:col-span-2">
      <h2 className="text-lg font-semibold text-gray-800">Spending Insights</h2>
      <Doughnut data={chartData} />
    </div>
  );
}
