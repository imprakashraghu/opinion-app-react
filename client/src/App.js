import React, { useState, useEffect } from 'react';
import OpinionViewer from './OpinionViewer';
import io from 'socket.io-client';

const socket = io(window.location.hostname+":4001");

function App() {

  const [isDone, setIsDone] = useState(false);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [dataFromServer, setData] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('update', (data) => {
      setData(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('vote');
    };
  }, []);

  const sendPing = (index) => {
    socket.emit('vote', index);
    setIsDone(true);
  };

  return (
    <div className="w-full flex lg:flex-row flex-col items-start bg-white min-h-screen p-8">
      <div className='w-full lg:w-1/2 flex flex-col'>
        <div className='w-12 h-4 bg-green-400 my-2'></div>
        <h1 className='w-full text-left text-black font-semibold text-xl py-2'>
          Speaker Review App 👋
        </h1>
        <p className='w-full text-left text-black text-lg py-2 mb-4'>
          Thank you, lending your ears for the entire session.<br/> Kindly leave your opinion about the session.
        </p>
        <div className={`${isDone?'flex':'hidden'} py-4 w-full lg:w-1/2 flex-col items-center justify-center`}>
            <img src='/salute.png' alt='salut-icon' className='object-contain h-20 mb-3' />
            <h1 className='text-black font-medium text-center w-full text-4xl'>
              Thank You!
            </h1>
            <p className='text-black text-sm text-center'>
              (Thanks Nanba)
            </p>
        </div>
        <div className={`w-full ${isDone?'hidden':'grid'} grid-rows-3 grid-cols-1 gap-4`}>
          <button
            onClick={() => sendPing(0)}
            className='w-40 text-center rounded-md text-white font-semibold py-2 px-3 text-lg flex items-center justify-center shadow bg-green-400 border-2 border-green-500'>
            <span className='mx-3'>🫡</span> Useful
          </button>
          <button 
            onClick={() => sendPing(1)}
            className='w-40 text-center rounded-md text-white font-semibold py-2 px-3 text-lg flex items-center justify-center shadow bg-blue-400 border-2 border-blue-500'>
            <span className='mx-3'>🙌</span> Enjoyed
          </button>
          <button
            onClick={() => sendPing(2)} 
            className='w-40 text-center rounded-md text-white font-semibold py-2 px-3 text-lg flex items-center justify-center shadow bg-red-400 border-2 border-red-500'>
            <span className='mx-3'>😴</span> Bored
          </button>
        </div>
      </div>
      <div className='w-full lg:w-1/2 flex flex-col mt-4 lg:mt-0 lg:pr-4' style={{ maxHeight: 500 }}>
        <OpinionViewer data={dataFromServer} />
        <h1 className='text-black text-lg text-left py-2 mt-8'>
          Hey 👋 It's your speaker. Feel free to contact me:
        </h1>
        <div className='py-3 w-full grid grid-cols-5 gap-4'>
          <a target='_blank' rel="noreferrer" href='https://linkedin.com/in/imprakashraghu' className='text-black text-blue-500 underline text-md text-left w-full'>
            Linkedin
          </a>
          <a target='_blank' rel="noreferrer" href='https://github.com/imprakashraghu' className='text-black text-blue-500 underline text-md text-left w-full'>
            GitHub
          </a>
          <a target='_blank' rel="noreferrer" href='mailto:prakashjaw@hotmail.com' className='text-black text-blue-500 underline text-md text-left w-full'>
            Email
          </a>
          <a target='_blank' rel="noreferrer" href='https://imprakashraghu.medium.com' className='text-black text-blue-500 underline text-md text-left w-full'>
            Blogs
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
