import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/Button';


function App() {
  
  return (
    <div className="App">
      <Button>你好1</Button>
      <Button btnType={ButtonType.Primary} disabled>你好2</Button>
      <Button btnType={ButtonType.Link} size={ButtonSize.large} href="6666666">你好3</Button>
    </div>
  );
}

export default App;
