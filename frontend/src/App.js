// src/App.js
import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toast } from './components/Toast';

function App() {
  const [toastResult, setToastResult] = useState(null);

  return (
    <div className="app-wrapper">
      <PipelineToolbar />
      <div className="canvas-wrapper">
        <PipelineUI />
      </div>
      <SubmitButton onResult={setToastResult} />
      <Toast result={toastResult} onClose={() => setToastResult(null)} />
    </div>
  );
}

export default App;