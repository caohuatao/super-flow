/*
 * User: CHT
 * Date: 2024/10/9
 * Time: 11:17
**/

import {
  Coordinate,
  SuperFlow,
  LinkPointList,
  GraphNode,
  vector
} from './index'

import {
  direction,
  directionVector,
  uuid
} from './utils'

export interface GraphLinkOptions {
  id: string
  startAt: Coordinate
  endAt: Coordinate
  meta?: any
  start: GraphNode
  end: GraphNode | null
}

export class GraphLink {
  static distance = 15

  private _end: GraphNode | null = null
  private _startAt: Coordinate = [ 0, 0 ]
  private _endAt: Coordinate = [ 0, 0 ]
  private _movePosition: Coordinate = [ 0, 0 ]

  id: string
  graph: SuperFlow
  start: GraphNode
  meta: any
  startDirection: Coordinate = directionVector[ direction.top ]
  endDirection: Coordinate = directionVector[ direction.top ]

  constructor(options: GraphLinkOptions, graph: SuperFlow) {
    const {
      id,
      start,
      end = null,
      startAt = [ 0, 0 ],
      endAt = [ 0, 0 ],
      meta = null,
    } = options

    this.id = id || uuid('link_')
    this.graph = graph
    this.start = start as unknown as GraphNode
    this.meta = meta
    this.end = end
    this.startAt = startAt
    this.endAt = endAt
  }

  get end() {
    return this._end
  }

  set end(node: GraphNode | null) {
    if (this.start === node) {
      return
    } else {
      this._end = node
    }
  }

  get startAt() {
    return this._startAt
  }

  set startAt(offset: Coordinate) {
    const relative = this.start.relative(offset)
    this._startAt = relative.position
    this.startDirection = relative.direction
  }

  get endAt() {
    return this._endAt
  }

  set endAt(offset) {
    if (this.end) {
      const relative = this.end.relative(offset)
      this._endAt = relative.position
      this.endDirection = relative.direction
    } else {
      this._endAt = offset
    }
  }

  get movePosition() {
    return this._movePosition
  }

  set movePosition(offset: Coordinate) {
    this._movePosition = offset

    if (this.end) return

    const relative = this.start.relative(
      vector(offset)
        .minus(this.graph.origin)
        .minus(this.start.coordinate)
        .result
    )

    this.endDirection = vector(relative.direction)
      .multiply(-1)
      .result
  }

  get pathPointList() {
    const pointList: Coordinate[] = this.coordinateList()
      , xList: number[] = []
      , yList: number[] = []

    pointList.forEach(item => {
      xList.push(item[ 0 ])
      yList.push(item[ 1 ])
    })

    return {
      pointList,
      xList,
      yList,
      minX: Math.min(...xList),
      maxX: Math.max(...xList),
      minY: Math.min(...yList),
      maxY: Math.max(...yList)
    }
  }

  startCoordinate() {
    return vector(this.start.position)
      .add(this.startAt)
      .result
  }

  endCoordinate() {
    if (this.end) {
      return vector(this.end.position)
        .add(this.endAt)
        .result
    } else {
      return this.movePosition
    }
  }

  coordinateList(turnRatio = 0.5) {
    const entryPoint = this.startCoordinate()
    const exitPoint = this.endCoordinate()

    const entryDirection = this.startDirection
    let exitDirection = this.endDirection

    // 路径起点
    const startPoint = vector(entryDirection)
      .multiply(GraphLink.distance)
      .add(entryPoint)
      .result

    // 路径终点
    const endPoint = vector(exitDirection)
      .multiply(GraphLink.distance)
      .add(exitPoint)
      .result

    // 入口方向取反
    exitDirection = vector(exitDirection)
      .multiply(-1)
      .result

    // 终点 - 起点  垂直 水平向量
    const pathHorizontalVec: Coordinate = [ endPoint[ 0 ] - startPoint[ 0 ], 0 ]
    const pathVerticalVec: Coordinate = [ 0, endPoint[ 1 ] - startPoint[ 1 ] ]

    const startDirection = this.pathDirection(
      pathVerticalVec,
      pathHorizontalVec,
      entryDirection
    )
    const endDirection = this.pathDirection(
      pathVerticalVec,
      pathHorizontalVec,
      exitDirection
    )

    const splitNum = vector(startDirection)
      .dotProduct(endDirection) > 0 ? 2 : 1

    const pathMiddle: Coordinate = endDirection === pathHorizontalVec
      ? pathVerticalVec
      : pathHorizontalVec

    let points = []

    points.push(entryPoint, startPoint)

    if (splitNum === 1) {

      const point1 = vector(startPoint)
        .add(startDirection)
        .result

      const point2 = vector(point1)
        .add(endDirection)
        .result
      points.push(point1, point2)

    } else {
      const point1 = vector(startDirection)
        .multiply(turnRatio)
        .add(startPoint)
        .result

      const point2 = vector(point1)
        .add(pathMiddle)
        .result

      const point3 = vector(endDirection)
        .multiply(1 - turnRatio)
        .add(point2)
        .result

      points.push(point1, point2, point3)
    }

    points.push(exitPoint)

    return points
  }

  pathDirection(vertical: Coordinate, horizontal: Coordinate, direction: Coordinate) {
    if (
      vector(horizontal)
        .parallel(direction)
    ) {
      if (
        vector(horizontal)
          .dotProduct(direction) > 0
      ) {
        return horizontal
      } else {
        return vertical
      }
    } else {
      if (
        vector(vertical)
          .dotProduct(direction) > 0
      ) {
        return vertical
      } else {
        return horizontal
      }
    }
  }

  isPointInLink(position: Coordinate, pathPointList: LinkPointList) {
    const {
      pointList,
      minX,
      minY,
      maxX,
      maxY
    } = pathPointList || this.pathPointList

    const n = 5

    if (
      position[ 0 ] < minX - n
      || position[ 0 ] > maxX + n
      || position[ 1 ] < minY - n
      || position[ 1 ] > maxY + n
    ) {
      return false
    }

    for (let i = 0; i < pointList.length - 2; i++) {
      const prev = pointList[ i ]
      const current = pointList[ i + 1 ]

      const top = Math.min(prev[ 1 ], current[ 1 ]) - n
      const right = Math.max(prev[ 0 ], current[ 0 ]) + n
      const bottom = Math.max(prev[ 1 ], current[ 1 ]) + n
      const left = Math.min(prev[ 0 ], current[ 0 ]) - n

      const [ x, y ] = position

      if (x > left && x < right && y > top && y < bottom) {
        return true
      }
    }
    return false
  }

  remove() {
    this.graph.removeLink(this as unknown as GraphLink)
    return this
  }

  toJSON(relationMark: string, startMark: string, endMark: string) {
    return {
      [ relationMark ]: this.id,
      [ startMark ]: this.start.id,
      [ endMark ]: this.end?.id || '',
      startAt: this.startAt,
      endAt: this.endAt,
      meta: this.meta
    }
  }
}
