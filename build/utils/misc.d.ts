import * as THREE from "three";
declare const optimizeModelRender: (renderer: THREE.WebGLRenderer) => void;
declare const enableRealisticRender: (renderer: THREE.WebGLRenderer) => void;
declare const getEnvmapFromHDRTexture: (renderer: THREE.WebGLRenderer, texture: THREE.Texture) => THREE.Texture;
declare const getBaryCoord: (bufferGeometry: THREE.BufferGeometry) => void;
declare const sampleParticlesPositionFromMesh: (geometry: THREE.BufferGeometry, count?: number) => Float32Array;
declare const flatModel: (model: THREE.Object3D) => THREE.Object3D[];
declare const printModel: (modelParts: THREE.Object3D[], modelName?: string) => string;
declare const getViewport: (camera: THREE.Camera) => {
    width: number;
    height: number;
};
declare const getPositionCentroids: (geometry: THREE.BufferGeometry, attrName?: string, centroidName?: string) => Float32Array;
interface CreatePolygonShapeConfig {
    scale: number;
}
declare const createPolygonShape: (points: THREE.Vector2[], config?: Partial<CreatePolygonShapeConfig>) => THREE.Shape;
export { optimizeModelRender, enableRealisticRender, getEnvmapFromHDRTexture, getBaryCoord, sampleParticlesPositionFromMesh, flatModel, printModel, getViewport, getPositionCentroids, createPolygonShape, };
