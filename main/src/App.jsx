import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from 'react';

// Lazy load Aboutus page
const Aboutus = React.lazy(() => import('./Pages/Aboutus'));

function App() {
  return (
    <div className=''>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Aboutus />
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
