/*
 * User: CHT
 * Date: 2024/10/9
 * Time: 11:17
**/
import { Coordinate } from './index'

export const direction: Record<'top' | 'right' | 'bottom' | 'left', number> = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4
}

// [0,-1] 右：[1,0] 下 [1,1] 左 [-1,0]
export const directionVector: Record<number, Coordinate> = {
  [ direction.top ]: [ 0, -1 ],
  [ direction.right ]: [ 1, 0 ],
  [ direction.bottom ]: [ 0, 1 ],
  [ direction.left ]: [ -1, 0 ]
}

export function uuid(before: string = '', after: string = ''): string {
  const chars: string[] = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const charsLen: number = chars.length
  let uuid: string[] = []
  const len = 16
  for (let i = 0; i < len; i++) {
    uuid[ i ] = chars[ 0 | Math.random() * charsLen ]
  }
  return before + uuid.join('') + after
}

export function getOffset(evt: MouseEvent, target: Element | null = null) {
  const {
    clientX,
    clientY,
    currentTarget
  } = evt

  const current: Element = target || <Element>currentTarget

  const {
    left,
    top
  } = current.getBoundingClientRect()

  const scrollLeft = target && target.scrollLeft || 0
  const scrollTop = target && target.scrollTop || 0
  return [ clientX - left + scrollLeft, clientY - top + scrollTop ]
}

export function toRawType(val: unknown): string {
  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

export function isFun(val: unknown): val is Function {
  return toRawType(val) === 'function'
}

export function isBool(val: unknown): val is boolean {
  return toRawType(val) === 'boolean'
}

export function isUndef(val: unknown): val is undefined {
  return toRawType(val) === 'undefined'
}

export function isString(val: unknown): val is string {
  return toRawType(val) === 'string'
}

export function isObject(val: unknown): val is object {
  return toRawType(val) === 'object'
}

export function arrayReplace(arr1: any[], arr2: any[]): void {
  arr1.splice(0, arr1.length, ...arr2)
}

export function debounce(fn: (...args: any) => any, timestamp: number) {
  let timeout: number | null = null
  return function () {
    if (timeout)
      clearTimeout(timeout)
    timeout = setTimeout(fn, timestamp)
  }
}
