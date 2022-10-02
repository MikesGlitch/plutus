import { useState } from 'react'
import './App.css'
import ListFiles from './ListFiles';
import { config } from './../config'

function App() {
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
  const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly'
  const CLIENTID = config.CLIENT_ID
  const API_KEY = config.API_KEY
  
  const [loggedIn, setLoggedIn] = useState(false)
  
  async function initClient() {
    await (window as any).gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    })
  
    const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: CLIENTID,
      scope: SCOPES,
      callback: async (response: any) => {
        if (response.error !== undefined) {
          throw (response);
        }
  
        setLoggedIn(true)
      },
    })
  
    if ((window as any).gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }
  
  function authenticate() {
    (window as any).gapi.load('client', initClient);
  }

  return (
    <div className="App">
      <p>TODO: IndexedDB stuff with <a target="_blank" href="https://github.com/dexie/Dexie.js">Dexie</a></p>
      {loggedIn === false && <button onClick={authenticate}>Login to list Google Drive files</button>}
      {loggedIn && <ListFiles />}
    </div>
  )
}

export default App
