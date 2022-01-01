
import * as utils from '@dcl/ecs-scene-utils'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import { MovingPlatform } from './movingPlatform' 


const _scene = new Entity('_scene')
engine.addEntity(_scene)

//def 
const piso = new Entity('piso')
engine.addEntity(piso)
piso.setParent(_scene)
//transform
const transform3 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: Quaternion.Euler(0, 0, 0),
  scale: new Vector3(1, 1, 1)
})
piso.addComponentOrReplace(transform3)
//shape
const gltfShape2 = new GLTFShape("../models/piso.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
piso.addComponentOrReplace(gltfShape2)
 

//def 
const bau = new Entity('bau')
engine.addEntity(bau)
bau.setParent(_scene)
//transform
const transformb = new Transform({
  position: new Vector3(15, 0, 8),
  rotation:   Quaternion.Euler(0,270,0),
  scale: new Vector3(0.007, 0.007, 0.007)
})
bau.addComponentOrReplace(transformb)
//shape
const gltfShapeb = new GLTFShape("../models/scene.gltf")
gltfShapeb.withCollisions = true
gltfShapeb.isPointerBlocker = true
gltfShapeb.visible = true
bau.addComponentOrReplace(gltfShapeb)
 

const gltfShape3 = new GLTFShape("../models/bola.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
 

function distance(pos1:Vector3,pos2:Vector3):number{
 const a = pos1.x - pos2.x
 const b = pos1.z - pos2.z
  return a*a+b*b
}
 
//BIG LOOP
export class MoveSystem implements ISystem {
   update() {
   const camera = Camera.instance
    let dist = distance(horizontalMovingPlatform.getComponent(Transform).position,camera.position)
    if(dist<2) {
       movePlayerTo({ x: 0, y: 0, z: 0}, { x: 8, y: 1, z: 8 })
    }
  }
 }
  
engine.addSystem(new MoveSystem())
/////

// Moving platform
const horizontalMovingPlatform = new MovingPlatform(
  gltfShape3  ,
  new Vector3(3, 1.5, 1),
  new Vector3(3, 1.5, 15),
 1
)
 
 
 

  
 