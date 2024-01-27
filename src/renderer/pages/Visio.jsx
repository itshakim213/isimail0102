import React from 'react';
import Navbar from '../components/Navbar';
import MainSection from '../components/MainSection';
import VideoPlayer from '../components/VideoPlayer';

function Visio() {
  return (
    <div className="visio">
      <MainSection />
    </div>
  );
}

export default Visio;
// import React from 'react';
// import VideoPlayer from '../components/VideoPlayer';
// import Options from '../components/Options';
// import Notifications from '../components/Notifications';

// function Visio() {
//   return (
//     <div
//       className="page"
//       style={{
//         marginLeft: 85,
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'row',
//       }}
//     >
//       <VideoPlayer />
//       <Options>
//         <Notifications />
//       </Options>
//     </div>
//   );
// }

// export default Visio;
