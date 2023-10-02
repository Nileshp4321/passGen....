// import logo from './logo.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [specialchar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");
  const inputRange = useRef(null);
  const inputText = useRef(null);
  const changeButtonText = useRef(null);
  const [copy, setCopy] = useState("Copy");

  const handleChange = (e) => {
    setLength(e.target.value);
    if (length > 52) {
      inputRange.current.className += "input-group w-50 mx-auto w-100";
    }
    else {
      inputRange.current.className += "input-group w-50 mx-auto w-50";
    }
  }
  const handleCheckBox = (e) => {
    setNumber((prev) => {
      return (!prev);
    });
  }
  const handleCheck = (prev) => {
    setSpecialChar((prev) => {
      return (!prev);
    });
  }
  const passwordCopy = (e) => {
    setCopy("Copied !")

    window.navigator.clipboard.writeText(password).then((cliptext) => {
      inputText.current?.select();
      inputText.current?.setSelectionRange(0, 99);
      setTimeout(() => {
        setCopy("Copy")
      }, 2000)

    }).catch((err) => {
      alert(err);
    });



  }



  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "1234567890"
    if (specialchar) str += "!@#$%^&*()_+{}?></"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, specialchar, setPassword])


  useEffect(() => {
    passwordGenerator();
  }, [length, number, specialchar, passwordGenerator])
  return (
    <>
      <div className='container mt-5 flex flex-nowrap box  '>
        <h1 className='h1 text-center m-5 text-primary'>Password Generator</h1>
        <div className="input-group w-50 mx-auto" ref={inputRange}>
          <input type="text" className="form-control" ref={inputText} value={password} placeholder="Password" aria-label="Username" aria-describedby="addon-wrapping" readOnly />
          <button className='btn btn-primary' onClick={passwordCopy} ref={changeButtonText} >{copy}</button>
        </div>
        <div className='input-group flex flex-row flex-wrap justify-content-center '>
          <div className='mt-2 ms-3  flex flex-row'>
            <label htmlForfor="length">Length{`(${length})`}</label>
            <input type="range" style={{accentColor:"blue"}} className='m-2' min={8} max={100} value={length} onChange={handleChange} />
          </div>
          <div className='mt-2 ms-3  flex flex-row'>
            <label for="length">Numberr</label>
            <input type="checkbox"  onChange={handleCheckBox} value={number} className='m-2' />
          </div>
          <div className='mt-2 ms-3  flex flex-row'>
            <label for="length">Special Character</label>
            <input type="checkbox" onChange={handleCheck} value={specialchar} className='m-2' />
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
