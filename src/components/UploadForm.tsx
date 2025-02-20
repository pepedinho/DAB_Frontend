"use client"

import styled from 'styled-components';

interface FileInputProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const UploadForm: React.FC<FileInputProps> = ({onFileChange}) => {
  return (
    <StyledWrapper>
      <div className="container"> 
        <div className="header"> 
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> 
              <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#ffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg> <p>Browse File to upload!</p>
        </div> 
        <label htmlFor="file" className="footer"> 
          {/* {file ? (<p>{file.name}</p>) : (<p>Not selected file</p>)}  */}
        </label> 
        <input id="file" type="file"  onChange={onFileChange}/> 
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    height: 300px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 4px 4px 30px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 5px;
    background-color: var(--background);
  }

  .header {
    flex: 1;
    width: 100%;
    border: 2px dashed royalblue;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .header svg {
    height: 100px;
  }

  .header p {
    text-align: center;
    color: white;
  }

  .footer {
    background-color: rgba(0, 110, 255, 0.075);
    width: 100%;
    height: 40px;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;
    border: none;
  }

  .footer svg {
    height: 130%;
    fill: royalblue;
    background-color: rgba(70, 66, 66, 0.103);
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
  }

  .footer p {
    flex: 1;
    text-align: center;
  }

  #file {
    display: none;
  }`;

export default UploadForm;
