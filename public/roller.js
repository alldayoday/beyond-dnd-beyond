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
roll = Math.floor(Math.random() * 4)
roll = roll +=1
rollResult.textContent = `${roll}`
}

function rollSix(){
  roll = Math.floor(Math.random() * 6)
  roll = roll+=1
  rollResult.textContent = `${roll}`
  }

  function rollEight(){
    roll = Math.floor(Math.random() * 8)
    roll = roll+=1
    rollResult.textContent = `${roll}`
    }

    function rollTen(){
      roll = Math.floor(Math.random() * 10)
      roll = roll+=1
      rollResult.textContent = `${roll}`
      }

      function rollHundo(){
        roll = Math.floor(Math.random() * 100 )
        roll = roll+=1
        rollResult.textContent = `${roll}`
        }

        function rollTwelve(){
          roll = Math.floor(Math.random() * 12)
          roll = roll+=1
          rollResult.textContent = `${roll}`
          }

          function rollTwenty(){
            roll = Math.floor(Math.random() * 20)
            roll= roll+= 1
            rollResult.textContent = `${roll}`
            }

