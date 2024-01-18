
import React, { useState } from 'react';

const Notification = ({ reportID, onClose = function (id) {
  return id;
} }) => {

  const [visible, setVisible] = useState(true);
 
  function getReport() {
    window.location.href = `myreport/${reportID}`;
  }

  return (
    <div className={`w-[60%] ml-[20%] bg-slate-700 py-4 px-4 rounded-lg
     shadow-sm shadow-purple-400 will-change-scroll ${visible ? 'visible' : 'hidden'}`}>

      <h2>Good News,</h2>
      <h3>Hey, your report with reference to Report id
        <span className='text-blue-500 mx-2 cursor-pointer'
          onClick={getReport}>{reportID} </span> has been filed.
      </h3>

      <button onClick={() => { setVisible(false); onClose(reportID); }}
        className='flex justify-end mt-2 ml-[70%] shadow-sm shadow-gray-900 bg-gray-800 border-blue-400 hover:border-green-700 transition-all'>
        Delete Notification
      </button>
    </div>
  );
};

export default Notification;
