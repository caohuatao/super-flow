/*
 * User: CHT
 * Date: 2024/10/9
 * Time: 14:11
**/
import type { Coordinate } from './index'

class Vector {
  result: Coordinate

  constructor(vector: Coordinate) {
    this.result = vector
  }

  add(vectorB: Coordinate): this {
    const vectorA = this.result
    this.result = [ vectorA[ 0 ] + vectorB[ 0 ], vectorA[ 1 ] + vectorB[ 1 ] ]
    return this
  }

  multiply(k: number): this {
    const vector = this.result
    this.result = [ vector[ 0 ] * k, vector[ 1 ] * k ]
    return this
  }

  differ(pointB: Coordinate): this {
    const pointA = this.result
    this.result = [ pointB[ 0 ] - pointA[ 0 ], pointB[ 1 ] - pointA[ 1 ] ]
    return this
  }

  minus(pointB: Coordinate): this {
    const pointA = this.result
    this.result = [ pointA[ 0 ] - pointB[ 0 ], pointA[ 1 ] - pointB[ 1 ] ]
    return this
  }

  // 向量点积
  dotProduct(vectorB: Coordinate): number {
    const vectorA = this.result
    return vectorA[ 0 ] * vectorB[ 0 ] + vectorA[ 1 ] * vectorB[ 1 ]
  }

  // 向量叉乘
  cross(vectorB: Coordinate): number {
    const vectorA = this.result
    return vectorA[ 0 ] * vectorB[ 1 ] - vectorA[ 1 ] * vectorB[ 0 ]
  }

  // 向量夹角
  angle(): number {
    const vector = this.result
    return Math.round(180 / Math.PI * Math.atan2(vector[ 1 ], vector[ 0 ])) + 180
  }

  // 判断向量是否平行
  parallel(vectorB: Coordinate): boolean {
    const vectorA = this.result
    return vectorA[ 0 ] * vectorB[ 1 ] - vectorA[ 1 ] * vectorB[ 0 ] === 0
  }
}

export function vector(coordinate: Coordinate): Vector {
  return new Vector(coordinate)
}
