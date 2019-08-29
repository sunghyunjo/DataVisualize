import React, { Component } from "react";
import * as THREE from "three";

class App extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // ************** no1 
    var geom = new THREE.Geometry();
    var v1 = new THREE.Vector3(0,0,0);
    var v2 = new THREE.Vector3(15,0,0);
    var v3 = new THREE.Vector3(15,15,0);
    
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    
    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    // ******************

    ///// *********** no2
    var triangle = new THREE.Triangle( v1, v2, v3 );
    var normal = triangle.normal();

    // An example of getting the area from the Triangle class
    console.log( 'Area of triangle is: '+ triangle.area() );

    geom.vertices.push(triangle.a);
    geom.vertices.push(triangle.b);
    geom.vertices.push(triangle.c);

    geom.faces.push( new THREE.Face3( 0, 1, 2, normal ) );
    ////// *********

    geom.computeFaceNormals();
    
    var cube= new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );

    scene.add( cube );
    camera.position.z = 10;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

export default App;