import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/Button';


function App() {
  
  return (
    <div className="App">
      <Button btnType={ButtonType.Default} autoFocus>你好1</Button>
      <Button btnType={ButtonType.Primary} disabled>你好2</Button>
      <Button btnType={ButtonType.Link} size={ButtonSize.Large} href="www.baidu.com" target="_blank">你好3</Button>
      <Button btnType={ButtonType.Link} href="6666666" disabled>你好3</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small} >你好4</Button>
    </div>
  );
}

export default App;
