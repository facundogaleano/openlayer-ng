import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import * as Proj from 'ol/proj';
import {
  defaults as defaultControls,
} from 'ol/control';

import { GeoserverService } from 'src/app/services/geoserver.service';


interface LayerInterface {
  layerId: number;
  layerName: string;
  layer: any;
  checked: boolean;
}
interface LayerUrl{
  name: string;
  href: string
}

export const DEFAULT_HEIGHT = '100%';
export const DEFAULT_WIDTH = '100%';

export const DEFAULT_LAT = -31.4100;
export const DEFAULT_LON = -64.1800;

@Component({
  selector: 'app-ol-map-advanced',
  templateUrl: './ol-map-advanced.component.html',
  styleUrls: ['./ol-map-advanced.component.scss']
})
export class OlMapAdvancedComponent implements OnInit, AfterViewInit{
  @ViewChild('map') mapDiv?:ElementRef;
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() zoom: number = 5;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  target: string = 'map-' + Math.random().toString(36).substring(2);
  map?: Map;
  layers: LayerInterface[] = [];
  private mapEl?: HTMLElement;
  constructor(private geoserverService: GeoserverService){

  }
  
  ngOnInit(): void {
    this.getLayers();
  }
  
  ngAfterViewInit(): void {
    this.mapEl = this.mapDiv?.nativeElement;
    this.setSize();
    this.createMap(); 
  }

  private getLayers(){
    const backLayer: LayerInterface = {
      layerId: 1,
      layerName: "Fondo",
      layer: new TileLayer({
          source: new OSM(),
        }),
      checked: true
    };
    this.layers.push(backLayer);
    let layersUrl: LayerUrl[] = [];
    this.geoserverService.get<any>('rest/layers.json').subscribe(res =>{
      layersUrl = res.layers.layer.filter((x:LayerUrl) => x.name.includes("postgisTest:"));
      for (let i = 0; i<layersUrl.length; i++) {
        const newLayer: LayerInterface = {
          layerId: i+2,
          layerName: layersUrl[i].name.split(":")[1],
          layer: new TileLayer({
            source: new TileWMS({
              url: 'http://localhost:8080/geoserver/postgisTest/wms',
              params: {'LAYERS': layersUrl[i].name, 'TILED': true},
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0,
            }),
          }),
          checked: false
        };
        this.layers.push(newLayer)
      }
    });
    
  }

  private createMap(){
    this.map = new Map({
      target: this.target,
      layers: this.layers.map(x =>{
        let tile = new TileLayer();
        if(x.checked){
          tile = x.layer;
        }
        return tile;
        
      }),
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls({ attribution: false, zoom: true }).extend([])
    });
  }
  private setSize() {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
      styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    }
  }
  public handleCheckboxChange(layer: LayerInterface) {
    let index = this.layers.findIndex(x => x.layerId === layer.layerId);
    if(index >=0){
      if(!this.layers[index].checked){
        this.map?.removeLayer(layer.layer)
      }
      else{
        this.map?.addLayer(layer.layer)
      }
    }
  }
}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }

  return cssUnitsPattern.test(value) ? value : `${value}px`;
}
