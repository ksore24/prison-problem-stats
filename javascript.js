let prisonerArray = createArray();
let boxArray = createArray();
let newBoxArray = [];
let passCount;
let totalPassCount;
let firstPassTotalSuccess;
var nextSelection;
var count;

const container = document.querySelector(".container");
let loopStrategyButton = document.querySelector(".loopStrategyButton");
let randomStrategyButton = document.querySelector(".randomStrategyButton");

loopStrategyButton.addEventListener("click", loopStrategyButtonClicked);

randomStrategyButton.addEventListener("click", randomStrategyButtonClicked)

function createArray()
{
    var newArray = [];
    for(i = 1; i < 101; i++)
    {
        newArray[i] = i;
    }
    return newArray;
}

function loopStrategyButtonClicked()
{   
    passCount = 0;
    totalPassCount = 0;
    firstPassTotalSuccess = 0;
    clearContainer(container);
    randomizeBoxOrder(boxArray);
    getLoopResults(prisonerArray, boxArray);
    showStatsResults();
}

function randomStrategyButtonClicked()
{
    passCount = 0;
    totalPassCount = 0;
    firstPassSuccess = 0;
    firstPassTotalSuccess = 0;
    clearContainer(container);
    randomizeBoxOrder(boxArray);
    getRandomResults(prisonerArray, boxArray);
    showStatsResults();
}

function randomizeBoxOrder(boxArray)
{
    let randomSelection;
    let oldBoxNumber;
    for(l = 100; l > 0; l--)
    {
        randomSelection = Math.floor((Math.random() * 100) + 1);
        oldBoxNumber = boxArray[l];
        boxArray[l] = boxArray[randomSelection];
        boxArray[randomSelection] = oldBoxNumber;
    }

    return boxArray;
}




function getLoopResults(prisonerArray, boxArray)
{
    for(c = 0; c < 1000; c++)
    {
        if(passCount == 100)
        {
            totalPassCount++;
        }
        passCount = 0;
        randomizeBoxOrder(boxArray);
        for(a = 1; a < 101; a++)
        {
            nextSelection = a;
            count = 1;
            let prisonerNumber = a;

            while(count < 101)
            {
                if(boxArray[nextSelection] == prisonerArray[prisonerNumber] && count < 51)
                {
                    if(a == 1)
                    {
                        firstPassTotalSuccess++;
                    }
                    passCount++;
                    count = 102;
                }
                else
                {
                    if(boxArray[nextSelection] == prisonerArray[prisonerNumber])
                    {
                        count = 102;
                    }

                    nextSelection = boxArray[nextSelection];
                    count++;
                }
            }
        }
    }
}

function getRandomResults()
{
    for(c = 0; c < 1000; c++)
    {
        if(passCount == 100)
        {
            totalPassCount++;
        }
        passCount = 0;
        randomizeBoxOrder(boxArray);
        for(a = 1; a < 101; a++)
        {
            newBoxArray = createArray();
            count = 1;
            let prisonerNumber = a;
            randomBoxSelection();

            if(passCount == 100)
            {
                totalPassCount++;
                totalPassCount = 0;
            }

            while(count < 101)
            {
                if(boxArray[nextSelection] == prisonerArray[prisonerNumber] && count < 51)
                {
                    if(a == 1)
                    {
                        firstPassTotalSuccess++;
                    }
                    passCount++;
                    count = 102;

                }
                else
                {
                    if(boxArray[nextSelection] == prisonerArray[prisonerNumber])
                    {
                        count = 102;
                    }
                    randomBoxSelection(newBoxArray);
                    count++;
                }
            }
        }
    }
}

function clearContainer(container)
{
    var div = document.querySelector(".container");
    while(div.firstChild)
    {
        div.removeChild(div.firstChild);
    }
}

function randomBoxSelection()
{
    let randomBox = Math.floor((Math.random() * (newBoxArray.length - 1)) + 1)
    nextSelection = newBoxArray[randomBox]
    for(z = 1; z < newBoxArray.length + 1; z++)
    {
        if(newBoxArray[z] == newBoxArray[randomBox])
        {
            newBoxArray.splice(z, 1);
        }
    }

    return nextSelection, newBoxArray;
}

function showStatsResults()
{
    const successRate = document.createElement("div");
    const firstPassSuccessRate = document.createElement("div");

    successRate.textContent = "Total success rate was " + totalPassCount + "/1000 = " + "or " + Math.round((totalPassCount/1000) * 100) + "%";

    firstPassSuccessRate.textContent = "Success rate if first prisoner passes was " + `${totalPassCount}/${firstPassTotalSuccess} = ` + "or " + Math.round((totalPassCount/(firstPassTotalSuccess)) * 100) + "%";

    container.appendChild(successRate);
    container.appendChild(firstPassSuccessRate);
}