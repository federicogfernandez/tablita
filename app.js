
var piezas =[
    "100000011".split(""), 
    "000011000".split(""),
    "010000001".split(""), 
    "010000010".split("")
];

var huecos = [
    "byg0rwg0b".split(""),
    "0br0wy00g".split(""),
    "bry0gbyrw".split(""),
    "rgwy00wgb".split("")
];

var allPiezas = [];

function rotate(pieza){
    var i,j,x,y,res = [];
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            x = 2-i;
            y = j;
            res.push( pieza[ x + y * 3 ] );
        }
    }
    return res;
}

function flip(pieza){
    var i,j,x,y,res = [];
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            x = 2-j;
            y = i;
            res.push( pieza[ x + y * 3 ] );
        }
    }
    return res;
}

function calcularPermutaciones(){

    var i,j,k,l, perms = [];
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            for(k=0;k<4;k++){
                for(l=0;l<4;l++){
                    var test = {};
                    test[0] = test[1] = test[2] = test[3] = 0;
                    test[i] +=1;
                    test[j] +=1;
                    test[k] +=1;
                    test[l] +=1;

                    var ok = true;

                    for(var h = 0; h<4; h++){
                        if(test[h]>1){
                            ok = false;
                            continue;
                        }
                    }

                    if(ok){
                        perms.push([i,j,k,l]);
                    }


                }
            }
        }
    }
    return perms;

}

function generarPiezasSinDuplicados(){
    var allPiezas=[], posicionesPieza, i,j,k, pj, dups;
    
    for(i=0;i<4;i++){
        posicionesPieza = [];
        for(j=0;j<8;j++){
            
            if(j==0){
                pj = piezas[i];
            } else if(j==4){
                pj = flip(piezas[i]);
            } else {
                pj = rotate(pj);
            }

            dups = false;

            for(k=0;k<posicionesPieza.length;k++){
                if( posicionesPieza[k].pieza.join("") == pj.join("") ){
                    dups = true;
                }
            }

            if(!dups) {
                posicionesPieza.push({ pieza: pj, posicion: j});
            }

        }
        allPiezas.push(posicionesPieza);
    }
    return allPiezas;
}

allPiezas = generarPiezasSinDuplicados();

var permutaciones = calcularPermutaciones();

//Al derecho:
function check(objective){
    
    cantResults = 0;

    var pix, rot, lastPieza;
    var results = [];

    for(pix = 0; pix < permutaciones.length; pix++){

        var i,j,k,l;
        var pi, pj, pk, pl;

        for(i=0;i<allPiezas[permutaciones[pix][0]].length;i++){
            pi = allPiezas[permutaciones[pix][0]][i].pieza;

            for(j=0;j<allPiezas[permutaciones[pix][1]].length;j++){
                pj = allPiezas[permutaciones[pix][1]][j].pieza;

                for(k=0;k<allPiezas[permutaciones[pix][2]].length;k++){
                    pk = allPiezas[permutaciones[pix][2]][k].pieza;
                    
                    for(l=0;l<allPiezas[permutaciones[pix][3]].length;l++){
                        pl = allPiezas[permutaciones[pix][3]][l].pieza;

                        if(matchObjective(objective, [pi, pj, pk, pl] )){
                            cantResults++;
                            results.push({
                                orden: permutaciones[pix], 
                                rotaciones: [
                                    allPiezas[permutaciones[pix][0]][i].posicion,
                                    allPiezas[permutaciones[pix][1]][j].posicion,
                                    allPiezas[permutaciones[pix][2]][k].posicion,
                                    allPiezas[permutaciones[pix][3]][l].posicion
                                ]
                            })
                        }

                    }
                }
            }
        }

    }

    return results;

}

function matchObjective(objective, pz){

    var i, key, match = {}

    for(i=0;i<4;i++){
        for(j=0;j<9;j++){
            if(pz[i][j] === "1"){
                match[huecos[i][j]] = match[huecos[i][j]] ? match[huecos[i][j]] + 1 : 1;
            }
        }
    }

    delete(match["0"])

    for(key in objective){
        if(match[key] && match[key] == objective[key]){
        }else{
            return false;
        }
    }

    for(key in match){
        if(objective[key] && match[key] == objective[key]){
            
        }else{
            return false;
        }
    }

    return true;

}


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

board = recreateBoard();

function recreateBoard(){
    var i,j,b, board = [];
    //Rewrite board:
    
    for(b=0;b<4;b++){
        var sq =[];
        for(i=0;i<3;i++){
            var row = [];
            for(j=0;j<3;j++){
                row.push(huecos[b][j + i * 3])
            }
            sq.push(row);
        }
        board.push(sq);
    }
    return board;
}


var colors = {
    y: '#ffff00',
    b: '#0000ff',
    r: '#ff0000',
    g: '#00ff00',
    w: '#ffffff'
};

var chipsColors = [
    '#4c6b2a', //verdecito
    '#a80000',
    '#dccf00',
    '#323232', //Negro
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
for(var i in colors){
    table += '<tr>';
    table += '<td class="color" style="background: '+colors[i]+'">&nbsp;</td>';
    table += '<td class="number"><input class="aValue" data-color="' + i +'" type="number" value="0" /></td>';
    table += '</tr>';
}
$('#card').html(table);

//PINTO board
(function paintBoard(){
    for(cell in board){
        for(y in board[cell]){
            for(x in board[cell][y]){
                $('#board table:eq('+cell+') tr:eq('+y+') td:eq('+x+')').css('background', colors[board[cell][y][x]] || '#6b470f');
            }
        }
    }

})()



$("#doMagic").click(function(){


    var objective = {};

    $('.aValue').each(function(){
        var value = parseInt($(this).val(),10);
        if(value>0){
            objective[$(this).attr('data-color')] = value;
        }
    })

    var results = check(objective)

    if(results.length > 0){
        for(var i = 0;i<4;i++){
            var piezaInfo = allPiezas[results[0].orden[i]][results[0].rotaciones[i]]
            for(var j = 0; j<9; j++){
                var y = Math.floor(j/3);
                var x = j - y * 3;
                $('#chips table:eq('+i+') tr:eq('+y+') td:eq('+x+')').css('background', piezaInfo.pieza[j] === "0" ? chipsColors[results[0].orden[i]] : null );
            }
        }

    }else{
        alert('no results');
    }

})