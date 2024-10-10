/*
 * User: CHT
 * Date: 2024/10/9
 * Time: 11:17
**/

import {
  Coordinate,
  SuperFlow,
  NodeItem,
  vector
} from './index'

import {
  direction,
  directionVector,
  uuid
} from './utils'

export class GraphNode {
  private _width: number = 180
  private _height: number = 100

  id: string
  graph: SuperFlow
  coordinate: Coordinate
  meta: any
  angleList: number[] = []

  constructor(options: Partial<NodeItem>, graph: SuperFlow) {
    const {
      width = 180,
      height = 100,
      coordinate = [ 0, 0 ],
      meta = null
    } = options

    this.id = options[ graph.relationMark ] || uuid('node_')
    this.graph = graph
    this.coordinate = [ ...coordinate ]
    this.meta = meta
    this.width = width
    this.height = height
  }

  get position() {
    return vector(this.coordinate)
      .add(this.graph.origin)
      .result
  }

  set position(position) {
    this.coordinate = vector(position)
      .minus(this.graph.origin)
      .result
  }

  get center() {
    return vector(this.coordinate)
      .add([ this.width / 2, this.height / 2 ])
      .result
  }

  set center(position) {
    this.coordinate = vector(position)
      .minus([ this.width / 2, this.height / 2 ])
      .result
  }

  get width() {
    return this._width
  }

  set width(w: number) {
    w = Math.floor(w)
    this._width = w > 50 ? w : 50
    this.angle()
  }

  get height() {
    return this._height
  }

  set height(h: number) {
    h = Math.floor(h)
    this._height = h > 20 ? h : 20
    this.angle()
  }

  angle() {
    const
      w = this.width / 2
      , h = this.height / 2
      , center: Coordinate = [ 0, 0 ]

    const topLeft = vector(center)
      .minus([ w, h ])
      .angle()

    const topRight = vector(center)
      .add([ w, 0 ])
      .minus([ 0, h ])
      .angle()

    const bottomRight = vector(center)
      .add([ w, h ])
      .angle()

    const bottomLeft = vector(center)
      .add([ 0, h ])
      .minus([ w, 0 ])
      .angle()

    this.angleList = [
      topLeft,
      topRight,
      bottomRight,
      bottomLeft
    ]
  }

  relative(offset: Coordinate) {
    const angle: number = vector(offset)
      .minus([ this.width / 2, this.height / 2 ])
      .angle()

    const angleList = this.angleList
    const directionList = [
      direction.top,
      direction.right,
      direction.bottom,
      direction.left
    ]

    let dir = direction.left

    angleList.reduce((prev, current, idx) => {
      if (angle >= prev && angle < current) {
        dir = directionList[ idx - 1 ]
      }
      return current
    })

    return {
      position: this.fixOffset(offset, dir),
      direction: directionVector[ dir ]
    }
  }

  fixOffset(offset: Coordinate, dir: number) {
    switch (dir) {
      case direction.top:
        offset[ 0 ] = this.width / 2
        offset[ 1 ] = 0
        break
      case direction.right:
        offset[ 0 ] = this.width
        offset[ 1 ] = this.height / 2
        break
      case direction.bottom:
        offset[ 0 ] = this.width / 2
        offset[ 1 ] = this.height
        break
      case direction.left:
      default:
        offset[ 0 ] = 0
        offset[ 1 ] = this.height / 2
        break
    }
    return offset
  }

  remove() {
    this.graph.removeNode(this as unknown as GraphNode)
    return this
  }

  toJSON(relationMark: string) {
    return {
      [ relationMark ]: this.id,
      width: this.width,
      height: this.height,
      coordinate: [ ...this.coordinate ] as Coordinate,
      meta: this.meta
    }
  }
}
