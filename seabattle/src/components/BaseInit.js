import * as THREE from "three";
class BaseInit {
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  canvas = document.querySelector("canvas.webgl");
  camera = new THREE.PerspectiveCamera(
    60,
    this.sizes.width / this.sizes.height,
    0.1,
    100
  );
  scene = new THREE.Scene();
  light = new THREE.AmbientLight(0xffffff, 0.5);
  renderer = new THREE.WebGLRenderer({
    canvas: this.canvas,
    alpha: true,
  });
  clock = new THREE.Clock();
  pixelRatio = Math.min(window.devicePixelRatio, 2);
  raycaster = new THREE.Raycaster();
  mousePosition = new THREE.Vector2();
  axisHelper = new THREE.AxesHelper(20);

  init() {
    this.resizeWindow();
    this.addToScene(this.camera);
    this.addToScene(this.light);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.addListenerOnMouseMove();
    this.start();
  }
  start() {
    window.requestAnimationFrame(this.tick.bind(this));
  }
  resizeWindow() {
    window.addEventListener("resize", (event) => {
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(this.pixelRatio);
    });
  }
  addListenerOnMouseMove() {
    window.addEventListener("mousemove", (event) => {
      this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }
  addToScene(object) {
    this.scene.add(object);
  }
  normalizeCoordinates(coords, move, gameComponent) {
    const normalizeCoordinates = new THREE.Vector2();
    if (move === "player1") {
      normalizeCoordinates.x = -(coords.z+10) ;
      normalizeCoordinates.y = (coords.x +11) ;
    }
    if(move === 'player2'){
      normalizeCoordinates.x = (coords.z-10)
      normalizeCoordinates.y = -(coords.x-11)
    }
    normalizeCoordinates.floor()
    return normalizeCoordinates;
  }
  tick() {
    this.renderer.render(this.scene, this.camera);
    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    window.requestAnimationFrame(this.tick.bind(this));
  }
}
const base = new BaseInit();
export default base;
