import React, {useState, useEffect} from "react";


// useState: create a state variable, which will contain data retreive from the backend
// and the same state variable will be used to render the data on the page

//useeffect: fetch the backend API on the first render. 

/**
 * MainContent is a React component that fetches and displays messages from a backend service.
 * It initializes with an empty message state and updates this state with messages fetched
 * from the backend upon the component's first mount. The component uses React's useEffect
 * to handle the side effect of fetching data, ensuring it only occurs once after the initial render.
 *
 * @component
 * @returns {React.Component} The MainContent component which displays messages fetched from the backend.
 */
function MainContent() {
  const [data, setData] = useState("")
 /**
   * State variable to store the messages fetched from the backend.
   * @type {Array|string} 'data' can be either an array of messages or an initial empty string.
   */
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