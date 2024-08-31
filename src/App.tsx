import Image from '@/assets/area-background.jpg';
import ColorPicker from '@/components/ColorPicker';

const App:React.FC = () => {

  return (
    <>
      <ColorPicker pixelsCount={10} img={Image} />
    </>
  );
};

export default App;