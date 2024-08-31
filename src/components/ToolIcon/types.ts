export interface IToolIconProps {
  tool: 'cursor' | 'picker';
  selectedTool: 'cursor' | 'picker';
  handleToolClick: (tool: 'cursor' | 'picker') => void;
}
