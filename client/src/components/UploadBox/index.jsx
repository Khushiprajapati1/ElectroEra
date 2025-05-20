// import React from 'react';
// import { FaRegImages } from "react-icons/fa";


// const UploadBox = (props) => {
//   return (
//     <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)]
//     h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
//         <FaRegImages className=' text-[50px] opacity-35 pointer-events-none'/>
//       <h4 className='font-[14px]'>Image upload</h4>
//       <input type="file" multiple={props.multiple!==undefined ? props.multiple : false} className='absolute top-0 left-0 w-full h-full z-50 opacity-0'/>
//     </div>
//   )
// }

// export default UploadBox;



import React from 'react';
import { FaRegImages } from "react-icons/fa";

const UploadBox = (props) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filenames = files.map(file => file.name);
    if (props.onFilesSelected) {
      props.onFilesSelected(filenames); // Pass selected files to the parent component
    }
  };

  return (
    <div className='uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)]
      h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
      <FaRegImages className=' text-[50px] opacity-35 pointer-events-none'/>
      <h4 className='font-[14px] text-center'>Upload Images</h4>
      <input
        type="file"
        multiple={props.multiple !== undefined ? props.multiple : false}
        className='absolute top-0 left-0 w-full h-full z-50 opacity-0'
        onChange={handleFileChange} // Trigger file change handler
      />
    </div>
  );
}

export default UploadBox;

