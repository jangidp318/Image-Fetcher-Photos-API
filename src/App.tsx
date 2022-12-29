import React, { useState } from 'react'
import './App.css'

interface ImageType {
  id: string,
  image: string,
  link: string,
}

const getImages = async (query: string)  => {
  const url = "https://photos-api.jangidp318.workers.dev"

  const resp: ImageType[] = await fetch(url,{
    method: "POST",
    body: JSON.stringify( {query} ),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())

  return resp
}

function App() {
  const [query, setQuery] = useState("")

  const [photos, setImages] = useState<ImageType[]|null>(null)

  return (
    <div className="App">
      <div className="form">
        <input type="text" className="query" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder="Search query"/>
        <button onClick={async () => {setImages(await getImages(query))}}>Search</button>
      </div>
      {
        photos && photos.length > 0?
          photos.map((photo: ImageType) => (
            <img src={photo.image} alt={photo.id} key={photo.id} />
          )) : <p>NO Photos available</p>
      }
    </div>
  )
}

export default App
