import { Coordinate, SuperFlow, NodeItem } from './index';
export declare class GraphNode {
    private _width;
    private _height;
    id: string;
    graph: SuperFlow;
    coordinate: Coordinate;
    meta: any;
    angleList: number[];
    constructor(options: Partial<NodeItem>, graph: SuperFlow);
    get position(): Coordinate;
    set position(position: Coordinate);
    get center(): Coordinate;
    set center(position: Coordinate);
    get width(): number;
    set width(w: number);
    get height(): number;
    set height(h: number);
    angle(): void;
    relative(offset: Coordinate): {
        position: Coordinate;
        direction: Coordinate;
    };
    fixOffset(offset: Coordinate, dir: number): Coordinate;
    remove(): this;
    toJSON(relationMark: string): {
        [x: string]: any;
        width: number;
        height: number;
        coordinate: Coordinate;
        meta: any;
    };
}
