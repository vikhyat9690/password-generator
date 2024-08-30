import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const imagePath = 'https://i0.wp.com/whatismyip.network/wp-content/uploads/2019/09/Strong-Password-Generator.jpg?resize=680%2C383&ssl=1';

  //useRef hook
  const passwordInputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "" ;
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbbnm"
    if(num) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*()_+=-<>?;':"

    for(let i = 1; i<= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);
  },[length, num, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordInputRef.current?.select();
    passwordInputRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  },[password])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, num, charAllowed, passwordGenerator])
  
  return (
    <>
    <div className="bg-cover bg-center h-window" style={{backgroundImage : "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i0.wp.com/whatismyip.network/wp-content/uploads/2019/09/Strong-Password-Generator.jpg?resize=680%2C383&ssl=1')" }}>
    <div className='h-screen w-screen flex justify-center items-center bg-opacity-5'>
      <div className="w-full max-w-md items-center mx-auto shadow-md rounded-xl px-4 my-18 py-8 text-orange-500 bg-gray-800">
      <h1 className='text-white text-center mb-3 text-2xl'>Password Generator</h1>
      < div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder='Password'
        readOnly
        />
        
        <button className='outline-none bg-blue-700 text-white px-3 ot-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={100} value={length} className='cursor-pointer'
          onChange={(e) => {
            setLength(Number(e.target.value))
          }}/>
        <label htmlFor="">Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={num}
          id="numberInput"
          onChange={() => {
            setNum((prev) => !prev);
          }}
          />
          <label htmlFor="">Numbers</label>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" name="" 
            defaultChecked= {charAllowed}
            id="characterInput" 
            onChange={() => {
              setChar((prev) => !prev)
            }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default App
