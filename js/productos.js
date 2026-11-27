const PRODUCTOS = [
  {
    id: "1137023525",
    marca: "SKIN1004",
    nombre: "Poremizing Travel Kit",
    tamano: "4 minis",
    categoria: "Kits",
    precio: 33000,
    descripcion: "Espuma, tónico, ampolla y gel crema para poros y exceso de sebo.",
    imagen: "images/1137023525.jpg"
  },

  {
    id: "1137301407",
    marca: "SKIN1004",
    nombre: "Ampolla Azelaic Acid 10",
    tamano: "30 ml",
    categoria: "Sérums y tratamientos",
    precio: 30000,
    descripcion: "Calma rojeces y mejora manchas y textura. Apta para piel sensible o con acné.",
    imagen: "images/1137301407.jpg"
  },

  {
    id: "11138881-13",
    marca: "SKIN1004",
    nombre: "Tea-Trica Purifying Toner",
    tamano: "210 ml",
    categoria: "Tónicos y pads",
    precio: 20000,
    descripcion: "Tónico purificante con centella para piel con brillo o irregularidades.",
    imagen: "images/11138881-13.jpg"
  },

  {
    id: "11160739-10",
    marca: "SKIN1004",
    nombre: "Espuma Poremizing Deep",
    tamano: "125 ml",
    categoria: "Limpiadores",
    precio: 20000,
    descripcion: "Limpieza profunda con caolín y papaína. Para piel grasa, mixta y sensible.",
    imagen: "images/11160739-10.jpg"
  },

  {
    id: "11202086-39",
    marca: "SKIN1004",
    nombre: "Probio-Cica Essence Toner",
    tamano: "210 ml",
    categoria: "Tónicos y pads",
    precio: 20000,
    descripcion: "Tónico-esencia que calma, hidrata y refuerza la barrera cutánea.",
    imagen: "images/11202086-39.jpg"
  },

  {
    id: "11215033-83",
    marca: "SKIN1004",
    nombre: "Hyalu-Cica Water-Fit Sun Serum SPF50+",
    tamano: "2 × 50 ml",
    categoria: "Protector solar",
    precio: 30000,
    descripcion: "Protector en sérum PA++++, hidratante y sin efecto blanquecino. Twin pack.",
    imagen: "images/11215033-83.jpg"
  },

  {
    id: "10771823-66",
    marca: "SKIN1004",
    nombre: "Centella Toning Toner Jumbo",
    tamano: "400 ml",
    categoria: "Tónicos y pads",
    precio: 40000,
    descripcion: "Tónico con PHA que exfolia suave e hidrata con centella.",
    imagen: "images/10771823-66.jpg"
  },

  {
    id: "10771823-67",
    marca: "SKIN1004",
    nombre: "Espuma Centella Ampoule",
    tamano: "125 ml",
    categoria: "Limpiadores",
    precio: 20000,
    descripcion: "Limpiador pH 5 con 84% de centella, sin tirantez. Para piel sensible o normal.",
    imagen: "images/10771823-67.jpg"
  },

  {
    id: "11130648-08",
    marca: "SKIN1004",
    nombre: "Pads Centella Quick Calming",
    tamano: "70 pads",
    categoria: "Tónicos y pads",
    precio: 25000,
    descripcion: "Pads con 49% de centella y pantenol para calmar piel irritada.",
    imagen: "images/11130648-08.jpg"
  },

  {
    id: "RB-DA-345RC-50",
    marca: "Dr Althea",
    nombre: "345 Relief Cream",
    tamano: "50 ml",
    categoria: "Cremas",
    precio: 32000,
    descripcion: "Calma rojeces, hidrata y fortalece la barrera. Para piel sensible, grasa o con acné.",
    imagen: "images/rb-da-345rc-50.jpg"
  },

  {
    id: "RB-CX-RTSB-15",
    marca: "Celimax",
    nombre: "Retinal Shot Tightening Booster",
    tamano: "15 ml",
    categoria: "Sérums y tratamientos",
    precio: 27000,
    descripcion: "0.1% de retinal con péptidos para firmeza, líneas y manchas.",
    imagen: "images/rb-cx-rtsb-15.jpg"
  },

  {
    id: "RB-CT-EMCPDRN-50",
    marca: "Centellian 24",
    nombre: "Expert Madeca Cream Active Renew PDRN",
    tamano: "50 ml",
    categoria: "Cremas",
    precio: 26000,
    descripcion: "Crema antiedad con PDRN y TECA para firmeza e hidratación.",
    imagen: "images/rb-ct-emcpdrn-50.jpg"
  },

  {
    id: "RB-CT-WCS-10",
    marca: "Centellian 24",
    nombre: "Wrinkle Capture Stick",
    tamano: "10 g",
    categoria: "Sérums y tratamientos",
    precio: 25000,
    descripcion: "Bálsamo en stick para líneas finas en ojos, frente y cuello.",
    imagen: "images/rb-ct-wcs-10.jpg"
  },

  {
    id: "RB-SK-CTC-75",
    marca: "SKIN1004",
    nombre: "Centella TECA Cream",
    tamano: "75 ml",
    categoria: "Cremas",
    precio: 26000,
    descripcion: "Crema en gel que calma, repara la barrera y unifica el tono.",
    imagen: "images/rb-sk-ctc-75.jpg"
  },

  {
    id: "RB-CX-NONI-KIT",
    marca: "Celimax",
    nombre: "Noni Starter Kit Calming + Radiance",
    tamano: "Kit viaje",
    categoria: "Kits",
    precio: 25000,
    descripcion: "Tónico, ampolla y crema de noni para calmar y dar luminosidad.",
    imagen: "images/rb-cx-noni-kit.jpg"
  },

  {
    id: "RB-ES-VC-CF-150",
    marca: "Esfolio",
    nombre: "Vitamin C Cleansing Foam",
    tamano: "150 g",
    categoria: "Limpiadores",
    precio: 20000,
    descripcion: "Espuma con vitamina C para piel opaca, mixta o con tono desigual.",
    imagen: "images/rb-es-vc-cf-150.jpg"
  },

  {
    id: "RB-ES-VA-CF-150",
    marca: "Esfolio",
    nombre: "Volcanic Ash Cleansing Foam",
    tamano: "150 g",
    categoria: "Limpiadores",
    precio: 20000,
    descripcion: "Limpieza profunda y detox con ceniza volcánica. Para piel mixta a grasa.",
    imagen: "images/rb-es-va-cf-150.jpg"
  },

  {
    id: "RB-ES-CL-CF-150",
    marca: "Esfolio",
    nombre: "Collagen Cleansing Foam",
    tamano: "150 g",
    categoria: "Limpiadores",
    precio: 20000,
    descripcion: "Limpia sin resecar, con colágeno. Para uso diario y todo tipo de piel.",
    imagen: "images/rb-es-cl-cf-150.jpg"
  },

  {
    id: "RB-MF-WMP-TZ30",
    marca: "Madforcos",
    nombre: "Wrinkle Master Patch T Zone",
    tamano: "30 parches",
    categoria: "Sérums y tratamientos",
    precio: 6500,
    descripcion: "Parches nocturnos para líneas de expresión en frente y entrecejo.",
    imagen: "images/rb-mf-wmp-tz30.jpg"
  },

  {
    id: "RB-AP-AAP-FC55",
    marca: "APLB",
    nombre: "Azelaic Acid Peptide Facial Cream",
    tamano: "55 ml",
    categoria: "Cremas",
    precio: 18000,
    descripcion: "Crema calmante e iluminadora, sin fragancia, apta para piel sensible.",
    imagen: "images/rb-ap-aap-fc55.jpg"
  },

  {
    id: "RB-AP-RVC-FC55",
    marca: "APLB",
    nombre: "Retinol Vitamin C Vitamin E Facial Cream",
    tamano: "55 ml",
    categoria: "Cremas",
    precio: 18000,
    descripcion: "Crema de noche con retinol para textura, luminosidad y firmeza.",
    imagen: "images/rb-ap-rvc-fc55.jpg"
  },

  {
    id: "RB-ND-SP-PDRN50",
    marca: "Nida",
    nombre: "Salmon PDRN Peptide Serum",
    tamano: "50 ml",
    categoria: "Sérums y tratamientos",
    precio: 24000,
    descripcion: "Sérum con PDRN y 6 péptidos para firmeza y luminosidad.",
    imagen: "images/rb-nd-sp-pdrn50.jpg"
  },

  {
    id: "RB-ND-UMC-100",
    marca: "Nida",
    nombre: "Ultimate Moisturizing Cream",
    tamano: "100 ml",
    categoria: "Cremas",
    precio: 25000,
    descripcion: "Hidratación intensa y no grasa, con niacinamida y colágeno.",
    imagen: "images/rb-nd-umc-100.jpg"
  },

  {
    id: "RB-PU-TOXTOX10",
    marca: "Puluk",
    nombre: "ToxTox Lash Treatment",
    tamano: "10 ml",
    categoria: "Sérums y tratamientos",
    precio: 12000,
    descripcion: "Tratamiento nutritivo para pestañas y cejas. Rinde hasta 50 usos.",
    imagen: "images/rb-pu-toxtox10.jpg"
  }
];
