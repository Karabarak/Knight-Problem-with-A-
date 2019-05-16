function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  let d1 = Math.abs (b.i - a.i);
  let d2 = Math.abs (b.j - a.j);
  return d1 + d2;
}

let cols;
let rows;
let grid = [];

let openSet = [];
let closedSet = [];
let startPosition;
let finishPosition;
let path = [];




function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  // this.wall = false;
  //
  // if(Math.random(1) < 0.5){
  //   this.wall = true;
  // }



  this.addNeighbors = function(grid) {
    let i = this.i;
    let j = this.j;
    if (grid[i + 1] !== undefined && grid[i][j + 2] !== undefined) {
      this.neighbors.push(grid[i + 1][j + 2])
    }
    if (grid[i + 1] !== undefined && grid[i][j - 2] !== undefined) {
      this.neighbors.push(grid[i + 1][j - 2])
    }
    if (grid[i + 2] !== undefined && grid[i][j + 1] !== undefined) {
      this.neighbors.push(grid[i + 2][j + 1])
    }
    if (grid[i + 2] !== undefined && grid[i][j - 1] !== undefined) {
      this.neighbors.push(grid[i + 2][j - 1])
    }
    if (grid[i - 1] !== undefined && grid[i][j + 2] !== undefined) {
      this.neighbors.push(grid[i - 1][j + 2])
    }
    if (grid[i - 2] !== undefined && grid[i][j - 1] !== undefined) {
      this.neighbors.push(grid[i - 2][j - 1])
    }
    if (grid[i - 2] !== undefined && grid[i][j + 2] !== undefined) {
      this.neighbors.push(grid[i - 2][j + 1])
    }
    if (grid[i - 1] !== undefined && grid[i][j - 2] !== undefined) {
      this.neighbors.push(grid[i - 1][j - 2])
    }
  }
}

function setup() {
  // Making a 2D Array
  grid = new Array(cols);
  for (i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  console.log(grid);
}

function draw() {

  if (openSet.length > 0) {

    let winner = 0;
    for (var i = 0; i < openSet.Length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    let current = openSet[winner];

    if (current === finishPosition) {
      // //Find the path
      path = [];
      var temp = current;
      path.push(temp);
      while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
      }
      console.log('Done!');

    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    //Checking every neighbor
    let neighbors = current.neighbors;
    for (i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

        if (!closedSet.includes(neighbor) ) {    //&& !neighbor.wall
        let tempG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, finishPosition);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;

      }
    }

  } else {

  }
  //
  // for(i=0; i<closedSet.length; i++){
  //   $('.row' + closedSet[i].i + '.column' + closedSet[i].j).fadeOut(200).fadeIn(100);
  //
  // }

  for(i=0; i<openSet.length; i++){
    $('.row' + openSet[i].i + '.column' + openSet[i].j).fadeOut(200).fadeIn(100);
  }

  //Find the path


  for(i=0; i<path.length; i++){
    // $('.row' + path[i].i + '.column' + path[i].j).fadeOut( 50 ).fadeIn( 50 );
    $('.row' + path[i].i + '.column' + path[i].j).delay(100).slideUp(300).slideDown(150).attr('style', 'background-color: #a7d129');
    // $('.row' + path[i].i + '.column' + path[i].j).attr('style', 'background-color: #a7d129');

  }

}

function gChessboard(i) {
  // reset();
  for (x = 0; x < i; x++) {
    $('#table').append('<div class="row remove" id="row' + x + '"></div>');
    for (y = 0; y < (i / 2); y++) {
      if (isEven(x)) {
        $('#row' + x).append('<div class="whiterectangle col-sm remove row' + x + ' column' + (y * 2) + '"><p class="row">' + x + '</p><p class="column">' + (y * 2) + '</p></div>');
        $('#row' + x).append('<div class="blackrectangle col-sm remove row' + x + ' column' + ((y * 2) + 1) + '"><p class="row">' + x + '</p><p class="column">' + ((y * 2) + 1) + '</p></div>');
      } else {
        $('#row' + x).append('<div class="blackrectangle col-sm remove row' + x + ' column' + (y * 2) + '"><p class="row">' + x + '</p><p class="column">' + (y * 2) + '</p></div>');
        $('#row' + x).append('<div class="whiterectangle col-sm remove row' + x + ' column' + ((y * 2) + 1) + '"><p class="row">' + x + '</p><p class="column">' + ((y * 2) + 1) + '</p></div>');
      };
    };
  };
};

function isEven(n) {
  return n % 2 == 0;
};

$('button.generate').click(function() {
  // $('.remove').remove();
  rows = parseInt($('input').val());
  cols = parseInt($('input').val());
  gChessboard(rows);
  // populateArrays($('input').val())
  console.log('rows: ' + rows);
  console.log('columns: ' + cols);
  setup();
  // draw();
});

$(document).on('click', 'div.col-sm', function() {

  // for (i = 0; i < cols; i++) {
  //   for (j = 0; j < rows; j++) {
  //     if(grid[i][j].wall){
  //     $('.row' + i + '.column' + j).addClass('currentPosition');
  //     }
  //   }
  // }

  if (startPosition !== undefined && finishPosition === undefined) {
    let finish = $(this).children().text();
    $(this).addClass('finish');
    finishPosition = grid[parseInt(finish.charAt(0))][parseInt(finish.charAt(1))];
  }
  if (startPosition === undefined) {
    let start = $(this).children().text();
    $(this).addClass('start');
    startPosition = grid[parseInt(start.charAt(0))][parseInt(start.charAt(1))];
    openSet.push(startPosition);
    // currentPosition = startPosition;
  }
});

$(document).on('click', 'button.nextStep', function() {
while(openSet.length > 0){
  draw();
}
});
