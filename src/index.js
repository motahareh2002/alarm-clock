

const $ = document;

let selectMenu = $.querySelectorAll("select")
let times = $.querySelector("#time")
let btn = $.querySelector("#btn")
let audio = new Audio("../wake_up_3.mp3")
let alarmTime , alarmState = 'noset';

for (let i = 23; i >= 0; i--){
    i = i < 10 ? ("0" + i) : i
    let option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option)
}
for (let i = 59; i >= 0; i--){
    i = i < 10 ? ("0" + i) : i
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    
    h = h < 10 ? "0" + h : h ;
    m = m < 10 ? "0" + m : m ;
    s = s < 10 ? "0" + s : s ;

    times.innerHTML = `${h} : ${m} : ${s}`

    if (alarmTime === `${h} : ${m}`) {
        audio.play()
        audio.loop = true;
    }
}, 1000)

btn.addEventListener("click", () => {
    alarmTime = `${selectMenu[0].value} : ${selectMenu[1].value}`
    
    if (alarmTime.includes('Hour') || alarmTime.includes('Minute')) alert("زمان هشدار را به درستی  مشخص کنید.")
    checkState(alarmState)

})

function checkState(state) {
    if (state === 'noset') {
        selectMenu[0].disabled = true
        selectMenu[1].disabled = true
        btn.innerHTML = 'Clear Alarm'
        alarmState = 'set'
    }
    else {
        selectMenu[0].disabled = false
        selectMenu[1].disabled = false
        alarmTime = ''
        btn.innerHTML = 'Set Alarm'
        audio.pause()
        alarmState = 'noset'
    }
}

