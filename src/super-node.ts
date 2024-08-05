/*
 * User: CHT
 * Date: 2024/8/1
 * Time: 下午2:11
**/

import SuperFlow from './index'

export default class SuperNode extends Proxy<NodeItem> {
  root: SuperFlow

  constructor(node: NodeItem, root: SuperFlow) {
    super(node, {})
    this.root = root
  }

  get (target: NodeItem, prop: string) {
    return Reflect.get(target, prop)
  }

  set (target: NodeItem, prop: keyof NodeItem, val: any) {
    switch (prop) {
      case 'width':
        return this.setWidth(val)
      case 'height':
        return this.setHeight(val)
      case 'coordinate':
        return this.setCoordinate(val)
      default:
        return Reflect.set(target, prop, val)
    }
  }

  get x () {
    return this.target.coordinate[0]
  }

  get y () {
    return this.target.coordinate[1]
  }

  setWidth (w: number) {
    return Reflect.set(this.target, 'width', w)
  }

  setHeight (h: number) {
    return Reflect.set(this.target, 'width', h)
  }

  setCoordinate (c: Coordinate) {
    return Reflect.set(this.target, 'coordinate', c)
  }
}
