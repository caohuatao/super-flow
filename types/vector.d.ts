import type { Coordinate } from './index';
declare class Vector {
    result: Coordinate;
    constructor(vector: Coordinate);
    add(vectorB: Coordinate): this;
    multiply(k: number): this;
    differ(pointB: Coordinate): this;
    minus(pointB: Coordinate): this;
    dotProduct(vectorB: Coordinate): number;
    cross(vectorB: Coordinate): number;
    angle(): number;
    parallel(vectorB: Coordinate): boolean;
}
export declare function vector(coordinate: Coordinate): Vector;
export {};
