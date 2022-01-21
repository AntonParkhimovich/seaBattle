import * as THREE from 'three'
const shipsFieldGeometry = new THREE.PlaneBufferGeometry(10,10)
const shipsFieldMaterial =  new THREE.MeshBasicMaterial({color: 0xffffff})
export const shipsField = new THREE.Mesh(shipsFieldGeometry, shipsFieldMaterial)
shipsField.userData.ground = true
