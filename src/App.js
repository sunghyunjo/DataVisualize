import React, { Component } from "react";
import * as THREE from "three";
import { CompressedPixelFormat } from "three";

class App extends Component {

  componentDidMount(){
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.camera.position.z = 100;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.start();
    window.addEventListener('scroll', this.onScroll);
  }

componentWillUnmount(){
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
}

start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
}

stop = () => {
    cancelAnimationFrame(this.frameId);
}

animate = () => {
   this.cube.rotation.x += 0.01;
   this.cube.rotation.y += 0.01;
   this.renderScene();
   this.frameId = window.requestAnimationFrame(this.animate);
}

renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}

onScroll = () => {
  const scroll = window.scrollY;

  if(scroll > 0) {
    this.camera.position.z -= 3;
  } else {
    this.camera.position.z += 3;
  }

  console.log(window.scrollY);
  console.log(this.camera.position.z);
  
}

render(){
    return(
      <div
        style={{ width: '100%', height: '100vh' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default App;