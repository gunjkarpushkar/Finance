import React, {useState, useEffect} from "react";


// useState: create a state variable, which will contain data retreive from the backend
// and the same state variable will be used to render the data on the page

//useeffect: fetch the backend API on the first render. 

function MainContent() {
  const [data, setData] = useState("")
  // setData is the function which can be used to manipulate the state of the data variable 
  // initally it is blank, but will set to backend data

  useEffect(() => {
    fetch("/message").then(
      // useEffect is used to retreive the data from the backend
      res => res.json())
      // the data retreived will be stored into json
    .then(response => {
        setData(response) // data is set using the setData function
        console.log(response)
      })
      .catch(error => console.error("fect error:", error));
  }, []);

  return (
    <div>
        
      {/* <p> Message from Backend: {message} </p> Render the message */}

      {(typeof data.message === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.message.map((message, i) => (
          <p key={i}>{message}</p>
        ))
      )}

    </div>
  )
}

export default MainContent