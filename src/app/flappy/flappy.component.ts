import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

@Component({
  selector: 'app-model',
  templateUrl: './flappy.component.html',
  styleUrls: ['./flappy.component.less']
})
export class FlappyComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private playgroundRef!: ElementRef;

  //? Helper Properties (Private Properties);
  //? Helper Properties (Private Properties);

  //* Cube Properties

  @Input() public rotationSpeedX: number = 0.05;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;

  // @Input() public texture: string = "/assets/T5M411yf_E.png";


  //* Stage Properties

  @Input() public cameraZ: number = 100;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPane: number = 1;

  @Input('farClipping') public farClippingPane: number = 1000;

  //? Scene properties
  //? Scene properties

  private camera!: THREE.PerspectiveCamera;

  private controls!: OrbitControls;

  private ambientLight!: THREE.AmbientLight;

  private light1!: THREE.PointLight;

  private light2!: THREE.PointLight;

  private light3!: THREE.PointLight;

  private light4!: THREE.PointLight;

  private model!: THREE.Group;

  private directionalLight!: THREE.DirectionalLight;

  private get canvas(): HTMLCanvasElement {
    return this.playgroundRef.nativeElement;
  }

  private loaderGLTF = new GLTFLoader();

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private numberTexture!: THREE.CanvasTexture;
  private spriteMaterial!: THREE.SpriteMaterial;

  private sprite!: THREE.Sprite;

  private spriteBehindObject: any;

  private flappyXPosition = 0


  private createControls = () => {
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(labelRenderer.domElement);
    this.controls = new OrbitControls(this.camera, labelRenderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;

    this.controls.update();
  };

  /**
   * Create the scene
   *
   * @private
   * @memberof PlaygroundComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd)
    this.loaderGLTF.load('assets/flappybird.glb', (gltf: GLTF) => {
      this.model = gltf.scene;
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.scale.set(0.15,0.15,0.15)
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    this.ambientLight = new THREE.AmbientLight(0xf0f0f0, 1.2);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    
    this.scene.add(new THREE.AxesHelper(500))

    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = false;
    this.scene.add(this.directionalLight);
    this.numberTexture = new THREE.CanvasTexture(this.canvas);
    // this.spriteMaterial = new THREE.SpriteMaterial({
    //   map: this.numberTexture,
    //   alphaTest: 1,
    //   transparent: true,
    //   depthTest: false,
    //   depthWrite: false
    // });

    this.sprite = new THREE.Sprite(this.spriteMaterial);
    this.sprite.position.set(550, 550, 550);
    this.sprite.scale.set(60, 60, 1);
    var box = new THREE.Box3().setFromObject(this.sprite);
    box.getCenter(this.sprite.position); // this re-sets the mesh position
    this.sprite.position.multiplyScalar(-1);
    this.scene.add(this.sprite);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof PlaygroundComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: FlappyComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      requestAnimationFrame(render);
    }());
  }

  updateScreenPosition() {
    const vector = new THREE.Vector3(250, 250, 250);

    vector.project(this.camera);

    vector.x = Math.round((0.5 + vector.x / 2) * (this.canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (this.canvas.height / window.devicePixelRatio));
  }

  public moveFloppy() {
    this.model.translateY(this.flappyXPosition + 0.1)
  }

  constructor() { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 32) {
      this.moveFloppy()
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }

  public onKeypressEvent(event: any) {
    if (event.key === "Space") {
      console.log(event);
    }
    console.log("hello")
  }
  

}
