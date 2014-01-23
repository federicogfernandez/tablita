var board = [
    [
        [0, null, 1],
        [2, 3, 2],
        [4, 1, 0]
    ],
    [
        [3, null, 1],
        [null, 2, 0],
        [1, 4, 3]
    ],
    [
        [4, 0, 2],
        [3, null, 3],
        [1, null, 4]
    ],
    [
        [null, null, null],
        [null, 4, 1],
        [3, 0, 2]
    ]
];

var colors = [
    '#ffff00',
    '#0000ff',
    '#ff0000',
    '#00ff00',
    '#ffffff'
];

var chipsColors = [
    '#323232',
    '#a80000',
    '#dccf00',
    '#4c6b2a'
];

var chips = [
    [
        [
            [1, 0, 1],
            [1, 1, 1],
            [1, 0, 1]
        ],
        [
            [1, 1, 1],
            [0, 1, 0],
            [1, 1, 1]
        ]
    ],
    [
        [
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        [
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1]
        ],
        [
            [1, 1, 1],
            [1, 0, 1],
            [1, 0, 1]
        ],
        [
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ]
    ],
    [
        [
            [1, 1, 0],
            [1, 1, 1],
            [1, 0, 1]
        ],
        [
            [1, 1, 1],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 0, 1],
            [1, 1, 1],
            [0, 1, 1]
        ],
        [
            [0, 1, 1],
            [1, 1, 0],
            [1, 1, 1]
        ],
        [
            [0, 1, 1],
            [1, 1, 1],
            [1, 0, 1]
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
            [1, 1, 1]
        ],
        [
            [1, 0, 1],
            [1, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 1, 1],
            [1, 1, 0],
            [0, 1, 1]
        ]
    ],
    [
        [
            [0, 1, 1],
            [1, 1, 0],
            [1, 1, 0]
        ],
        [
            [1, 1, 0],
            [1, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 1, 1],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 1, 1]
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 1, 1]
        ],
        [
            [0, 0, 1],
            [1, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 1, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 1, 1],
            [1, 1, 1],
            [1, 0, 0]
        ]
    ]
];

//DIBUJO TABLA
var table = '';
for(var i=0; i<2; i++){
    table += '<tr>';
    for(var j=0; j<2; j++){
        table += '<td><table cellpadding="0" tablepacing="0">';
        for(var k=0; k<3; k++){
            table += '<tr>';
            for(var l=0; l<3; l++){
                table += '<td>&nbsp;</td>';
            }
            table += '</tr>';
        }
        table += '</table></td>';
    }
    table += '</tr>';
}

$('#board').html(table);
$('#chips').html(table);

table = '';
for(var i=0; i<colors.length; i++){
    table += '<tr>';
    table += '<td class="color" style="background: '+colors[i]+'">&nbsp;</td>';
    table += '<td class="number"><input type="number" /></td>';
    table += '</tr>';
}
$('#card').html(table);

//PINTO board
(function paintBoard(){
    for(cell in board){
        for(y in board[cell]){
            for(x in board[cell][y]){
                $('#board table:eq('+cell+') tr:eq('+y+') td:eq('+x+')').css('background', colors[board[cell][y][x]] || '#000000');
            }
        }
    }

    for(chipType in chips){
        var variant = Math.floor(Math.random()*chips[chipType].length);
        
        for(y in chips[chipType][variant]){
            for(x in chips[chipType][variant][y]){
                if(chips[chipType][variant][x][y]){
                    $('#chips table:eq('+chipType+') tr:eq('+y+') td:eq('+x+')').css('background', chipsColors[chipType]);
                }
            }
        }
    }
})()

