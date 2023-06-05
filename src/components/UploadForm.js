import { useMemo, useContext } from "react";
import { Context } from "../context/FirestoreContext";
import { Firestore } from "../handlers/firestore";
import { useAuthContext } from "../context/AuthContext";
import Storage from "../handlers/storage";

const { writeDoc } = Firestore
const { uploadFile, downloadFile } = Storage
const Preview = () => {
  const { state } = useContext(Context)
  const { inputs } = state  
  return (
    inputs.path && <div
      className="rounded p-1 m-5"
      style={{
        width: "30%",
        height: "300px",
        backgroundImage: `url(${inputs.path}`,
        backgroundSize: "cover",
      }}
    ></div>
  )
}

const UploadForm = () => {
  const { dispatch, state, read } = useContext(Context)
  const { isCollapsed: isVisible, inputs} = state
  const handleOnChange = (e) => dispatch({type: 'setInputs', payload: { value: e }})
  const { currentUser } = useAuthContext() 
  const username = currentUser?.displayName.toLowerCase().split(' ').join('') 
  const handleOnSubmit = (e) => {
    e.preventDefault();
      uploadFile(state.inputs)
      .then(downloadFile)
      .then(url => {
        writeDoc({...inputs, path: url, user: username}, 'stocks').then(() => {
          read()
          dispatch({type: 'collapse', payload: {bool: false }}) 
        })
      })
        
  }

  const isDisabled = useMemo(()=> {
    return !!Object.values(state.inputs).some(input => !input)
  }, [state.inputs])

  return (
    isVisible && <>
      <p className="display-6 text-center mb-3">Upload Stock Image</p>
      <div className="mb-5 d-flex align-items-center justify-content-center">
         <Preview />
        <form onSubmit={handleOnSubmit} className="mb-2" style={{ textAlign: "left" }}>
          <div className="mb-3">
           
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="title"
              aria-describedby="text"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="file" 
              className="form-control" 
              name="file"
              onChange={handleOnChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success float-end"
            disabled={isDisabled}
          >
            Save changes
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadForm