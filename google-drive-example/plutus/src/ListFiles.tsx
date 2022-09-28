import { useEffect, useState } from 'react'
import './App.css'

function ListFiles() {
  async function listFiles() {
    const gapi = (window as any).gapi
    let response;
    try {
      response = await gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': 'files(id, name)',
      });
    } catch (err) {
      return '';
    }

    const files = response.result.files;
    if (!files || files.length == 0) {
      return '';
    }
    // Flatten to string to display
    const output = files.reduce(
        (str: any, file: any) => `${str}${file.name} (${file.id}\n`,
        'Files:\n');
    return output
  }

  const [files, setFiles] = useState('there are no files')

  useEffect(() => {
    const fetchData = async () => {
      const output = await listFiles()
      setFiles(output)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>List files</h1>
      { files }
    </div>
  )
}

export default ListFiles
