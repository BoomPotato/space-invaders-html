/**
 * 11 Nov 2023
 * Old load grid function; generates grid cells for bunker imgs
 * Grid id format: grid-{row}-{column}
 * Bunker grid id format: gridbunker-{firstColumn}-{thirdColumn}
 */
function loadGridOld() {
  let grid = document.getElementById("grid");
  grid.style.setProperty("grid-template-columns", `repeat(${columnSize}, 3vw)`);
  grid.style.setProperty("grid-template-rows", `repeat(${rowSize}, 5.5vh)`);

  //Grid dimensions: 31 across, 13 down (5 invaders, 6 gaps, 1 bunker, 1 tank)
  for (let row = 1; row <= rowSize; row++) {

    /**
     * Gonna redo the grid cell generation for bunker row and replace bunker imgs with coloured grids, 
     * to allow bullets to pass through bunker row once a bunker segment is destroyed.
     */

    //Bunkers
    //If row is the second last row (bunker row)
    if (row == rowSize - 1) {

      //Middle segment
      let middleBunkerFirstColumn = middleColumn - 1;
      let middleBunkerThirdColumn = middleColumn + 1;
      let middleBunkerGridColumnStart = middleBunkerFirstColumn;
      let middleBunkerGridColumnEnd = middleBunkerThirdColumn + 1;

      let bunkersOnEachSide = 0;
      let bunkerToggle = false;

      //If bunker column size is even
      if (bunkerColumnSize % 2 == 0) {
        bunkersOnEachSide = bunkerColumnSize / 2;
        //Middle segment doesn't have a bunker
        bunkerToggle = false;
      }
      //If bunker column size is odd
      else {
        bunkersOnEachSide = (bunkerColumnSize - 1) / 2;
        //Middle segment has a bunker
        bunkerToggle = true;
        bunkerSegments.push({
          "id": `gridbunker-${middleBunkerFirstColumn}-${middleBunkerThirdColumn}`,
          "gridColumnStartEnd": [middleBunkerGridColumnStart, middleBunkerGridColumnEnd],
        });
      }

      //Columns to the left of the middle segment
      let bunkerCounter = 0;
      let leftDone = false;
      let previousFirstColumn = middleBunkerFirstColumn;
      while ((bunkerCounter < bunkersOnEachSide) && !leftDone) {
        let thirdColumn = previousFirstColumn - 1;
        let firstColumn = thirdColumn - 2;

        let gridColumnStart = firstColumn;
        let gridColumnEnd = thirdColumn + 1;

        //If previous segment has a bunker
        if (bunkerToggle) {
          bunkerToggle = false;
        }
        //If previous segment doesn't have a bunker
        else {
          bunkerCounter++;
          bunkerToggle = true;
          bunkerSegments.unshift({
            "id": `gridbunker-${firstColumn}-${thirdColumn}`,
            "gridColumnStartEnd": [gridColumnStart, gridColumnEnd]
          });
        }

        if (bunkerCounter >= bunkersOnEachSide) {
          leftDone = true;
        }
        previousFirstColumn = firstColumn;
      }

      //Restart counting from the middle segment
      bunkerCounter = 0;
      if (bunkerColumnSize % 2 == 0) {
        bunkerToggle = false;
      }
      else {
        bunkerToggle = true;
      }

      //Columns to the right of the middle segment
      let rightDone = false;
      let previousThirdColumn = middleBunkerThirdColumn;
      while ((bunkerCounter < bunkersOnEachSide) && !rightDone) {
        let firstColumn = previousThirdColumn + 1;
        let thirdColumn = firstColumn + 2;

        let gridColumnStart = firstColumn;
        let gridColumnEnd = thirdColumn + 1;

        //If previous segment has a bunker
        if (bunkerToggle) {
          bunkerToggle = false;
        }
        //If previous segment doesn't have a bunker
        else {
          bunkerCounter++;
          bunkerToggle = true;
          bunkerSegments.push({
            "id": `gridbunker-${firstColumn}-${thirdColumn}`,
            "gridColumnStartEnd": [gridColumnStart, gridColumnEnd]
          });
        }

        if (bunkerCounter >= bunkersOnEachSide) {
          rightDone = true;
        }
        previousThirdColumn = thirdColumn;
      }
      //Log bunker segments
      console.log("bunkerSegments", bunkerSegments);

      //Create grid cells  
      const firstColumnOfAllSegments = [];
      for (let i = 0; i < bunkerSegments.length; i++) {
        let idSplit = bunkerSegments[i].id.split("-");
        firstColumnOfAllSegments.push(parseInt(idSplit[1]));
      }
      const firstColumnOfFirstSegment = firstColumnOfAllSegments[0];
      const lastSegmentIdSplit = bunkerSegments[bunkerSegments.length - 1].id.split("-");
      const thirdColumnOfLastSegment = parseInt(lastSegmentIdSplit[2]);

      //Create bunker segments
      for (let column = 1; column <= columnSize; column++) {
        if (column >= firstColumnOfFirstSegment && column <= thirdColumnOfLastSegment) {
          if (firstColumnOfAllSegments.includes(column)) {
            //Create bunker segment
            const segmentIndex = firstColumnOfAllSegments.indexOf(column);
            let gridItem = document.createElement("div");
            gridItem.setAttribute("class", "grid-item");
            gridItem.setAttribute("id", bunkerSegments[segmentIndex].id);
            gridItem.style["grid-column-start"] = bunkerSegments[segmentIndex].gridColumnStartEnd[0];
            gridItem.style["grid-column-end"] = bunkerSegments[segmentIndex].gridColumnStartEnd[1];

            //Label the grid cell
            // let label = document.createTextNode(bunkerSegments[segmentIndex].id);
            // gridItem.appendChild(label);

            grid.appendChild(gridItem);

            //Create intermediate columns
            if (segmentIndex != firstColumnOfAllSegments.length - 1) {
              for (let i = 1; i <= 3; i++) {
                const idOfSegmentSplit = bunkerSegments[segmentIndex].id.split("-");
                const columnOfSegment = parseInt(idOfSegmentSplit[2]);

                let gridItem = document.createElement("div");
                gridItem.setAttribute("class", "grid-item");
                gridItem.setAttribute("id", `grid-${row}-${columnOfSegment + i}`);

                //Label the grid cell
                // let label = document.createTextNode(`${row}-${columnOfSegment + i}`);
                // gridItem.appendChild(label);

                grid.appendChild(gridItem);
              }
            }
          }
        }
        else {
          let gridItem = document.createElement("div");
          gridItem.setAttribute("class", "grid-item");
          gridItem.setAttribute("id", `grid-${row}-${column}`);

          //Label the grid cell
          // let label = document.createTextNode(`${row}-${column}`);
          // gridItem.appendChild(label);

          grid.appendChild(gridItem);
        }
      }
    }
    //If row is the last row (tank row)
    else if (row == rowSize) {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        //Label the grid cell
        // let label = document.createTextNode(`${row}-${column}`);
        // gridItem.appendChild(label);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
    else {
      for (let column = 1; column <= columnSize; column++) {
        let gridItem = document.createElement("div");
        gridItem.setAttribute("class", "grid-item");
        gridItem.setAttribute("id", `grid-${row}-${column}`);

        //Label the grid cell
        // let label = document.createTextNode(`${row}-${column}`);
        // gridItem.appendChild(label);

        grid.appendChild(gridItem);
        document.body.appendChild(grid);
      }
    }
  }
}

/**
 * From StackOverFlow:
 * https://stackoverflow.com/questions/16345870/keydown-keyup-events-for-specific-keys
 */
function tankControlsRef() {
  const Action = {
    powerOn() { console.log("Accelerating..."); },
    powerOff() { console.log("Decelerating..."); },
    brakeOn() { console.log("Break activated"); },
    brakeOff() { console.log("Break released"); },
    exit() { console.log("Nice drive!"); },
    // clutch, colors, lights, fire... Add more, go wild!
  };

  const keyAction = {
    w: { keydown: Action.powerOn, keyup: Action.powerOff },
    s: { keydown: Action.brakeOn, keyup: Action.brakeOff },
    Escape: { keydown: Action.exit }
  };

  const keyHandler = (ev) => {
    if (ev.repeat) return; // Key-held, prevent repeated Actions (Does not work in IE11-)
    if (!(ev.key in keyAction) || !(ev.type in keyAction[ev.key])) return; // No such Action
    keyAction[ev.key][ev.type]();  // Trigger an Action
  };

  ['keydown', 'keyup'].forEach((evType) => {
    document.body.addEventListener(evType, keyHandler);
  });
}
