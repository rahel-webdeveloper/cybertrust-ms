import { Chart, useChart } from '@chakra-ui/charts';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

const QuotaionsBars = ({ quotationData }) => {
  const chartData = quotationData.data
    .map((quotation) => ({
      quotation: quotation.amount,
      type: quotation.project.name.slice(0, 12),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 7);

  const chart = useChart({
    data: chartData,
    series: [{ name: 'quotation', color: 'teal.solid' }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data} barSize={34}>
        <CartesianGrid stroke={chart.color('border.muted')} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key('quotation')}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `${value}K`}
        />
        <Tooltip
          cursor={{ fill: chart.color('bg.muted') }}
          animationDuration={0}
          content={<Chart.Tooltip />}
        />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            radius={10}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
};

export default QuotaionsBars;
