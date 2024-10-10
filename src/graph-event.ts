/*
 * User: CHT
 * Date: 2024/10/8
 * Time: 17:32
**/
import {
  EventCallback,
  DispatchEvent
} from './index'

export class GraphEvent {
  readonly listeners: Record<string, EventCallback[]> = {}

  add(type: string, callback: EventCallback) {
    if (!(type in this.listeners)) {
      this.listeners[ type ] = []
    }
    this.listeners[ type ].push(callback)
  }

  remove(type: string, callback: EventCallback): void {
    if (!(type in this.listeners)) {
      return
    }
    const stack = this.listeners[ type ]
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[ i ] === callback) {
        stack.splice(i, 1)
        return this.remove(type, callback)
      }
    }
  }

  dispatch<K extends keyof DocumentEventMap>(event: DispatchEvent<K>, breakOff = false) {
    if (!(event.type in this.listeners)) {
      return
    }
    const stack = this.listeners[ event.type ]
    event.target = this

    if (breakOff) {
      stack.some((fun, idx) => {
        const result = fun.call(this, event)
        if (result) stack.unshift(...stack.splice(idx, 1))
        return result
      })
    } else {
      stack.forEach(fun => fun.call(this, event))
    }
  }
}
