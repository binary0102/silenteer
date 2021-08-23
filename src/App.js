import './App.css';
import { useState, useEffect } from "react";
import { postResetStateColor, getStatus } from "./utils"
const DEFAULT_VALUE_COLOR = 'blue';

function App() {
  const [color, setColor] = useState(DEFAULT_VALUE_COLOR);
  useEffect(() => {
    resetState();
  }, []);

  const resetState = () => {
    postResetStateColor().then(res => {
      if (res.status === 200) {
        setColor(DEFAULT_VALUE_COLOR);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  const handleClickButtonReset = async () => {
    resetState();
  }

  const handleClickButton = (stage) => {
    getStatus(stage).then(res => {
      if (res.status === 200) {
        setColor(stage);
      }
    }).catch(err => {
      if (err.response.status === 400) {
        window.alert(err.response.data)
      }
      console.log("err", err.response);
    })
  }

  const renderButton = (stage) => {
    return (
      <div className="circle btn"
          onClick={() => handleClickButton(stage)}
          style={{ borderColor: color === stage ? 'red' : '#292929' }}>
          {stage} 
    </div>
    )
  }

  return (
    <div className="container">
      <div>
        {renderButton('blue')}
        <div className="d-flex"> 
        {renderButton('green')}
          <div className="btn btn-reset" onClick={handleClickButtonReset}>
          Reset
        </div>
        </div>
        {renderButton('yellow')}
      </div>
    </div>
  );
}

export default App;
