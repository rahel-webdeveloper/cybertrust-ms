import { Chart, useChart } from '@chakra-ui/charts';
import { Icon, Text, VStack } from '@chakra-ui/react';
import { MountainSnow } from 'lucide-react';
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
    <VStack align={'start'} borderWidth={'1px'} rounded={'xl'}>
      <Text
        fontSize={'2xl'}
        m="5"
        // mx=""
        fontWeight={'500'}
        display={'flex'}
        gap={'3'}
        alignItems={'center'}
      >
        <Icon as={MountainSnow} color="cyan.400" />
        Hightest Project Qoutations
      </Text>
      <Chart.Root maxH="sm" chart={chart}>
        <BarChart data={chart.data} barSize={34}>
          <CartesianGrid
            stroke={chart.color('border.muted')}
            vertical={false}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={chart.key('type')}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: any) => `${value}K`}
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
    </VStack>
  );
};

export default QuotaionsBars;
