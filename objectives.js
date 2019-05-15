var AREAS = ["Isola", "Porta Venezia", "Loreto", "Città Studi", "Acquabella", "Porta Romana", "Gerusalemme", "Crocetta", "Lambrate", "Navigli"];

var OBJ = [
    {   id: 0,
     name: "Public Transportation Coverage [n/km²]", 
     original_weight: 50
    },
    {
        id: 1,
        name: "Number of big supermarkets",
        original_weight: 70
    }, 
    {
        name: "Safety [# of crimes] ",
        original_weight: 25
    },
    {
        name: "Energy class [kWh/m² per year]",
        original_weight: 65
    },
    {
        name: "Noise Level [dB]",
        original_weight: 40
    },
    {
        name: "Accesibility to Polimi [minutes]",
        original_weight: 70
    },
    {
        name: "Density of Green Areas [m² per person]",
        original_weight: 15
    },
    {
        name: "Cost [€/m²]",
        original_weight: 100
    },
    {
        name: "Flexibility to rent [value increase in €/m² year]",
        original_weight: 30
    },
    {
        name: "Flexibility to sell [value increase in €/m² year]",
        original_weight: 40
    }, 
    {
        name: "Density of restaurants and Bars [#/km²]",
        original_weight: 55
    },
    {
        name: "Density of Clubs [#/km²]",
        original_weight: 30
    },
    {
        name: "Density of Gyms [#/km²]",
        original_weight: 25
    },
    {
        name: "Density of Tobacco shops [#/km²]",
        original_weight: 45
    },
    {
        name: "Density Gas Stations [#/km²]",
        original_weight: 20
    },
    {
        name: "Internet Connection Spees [Mbit/s]",
        original_weight: 10
    }, 
    {
        name: "Accesibility to City Center [minutes]",
        original_weight: 35
    }, 
    {
        name: "Proximity to Occasional activities",
        original_weight: 45
    }
];

// 0,4	1	0,273	0,23	0	1	0,45	0,52676564	0,28571427	0,54315126	0,8	0	0	0,25	0,875	1	0,94428575	1	1

var PM = {                                                                 //#
    "Isola":         [0.4,  1,   1,     0.6,    0.4165, 0.3,   0.25,  0.094, 0.39, 0.87, 0.4,  0.27,  1,  0.67,  0.75,  0.725, 1,     0.7,  0.17 ],
    "Porta Venezia": [0.0,  0.7, 0.945, 0.76,   0.4165, 0.85,  0.5,   0,     1,    1,    1,    0,     0,  1,     0.75,  0.375, 1,     0.15, 0.17 ],
    "Loreto":        [0.95, 0.7, 0.777, 1,      0.3332, 0.92,  0.25,  0.904, 0.36, 0.23, 0.82, 1,     0,  0.67,  0.375, 0.35,  0.85,  0.25, 0.17 ],
    "Città Studi" :  [1,    1,   0.273, 0.35,   0.167,  1,     0.6,   0.603, 0.18, 0.5,  0.4,  0,     1,  0.5,   0.375, 0,     0.92,  0.75, 0.875],
    "Acquabella" :   [0.9,  1,   0,     0.24,   1,      0.38,  0.75,  0.711, 0.07, 0.4,  0.3,  0,     1,  0,     1,     0,     0.91,  0.95, 0    ],
    "Porta Romana":  [0.46, 1,   0.63,  0.21,   0.833,  0.18,  0.25,  0.143, 0.18, 0.8,  0.85, 0.27,  1,  0.67,  0,     0.525, 1,     0.1,  0.875],
    "Gerusalemme" :  [0.44, 1,   0.315, 0.73,   0.498,  0.21,  0,     0.63,  0.46, 0.47, 0.95, 0.27,  0,  0.83,  0.375, 0.75,  0.803, 0.8,  0.875],
    "Crocetta" :     [0.76, 0,   0.315, 0,      0.33,   0.09,  0.5,   0.13,  0.46, 0.82, 0.3,  0,     0,  0,     0,     0.6,   1,     0,    0.79 ],
    "Lambrate":      [0.76, 0.7, 0.21,  0.1,    0.08,   0.69,  1,     1,     0,    0,    0,    0,     1,  0.25,  0,     0.375, 0.167, 0.55, 0,79 ],
    "Navigli":       [0.4,  1,   0.273, 0.23,   0,      0,     0.45,  0.53,  0.28, 0.54, 0.8,  0,     0,  0.25,  0.875, 1,     0.94,  1,    1    ]
}



COORDS = [];


COORDS["Isola"] =  [
    {lng:9.183969 , lat:45.483529 },
    {lng:9.182250 , lat:45.495008 },
    {lng:9.203751 , lat:45.491899 },
    {lng:9.193595 , lat:45.483289 },
]

COORDS["Porta Venezia"] =  [
    {lng:9.206952 , lat:45.468739 },
    {lng:9.205337 , lat:45.474803 },
    {lng:9.200826 , lat:45.476965 },
    {lng:9.208573 , lat:45.485224 },
    {lng:9.217315 , lat:45.481566 },
    {lng:9.216671 , lat:45.471621 },
]

COORDS["Loreto"] =  [
    {lng:9.208915 , lat:45.488050 },
    {lng:9.214744 , lat:45.494627 },
    {lng:9.223989 , lat:45.489240 },
    {lng:9.217732 , lat:45.483590 }
]

COORDS["Città Studi"] =  [
    {lng:9.219418 , lat:45.476676 },
    {lng:9.218968 , lat:45.483135 },
    {lng:9.236501 , lat:45.485086 },
    {lng:9.237918 , lat:45.472613 },
    {lng:9.218115 , lat:45.472059 },
]

COORDS["Acquabella"] =  [
    {lng:9.218495 , lat:45.470371 },
    {lng:9.235511 , lat:45.471294 },
    {lng:9.237397 , lat:45.462707 },
    {lng:9.218093 , lat:45.463163 }
]

COORDS["Porta Romana"] =  [
    {lng:9.202927 , lat:45.453118 },
    {lng:9.208053 , lat:45.461933 },
    {lng:9.223452 , lat:45.461645 },
    {lng:9.222507 , lat:45.447200 }
]

COORDS["Crocetta"] =  [
    {lng:9.201074 , lat:45.453327 },
    {lng:9.193728 , lat:45.457705 },
    {lng:9.198216 , lat:45.462156 },
    {lng:9.206211 , lat:45.460814 }
]

COORDS["Lambrate"] =  [
    {lng:9.239578 , lat:45.479038 },
    {lng:9.238129 , lat:45.485598 },
    {lng:9.233281 , lat:45.490034 },
    {lng:9.238516 , lat:45.492617 },
    {lng:9.238516 , lat:45.492617 },
    {lng:9.246035 , lat:45.482281 }
]

COORDS["Gerusalemme"] =  [
    {lng:9.176685 , lat:45.480295 },
    {lng:9.169121 , lat:45.479489 },
    {lng:9.158601 , lat:45.487371 },
    {lng:9.157911 , lat:45.492479 },
    {lng:9.167287 , lat:45.493244 },
    {lng:9.171664 , lat:45.487874 }
]

COORDS["Navigli"] =  [
    {lng:9.164518 , lat:45.447630 },
    {lng:9.175077 , lat:45.454242 },
    {lng:9.193765 , lat:45.451822 },
    {lng:9.194537 , lat:45.446728 }
]