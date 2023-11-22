import {
  AnimationMixer,
  Clock,
  Color,
  Object3D,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import Stats from 'three/examples/jsm/libs/stats.module'

export default class Threejs {
  private canvas!: HTMLElement

  private scene!: Scene

  private renderer!: WebGLRenderer

  private camera!: PerspectiveCamera

  private mixer?: AnimationMixer

  private clock!: Clock

  private stats?: Stats

  constructor() {
    console.log('ThreeJS')
  }

  public bindDom(canvas: any) {
    this.canvas = canvas
    console.log(this.canvas)
  }

  public init() {
    this.renderer = new WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    console.log(
      //   window.devicePixelRatio,
      window.innerWidth,
      window.innerHeight,
      this.canvas.offsetWidth,
      this.canvas.offsetHeight
    )
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)
    this.renderer.setAnimationLoop(this.animate.bind(this))
    this.canvas.appendChild(this.renderer.domElement)

    this.stats = new Stats()
    this.canvas.appendChild(this.stats.dom)

    const pmremGenerator = new PMREMGenerator(this.renderer)

    this.scene = new Scene()
    this.scene.background = new Color(0xbfe3dd)
    this.scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(this.renderer),
      0.04
    ).texture

    this.camera = new PerspectiveCamera(
      40,
      this.canvas.offsetWidth / this.canvas.offsetHeight,
      1,
      10000
    )
    this.camera.position.set(5, 2, 8)

    this.clock = new Clock()

    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    // controls.minDistance = 20;
    // controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2
    controls.target.set(0, 1, 0)
    controls.update()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./libs/draco/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    loader.load('./models/gltfs/LittlestTokyo.glb', (gltf) => {
      console.log(gltf)
      this.mixer = new AnimationMixer(gltf.scene)
      const action = this.mixer.clipAction(gltf.animations[0])
      action.play()

      const model = gltf.scene
      model.position.set(1, 1, 0)
      model.scale.set(0.01, 0.01, 0.01)
      this.scene.add(model)
    })
  }

  protected animate() {
    const delta = this.clock.getDelta()
    if (this.mixer) {
      this.mixer.update(delta)
    }
    this.stats.update()
    this.renderer.render(this.scene, this.camera)
  }
}
