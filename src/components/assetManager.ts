import * as THREE from "three";
import * as STDLIB from "three-stdlib";
import mitt, { type Emitter } from "mitt";

import { Component } from "./component";
import { Base } from "../base/base";

export type ResoureType = "gltfModel" | "texture" | "cubeTexture";

export interface ResourceItem {
  name: string;
  type: ResoureType;
  path: string | string[];
}

export type ResoureList = ResourceItem[];

interface Loaders {
  gltfLoader: STDLIB.GLTFLoader;
  textureLoader: THREE.TextureLoader;
  cubeTextureLoader: THREE.CubeTextureLoader;
}

class AssetManager extends Component {
  emitter: Emitter<any>;
  resourceList: ResoureList;
  items: any;
  toLoad: number;
  loaded: number;
  loaders: Partial<Loaders>;
  constructor(base: Base, list: ResoureList) {
    super(base);

    const emitter = mitt();
    this.emitter = emitter;

    this.resourceList = list;

    this.items = {};
    this.toLoad = list.length;
    this.loaded = 0;

    this.loaders = {};
    this.setLoaders();

    this.startLoading();
  }
  // 设置加载器
  setLoaders() {
    this.loaders.gltfLoader = new STDLIB.GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }
  // 开始加载
  startLoading() {
    for (const resource of this.resourceList) {
      if (resource.type === "gltfModel") {
        this.loaders.gltfLoader?.load(resource.path as string, (file) => {
          this.resourceLoaded(resource, file);
        });
      } else if (resource.type === "texture") {
        this.loaders.textureLoader?.load(resource.path as string, (file) => {
          this.resourceLoaded(resource, file);
        });
      } else if (resource.type === "cubeTexture") {
        this.loaders.cubeTextureLoader?.load(
          resource.path as string[],
          (file) => {
            this.resourceLoaded(resource, file);
          }
        );
      }
    }
  }
  // 加载完单个素材
  resourceLoaded(resource: ResourceItem, file: any) {
    this.items[resource.name] = file;
    this.loaded += 1;
    if (this.loaded === this.toLoad) {
      this.emitter.emit("ready");
    }
  }
}

export { AssetManager };