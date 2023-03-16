import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'aframe'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import sky from './assets/sky.jpg'
import city from './assets/modal/mountains.glb'
import 'aframe-gltf-part-component';
import bot from './assets/modal/low.glb'
function App() {
  const loader = new GLTFLoader()

  loader.load(
    city, (d) => {
      const entity = document.getElementById('city')
      entity.object3D.add(d.scene);
    }
  )

  loader.load(
    bot, (d) => {
      const entity = document.getElementById('bot')
      entity.object3D.add(d.scene);
    }
  )

  return (
    <a-scene>
      <a-assets>
        <img id="sky" src={sky} />
        </a-assets>
        <a-sky color="#fff" material="src: #sky"
          rotation="0 0 0">
         </a-sky>
          <a-entity camera look-controls gltf-part="src: #bot" position="0 0 0" rotation="0 0 0" id="bot" scale=" 0.1 0.1 0.1" >
    </a-entity>
          <a-entity position="0 0 0" rotation="0 0 0" id="city" scale=" 12 12 12" >
    </a-entity>
        </a-scene>
    
  )
}

export default App
