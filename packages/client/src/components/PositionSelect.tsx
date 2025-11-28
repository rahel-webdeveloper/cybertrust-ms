import { createListCollection, Select } from '@chakra-ui/react';

const positions = createListCollection({
  items: [
    { label: 'Manager', value: 'manager' },
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Analyst', value: 'analyst' },
    { label: 'Specialist', value: 'specialist' },
    { label: 'Coordinator', value: 'coordinator' },
    { label: 'Associate', value: 'associate' },
    { label: 'Consultant', value: 'consultant' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Architect', value: 'architect' },
  ],
});

const PositionSelect = ({ onPositionChange }) => {
  return (
    <Select.Root
      collection={positions}
      size="sm"
      defaultValue={['architect']}
      onChange={(e) => onPositionChange(e.target.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger rounded={'full'}>
          <Select.ValueText placeholder="Select position" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {positions.items.map((position) => (
            <Select.Item item={position} key={position.value}>
              {position.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
export default PositionSelect;
