const dFour = document.querySelector('#dFour')
const dSix = document.querySelector('#dSix')
const dEight = document.querySelector('#dEight')
const dTen = document.querySelector('#dTen')
const dHundo = document.querySelector('#dHundo')
const dTwelve = document.querySelector('#dTwelve')
const dTwenty = document.querySelector('#dTwenty')

dFour.addEventListener('click', rollFour)
dSix.addEventListener('click', rollSix)
dEight.addEventListener('click', rollEight)
dTen.addEventListener('click', rollTen)
dHundo.addEventListener('click', rollHundo)
dTwelve.addEventListener('click', rollTwelve)
dTwenty.addEventListener('click', rollTwenty)

const rollResult = document.querySelector('#rollResult')

function rollFour(){
roll = Math.floor(Math.random() * 5)
rollResult.textContent = `${roll}`
}

function rollSix(){
  roll = Math.floor(Math.random() * 7)
  rollResult.textContent = `${roll}`
  }

  function rollEight(){
    roll = Math.floor(Math.random() * 9)
    rollResult.textContent = `${roll}`
    }

    function rollTen(){
      roll = Math.floor(Math.random() * 11)
      rollResult.textContent = `${roll}`
      }

      function rollHundo(){
        roll = Math.floor(Math.random() * 101)
        rollResult.textContent = `${roll}`
        }

        function rollTwelve(){
          roll = Math.floor(Math.random() * 13)
          rollResult.textContent = `${roll}`
          }

          function rollTwenty(){
            roll = Math.floor(Math.random() * 21)
            rollResult.textContent = `${roll}`
            }

console.log('linked')