import { createListCollection, Select } from '@chakra-ui/react';

const positions = createListCollection({
  items: [
    { label: 'Manager', value: 'manager' },
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Analyst', value: 'analyst' },
    { label: 'Engineer', value: 'engineer' },
    { label: 'Specialist', value: 'specialist' },
    { label: 'Coordinator', value: 'coordinator' },
    { label: 'Administrator', value: 'administrator' },
    { label: 'Associate', value: 'associate' },
    { label: 'Consultant', value: 'consultant' },
    { label: 'Director', value: 'director' },
    { label: 'Technician', value: 'technician' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Architect', value: 'architect' },
    { label: 'Assistant', value: 'assistant' },
  ],
});

const PositionSelect = ({ onPositionChange }) => {
  return (
    <Select.Root
      collection={positions}
      size="sm"
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
          {positions.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
export default PositionSelect;
