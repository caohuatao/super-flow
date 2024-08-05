/*
 * User: CHT
 * Date: 2024/8/1
 * Time: 下午2:45
**/

import SuperFlow from './index'
import SuperNode from './super-node'

export default class SuperLine extends Proxy<LineItem<string>> {

  constructor(line: LineItem<string>, root: SuperFlow) {
    super(line, {})
    this.root = root
  }

  get(target: NodeItem, prop: string) {
    return Reflect.get(target, prop)
  }

  set(target: NodeItem, prop: keyof NodeItem, val: any) {
    switch (prop) {
      case 'start':
        return this.setWidth(val)
      case 'end':
        return this.setHeight(val)
      case 'startAt':
        return this.setStartAt(val)
      case 'endAt':
        return this.setEndAt(val)
      default:
        return Reflect.set(target, prop, val)
    }
  }

  get startNode(): SuperNode | null {
    return this.root.nodeMap.get(this.start) || null
  }

  get endNode(): SuperNode | null {
    return this.root.endNode.get(this.end) || null
  }

  setStart (start: string) {
    return Reflect.set(this.target, 'start', start)
  }

  setEnd (end: string) {
    return Reflect.set(this.target, 'end', end)
  }

  setStartAt (c: Coordinate) {
    return Reflect.set(this.target, 'startAt', c)
  }

  setEndAt(c: Coordinate) {
    return Reflect.set(this.target, 'endAt', c)
  }
}
