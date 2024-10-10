import { Coordinate, SuperFlow, LinkPointList, GraphNode } from './index';
export interface GraphLinkOptions {
    id: string;
    startAt: Coordinate;
    endAt: Coordinate;
    meta?: any;
    start: GraphNode;
    end: GraphNode | null;
}
export declare class GraphLink {
    static distance: number;
    private _end;
    private _startAt;
    private _endAt;
    private _movePosition;
    id: string;
    graph: SuperFlow;
    start: GraphNode;
    meta: any;
    startDirection: Coordinate;
    endDirection: Coordinate;
    constructor(options: GraphLinkOptions, graph: SuperFlow);
    get end(): GraphNode | null;
    set end(node: GraphNode | null);
    get startAt(): Coordinate;
    set startAt(offset: Coordinate);
    get endAt(): Coordinate;
    set endAt(offset: Coordinate);
    get movePosition(): Coordinate;
    set movePosition(offset: Coordinate);
    get pathPointList(): {
        pointList: Coordinate[];
        xList: number[];
        yList: number[];
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    };
    startCoordinate(): Coordinate;
    endCoordinate(): Coordinate;
    coordinateList(turnRatio?: number): any[];
    pathDirection(vertical: Coordinate, horizontal: Coordinate, direction: Coordinate): Coordinate;
    isPointInLink(position: Coordinate, pathPointList: LinkPointList): boolean;
    remove(): this;
    toJSON(relationMark: string, startMark: string, endMark: string): {
        [x: string]: any;
        startAt: Coordinate;
        endAt: Coordinate;
        meta: any;
    };
}
