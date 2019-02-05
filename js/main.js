var mymap = L.map('map', {
     center: [42, -102],
     zoom: 4.3,
     maxZoom: 20,
     minZoom: 3,
     detectRetina: true});
 L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);
 var airports = null;
 var colors = chroma.scale('Set2').mode('lch').colors(9);
 for (i = 0; i < 9; i++) {
 $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
airports= L.geoJson.ajax("assets/airports.geojson", {
 onEachFeature: function(feature, layer) {
   layer.bindPopup(feature.properties.AIRPT_NAME);
 },
 pointToLayer: function (feature, latlng) {
   var id = 0;
   if (feature.properties.CNTL_TWR == "Y") { id = 0; }
   else if (feature.properties.CNTL_TWR == "N")  { id = 4; }
   else { id = 2;}
   return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
 },
     attribution: 'Airport Data &copy; DATA.gov | US States &copy; Mike Bostock [D3] | Base Map &copy; CartoDB | Made By Hannah Garcia'
 }).addTo(mymap);

 var colors = chroma.scale('Greys').mode('lch').colors(5);

 function setColor(density) {
 var id = 0;
 if (density > 60) { id = 4; }
 else if (density > 30 &&  density <= 60) { id = 3; }
 else if (density > 15 &&  density <= 30) { id = 2; }
 else if (density > 5 &&  density <= 15) { id = 1; }
 else  { id = 0; }
 return colors[id];
}
 function style(feature) {
   return{
     fillColor: setColor(feature.properties.count),
     fillOpacity: 0.65,
     weight: 1,
     opacity: 2,
     color: '#909090',
     dashArray: '1'
   };
 }
 var states = null;
 states = L.geoJson.ajax("assets/us-states.geojson", {
   style: style
 }).addTo(mymap);
 var legend = L.control({position: 'bottomright'});
 legend.onAdd = function () {
   var div = L.DomUtil.create('div', 'legend');
   div.innerHTML += '<i class="fa fa-plane marker-color-9"></i>  Airport';
   div.innerHTML += '<p><i class="fa fa-plane marker-color-1"></i> Control Tower</p>';
   div.innerHTML += '<p><i class="fa fa-plane marker-color-5"></i>  No Control Tower</p>';
   div.innerHTML += '<hr><b>Airport Density</b><br />';
   div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.75"></i><p>60+</p>';
   div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.75"></i><p>41 - 60</p>';
   div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.75"></i><p>16 - 40</p>';
   div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.75"></i><p>6 - 15</p>';
   div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.75"></i><p>0 - 5</p>';
   return div;
 };
 legend.addTo(mymap);
 L.control.scale({position: 'bottomleft'}).addTo(mymap);
