import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({

  selector: 'app-map',

  templateUrl: './map.component.html',

  styleUrls: ['./map.component.css']

})

export class MapComponent implements OnInit {

  data_us = {
    confirmados: 'No confirmado',

    muertos: 'No confirmado',

    recuperados: 'No confirmado',

    total: 'No confirmado'
  };

  side = false;

  cargando;

  countryRestriction = {

    latLngBounds: {

      east: -42.32638260614279,

      north: 82.30174452535293,

      south: 8.662951218005762,

      west: 173.77311876158194

    },

    strictBounds: true

  };

  coordenadas = {

    coords: {

      lat: 39.02863882197509,

      lng: -93.26751354159825,

    }

  };

  nombre_estado;

  title = 'COVID 19 Information';

  lat = 39.70091;

  lng = -101.71470;

  data: any = {

    confirmados: 'No confirmado',

    muertos: 'No confirmado',

    recuperados: 'No confirmado',

    location: ''

  };

  url_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

  url_corona = 'https://www.trackcorona.live/api/provinces';

  api_key = 'pk.eyJ1IjoiYnJheWFuMTk4NiIsImEiOiJja28zOG9kbXAwbzNuMm9scjFmM3pwMGxvIn0._HWlWxphG5i_vGmb8lpbLw';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {


    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass('toggled');
    });



    this.http.get('https://www.trackcorona.live/api/countries/us').subscribe((data: any) => {
      console.log(data);
      this.data_us.confirmados = data.data[0].confirmed;
      this.data_us.recuperados = data.data[0].recovered;
      this.data_us.muertos = data.data[0].dead;
      this.data_us.total = (data.data[0].confirmed + data.data[0].recovered + data.data[0].dead)
      console.log(this.data_us);

    });
  }

  guardar(evento) {

    this.cargando = true;

    this.coordenadas = evento;

    console.log(this.coordenadas.coords.lat);

    console.log(this.coordenadas.coords.lng);

    this.http.get(

      `${this.url_mapbox}${this.coordenadas.coords.lng},${this.coordenadas.coords.lat}.json?types=region&access_token=${this.api_key}`

    ).subscribe((data: any) => {

      if (data.features[0].text) {
        this.nombre_estado = encodeURI(data.features[0].text);
      }

      console.log(this.nombre_estado);

      this.get_covid();

    });

    console.log(this.data);

  }

  get_covid() {
    this.http.get(`${this.url_corona}/${this.nombre_estado}`).subscribe((datos: any) => {

      this.cargando = false;

      console.log(datos);

      if (datos.data.length === 0) {

        this.data.location = 'No es posible obtener datos de la localizacion';

        this.data.confirmados = 'N/A';

        this.data.muertos = 'N/A';

        this.data.recuperados = 'N/A';

        return console.log('no esta disponible');

      }



      this.data.confirmados = datos.data[0].confirmed;

      this.data.muertos = datos.data[0].dead;


      if (!datos.data[0].recovered === null) {

        this.data.recuperados = datos.data[0].recovered;

      }

      this.data.location = datos.data[0].location;

    });
  }

  get_place(lugar) {
    
    console.log(lugar);

    if (lugar === '') {
      return;
    }
    this.nombre_estado = encodeURI(lugar)
    this.http.get(
      `${this.url_mapbox}${this.nombre_estado}.json?country=us&types=region&access_token=${this.api_key}`).subscribe((data: any) => {
      console.log(data.features[0].center[0]);
      this.coordenadas.coords.lat = data.features[0].center[1];
      this.coordenadas.coords.lng = data.features[0].center[0];

      this.get_covid();


    })
  }



}
