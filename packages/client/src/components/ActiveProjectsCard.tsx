import { useProjectFetch } from '@/queries/useProjects';
import { Badge, Box, FormatNumber, Icon, Stat, Text } from '@chakra-ui/react';
import { ArrowUpCircle, Footprints } from 'lucide-react';
import DashboardCardSkeleton from './DashboardCardSkeleton';

type Project = {
  id: string;
  budget: number;
  deadline: Date;
  description: string;
  managerId: string;
  name: string;
  team: string[];
  status: string;
};

type ProjectStatusOBJ = {
  active: number;
  completed: number;
  planning: number;
  onHold: number;
};

const ActiveProjectsCard = () => {
  const { data: projects, isLoading, isRefetching } = useProjectFetch();

  if (isLoading || isRefetching) return <DashboardCardSkeleton />;

  const projectStatusCount: ProjectStatusOBJ = projects.data.reduce(
    (acc: ProjectStatusOBJ, curr: Project) => {
      if (curr?.status === 'active') acc.active++;
      if (curr.status === 'completed') acc.completed++;
      if (curr.status === 'planning') acc.planning++;
      if (curr.status === 'on_hold') acc.onHold++;

      return acc;
    },
    { active: 0, completed: 0, planning: 0, onHold: 0 }
  );

  return (
    <Stat.Root borderWidth={'1px'} padding={'7'} rounded={'xl'} gap="">
      <Stat.HelpText
        textAlign={'left'}
        fontSize={'md'}
        w="max-content"
        color="gray.100"
        fontWeight={'600'}
        justifyContent={'start'}
      >
        <Icon as={Footprints} color="blue.400" size="xl" mr="2" /> Ongoing &
        Onhold Projects
      </Stat.HelpText>
      <Stat.ValueText
        fontSize={'6xl'}
        display={'flex'}
        alignItems={'center'}
        gap={'5'}
      >
        <Stat.ValueUnit>Active</Stat.ValueUnit>
        <FormatNumber value={projectStatusCount.active} style="decimal" />
        <Stat.ValueUnit>Onhold</Stat.ValueUnit>

        <FormatNumber value={projectStatusCount.onHold} style="decimal" />

        <Box>
          <Badge
            colorPalette="green"
            bgColor={'green.300/15'}
            variant={'surface'}
            fontSize={'md'}
            rounded={'lg'}
            size="lg"
            letterSpacing={'wider'}
          >
            <Icon size="sm" as={ArrowUpCircle} /> 11.7%
          </Badge>
          <Text
            fontSize={'.7rem'}
            fontWeight={'600'}
            letterSpacing={'tight'}
            color="gray.400"
          >
            vs last month
          </Text>
        </Box>
      </Stat.ValueText>
    </Stat.Root>
  );
};

export default ActiveProjectsCard;
