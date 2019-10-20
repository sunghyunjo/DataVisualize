import React, { Component } from "react";
import * as THREE from "three";
import { CompressedPixelFormat } from "three";

class App extends Component {

  state = {
    color: '#ffffff',
    isDraging: false,
    previousMousePosition: {
      x: 0,
      y: 0,
    },
  }

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
    this.camera.position.z = 10;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

componentWillUnmount(){
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
}

start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.renderScene);
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

addCircle = () => {
  const geometry = new THREE.CircleGeometry(1, 100, 1);
  const material = new THREE.MeshBasicMaterial({ color: this.state.color});
  const circle = new THREE.Mesh(geometry, material);
  this.scene.add(circle);
  circle.position.set(0, 1, 0);
  this.frameId = requestAnimationFrame(this.renderScene);
}

addRectangle = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: this.state.color});
  const rect = new THREE.Mesh(geometry, material);
  this.scene.add(rect);
  rect.position.set(1, 0, 0);
  this.frameId = requestAnimationFrame(this.renderScene);
}

addTriangle = () => {
  const geometry = new THREE.CircleGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: this.state.color});
  const triangle = new THREE.Mesh(geometry, material);
  this.scene.add(triangle);
  triangle.position.set(2, 0, 0);
  this.frameId = requestAnimationFrame(this.renderScene);
}

addLine = () => {
  const material = new THREE.LineBasicMaterial({color: this.state.color});
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3( -5, 0, 0 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, 0, 0 )
  );
  
  const line = new THREE.Line( geometry, material );
  this.scene.add( line );

  this.frameId = requestAnimationFrame(this.renderScene);
}

changeColor = (color) => {
  this.setState({
    color,
  });
}

onMouseDown = () => {
  this.setState({
    isDraging: true,
  })
}

onMouseMove = (e) => {
  const { previousMousePosition, isDraging} = this.state;
  const {x, y} = previousMousePosition;
  const {offsetX, offsetY} = e;
  const deltaMove = {
    x: offsetX - x,
    y: offsetY - y
  };

  if(isDraging) {
    const deltaRotationQuaternion = new THREE.Quaternion()
    .setFromEuler(new THREE.Euler(
        this.toRadians(deltaMove.y * 1),
        this.toRadians(deltaMove.x * 1),
        0,
        'XYZ'
    ));

    // 이게 뭔지 잘 모르겟음..
    // https://threejs.org/docs/index.html#api/en/math/Quaternion
    // cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);

    this.setState({
      previousMousePosition: {
        x: e.offsetX,
        y: e.offsetY
      }
    });
    
  }
}

onMouseUp = () => {
  this.setState({
    isDraging : false,
  })
}
toRadians = (angle) => {
	return angle * (Math.PI / 180);
}

toDegrees = (angle) => {
	return angle * (180 / Math.PI);
}

render(){
    return(
      <div
        style={{ width: '100%', height: '100vh' }}
        ref={(mount) => { this.mount = mount }}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      >
        <button onClick={this.addCircle}>circle</button>
        <button onClick={this.addRectangle}>rect</button>
        <button onClick={this.addTriangle}>triangle</button>
        <button onClick={this.addLine}>line</button>
        <div className="colorContainer">
          <div className="color" onClick={() => this.changeColor('#EC7063')} style={{background: '#EC7063'}}/>
          <div className="color" onClick={() => this.changeColor('#52BE80')} style={{background: '#52BE80'}}/>
          <div className="color" onClick={() => this.changeColor('#F1C40F')} style={{background: '#F1C40F'}}/>
          <div className="color" onClick={() => this.changeColor('#A569BD')} style={{background: '#A569BD'}}/>
        </div>
      </div>
    )
  }
}

export default App;