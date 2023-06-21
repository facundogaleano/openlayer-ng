import { Component, OnInit, OnChanges, AfterViewInit, Input, ElementRef, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { GeoTIFF, OSM, Stamen, TileWMS, WMTS } from 'ol/source';
import * as Proj from 'ol/proj';
import {
  defaults as defaultControls,
} from 'ol/control';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';

export const DEFAULT_HEIGHT = '100%';
export const DEFAULT_WIDTH = '100%';

export const DEFAULT_LAT = -31.82913231570081;
export const DEFAULT_LON = -63.455462064459084;

interface LayerInterface {
  layerId: number;
  layerName: string;
  layer: any;
  checked: boolean;
}

const highlightStyle = new Style({
  image: new CircleStyle({
    radius: 8,
    fill: new Fill({
      color: 'white', 
    }),
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
  }),
});


@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss']
})
export class OlMapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('map') mapDiv?:ElementRef;
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() zoom: number = 10;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  target: string = 'map-' + Math.random().toString(36).substring(2);
  map?: Map;
  layers: LayerInterface[] = [];

  private mapEl?: HTMLElement;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void { 
    this.layers = [
      {
        layerId: 1,
        layerName: "Fondo",
        layer: new TileLayer({
            source: new OSM(),
          }),
        checked: true
      },
      {
        layerId: 2,
        layerName: "Escuelas",
        layer: new TileLayer({
          source: new TileWMS({
            url: 'https://idecor-ws.mapascordoba.gob.ar/geoserver/idecor/Establecimientos_educativos/wms',
            params: {'LAYERS': 'Establecimientos_educativos', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        }),
        checked: false
      },
      {
        layerId: 3,
        layerName: "Líneas interurbanas",
        layer: new TileLayer({
          source: new TileWMS({
            url: 'https://idecor-ws.mapascordoba.gob.ar/geoserver/idecor/lineas_interurbanas/wms',
            params: {'LAYERS': 'lineas_interurbanas', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        }),
        checked: false
      },
      {
        layerId: 4,
        layerName: "parcelas",
        layer: new TileLayer({
          source: new TileWMS({
            url: 'https://idecor-ws.mapascordoba.gob.ar/geoserver/idecor/parcelas/wms',
            params: {'LAYERS': 'parcelas', 'TILED': true},
            serverType: 'geoserver',
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
        }),
        checked: false
      },
      {
        layerId: 5,
        layerName: "Casa de José",
        layer: new VectorLayer({
          source: new VectorSource({
            features: [new Feature({
              geometry: new Point(fromLonLat([-63.4554, -31.8290])),
            })],
          }),
            style: highlightStyle,
          }),
        checked: false
      },
      {
        layerId: 6,
        layerName: "Casa de Facu G",
        layer: new VectorLayer({
          source: new VectorSource({
            features: [new Feature({
              geometry: new Point(fromLonLat([-60.3158, -32.0253 ])),
            })],
          }),
            style: highlightStyle,
          }),
        checked: false
      }
    ]
  }

  ngAfterViewInit(): void {
    this.mapEl = this.mapDiv?.nativeElement;
    this.setSize();
    this.createMap(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.map = new Map({
        layers: this.layers.map(x =>{
          let tile = new TileLayer();
          if(x.checked){
            tile = x.layer;
          }
          return tile;
        })
      });
      this.map.setView(new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }));
    }
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

  handleCheckboxChange(layer: LayerInterface) {
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