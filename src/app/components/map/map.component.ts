import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import listaEstados from 'src/assets/json/estados.json';

@Component({

  selector: 'app-map',

  templateUrl: './map.component.html',

  styleUrls: ['./map.component.css']

})

export class MapComponent implements OnInit {

  estados = [];

  icono = {
    iconUrl: 'assets/img/ico.png'
  }

  data_us = {

    confirmados: 0,
    muertos: 0,

    recuperados: 0,

    total: 0
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

  title = 'COVID 19 Map';

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



      this.data_us.confirmados = data.data[0].confirmed;

      this.data_us.recuperados = data.data[0].recovered;

      this.data_us.muertos = data.data[0].dead;

      this.data_us.total = (data.data[0].confirmed + data.data[0].recovered + data.data[0].dead)





    });
  }

  guardar(evento) {

    this.cargando = true;

    this.coordenadas = evento;



    this.http.get(

      `${this.url_mapbox}${this.coordenadas.coords.lng},${this.coordenadas.coords.lat}.json?types=region&access_token=${this.api_key}`

    ).subscribe((data: any) => {

      if (data.features[0].text) {

        this.nombre_estado = encodeURI(data.features[0].text);

      }



      this.get_covid();

    });



  }

  get_covid() {

    this.http.get(`${this.url_corona}/${this.nombre_estado}`).subscribe((datos: any) => {

      this.cargando = false;



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

    if (lugar === '') {

      return;

    }

    this.nombre_estado = encodeURI(lugar);

    console.log(this.nombre_estado);


    this.http.get(

      `${this.url_mapbox}${this.nombre_estado}.json?country=us&types=region&access_token=${this.api_key}`).subscribe((data: any) => {

        this.coordenadas.coords.lat = data.features[0].center[1];

        this.coordenadas.coords.lng = data.features[0].center[0];

        this.get_covid();

      })
  }


  get_char(key) {

    key = key.toUpperCase();

    console.log(key);

    if (key === '') {

      this.estados = [];

      return;
    }

    const state = () => {

      for (let i = 0; i < listaEstados.length; i++) {

        // this.estados = [];

        listaEstados[i].name = listaEstados[i].name.toUpperCase();

        if (listaEstados[i].name.substring(0, key.length) === key) {

          if (!this.estados.includes(listaEstados[i].name)) {

            this.estados.unshift(

              listaEstados[i].name

            );
          }


        }


      }
    }
    state();
  }




}
