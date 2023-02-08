import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';

function App() {
  
  return (
    <div className="App">
      <Button btnType={ButtonType.Default} autoFocus>你好1</Button>
      <Button btnType={ButtonType.Primary} disabled>你好2</Button>
      <Button btnType={ButtonType.Link} size={ButtonSize.Large} href="www.baidu.com" target="_blank">你好3</Button>
      <Button btnType={ButtonType.Link} href="6666666" disabled>你好3</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small} >你好4</Button>

      <hr></hr>

      <Menu defaultIndex={"0"} onSelect={(index: string)=> console.log("点击了 ", index)}>
        <MenuItem >
          cool link
        </MenuItem>
        <MenuItem >
          cool link
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem >111</MenuItem>
          <MenuItem>222</MenuItem>
        </SubMenu>
        <MenuItem index={"2"} disabled={true}>
          cool link
        </MenuItem>
      </ Menu>

      <Menu defaultIndex={"0"} onSelect={(index: string)=> console.log("点击了 ", index)} mode="vertical" defaultOpenSubMenus={["2"]}>
        <MenuItem >
          cool link
        </MenuItem>

        <SubMenu title="dropdown1">
          <MenuItem >111</MenuItem>
          <MenuItem>222</MenuItem>
        </SubMenu>

        <SubMenu title="dropdown2">
          <MenuItem >111</MenuItem>
          <MenuItem>222</MenuItem>
        </SubMenu>

        <MenuItem disabled={true}>
          cool link
        </MenuItem>
      </ Menu>

    </div>
  );
}

export default App;
