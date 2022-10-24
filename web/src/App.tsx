import { useState, useRef } from "react";
import { PaperPlaneTilt } from 'phosphor-react';

import './styles/main.css';

import logoImg from './assets/logo_neoway.svg';

function App() {
  const [resultUpload, setResultUpload] = useState(null);
  const [bgResult, setBgResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null)

  const submitForm = () => {
    const formData = new FormData();
    const currentFile = inputRef.current?.files || [];
    formData.append('file1', currentFile[0]);

    fetch('http://localhost:3000/file/upload', {
      method: 'POST',
      body: formData
    }).then(
      response => response.json()
    ).then(success => {
      setBgResult(success.error_code ? 'bg-red-500' : 'bg-slate-300');
      setResultUpload(success);
    }).catch(error => {
      setBgResult('bg-red-500');
      setResultUpload(error.message);
    });
  };

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center">
      <img src={logoImg} alt="" className='w-64' />
      <img className="h-16 w-16 object-cover rounded-full mt-4" src="https://avatars.githubusercontent.com/t7cabral" alt="Current profile photo" />
      <h1 className="text-32xl text-white mt-1">Desafio Técnico - Back-End Pleno - Thiago Cabral</h1>
      <h1 className="text-24xl text-white mt-20">Teste backend-end por aqui:</h1>

      <form className="flex items-center space-x-6 mt-8">
        <label className="block">
          <span className="sr-only">Chsoose profile photo</span>
          <input type="file"
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
            ref={inputRef}
          />
        </label>
      </form>

      <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3 mt-8"
        onClick={submitForm}
        disabled={!inputRef}>
        <PaperPlaneTilt size={24} />
        enviar
      </button>

      {
        !resultUpload
          ?
          null
          :
          <div className={`${bgResult} max-w-xl rounded-md container mx-auto space-x-8 p-4 mt-8`}>
            <pre>{JSON.stringify(resultUpload, null, 2)}</pre>
          </div>
      }

    </div>
  )
}

export default App
