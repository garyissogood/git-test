// 輸入 weight height 計算 BMI
// if 判斷結果 並改變狀態
// 結果 push 到 array 裡 再存到 localstorg 
// 每新增,刪除一筆要 更新資料
// 點擊 click  將 localstorg 結果顯示在網頁上






//建立DOM
var btnStatus = document.querySelector('.btnStatus'); //計算按鈕區
var calculateBtn = document.querySelector('.calculateBtn'); //計算結果按鈕
var list = document.querySelector('.list'); //歷史紀錄清單

// 畫面顯示出資料若沒資料(第一筆)則 回傳空陣列
var data = JSON.parse(localStorage.getItem('bmiData')) || [];

//建立監聽
calculateBtn.addEventListener('click', actionBMI, false);
list.addEventListener('click',delBMI,false);

//先載入歷史紀錄內容
update(data);


//計算按鈕按下開始動作
function actionBMI(e) {

    e.preventDefault();

    //取得輸入值
    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value;

    var sidebar = "";
    var judge = "";

    //計算BMI
    var BMI = (weight / Math.pow(height / 100, 2)).toFixed(2); //四捨五入,取小數點後第2位


    //輸入資料判斷,檢查是否為非數字
    var check_h = Number(height);
    var check_w = Number(weight);
    if (isNaN(check_h) || isNaN(check_w)) {
        alert('請填入數字');
        return;
    }
    //檢查input是否為空值與負值
    if (height == '' || weight == '' || height <= 0 || weight <= 0) {
        alert('請填入身高與體重，數值不可為0');
        return;
    } else if (height > 300 || weight > 900) {
        alert('請重新輸入身高與體重!');
        return;
    }


    // 計算日期時間
    var date = new Date(); // 時間物件
    var MM = (date.getMonth() + 1); // 從0開始 +1（0~11月+1）
    var DD = date.getDate();
    var YY = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var time = `${YY}/${MM}/${DD} ${hours}:${min}:${sec}`;


    // if 判斷 並設定屬性
    // 設定 button 裡面的 class 屬性為 blue
    if (BMI < 18.5) {
        judge = '體重過輕';
        sidebar = 'blue';
        btnStatus.setAttribute("class", "btnStatus blue");
    } else if (18.5 <= BMI && BMI < 24) {
        judge = '理想範圍';
        sidebar = 'green';
        btnStatus.setAttribute("class", "btnStatus green");
    } else if (24 <= BMI && BMI < 27) {
        judge = '體重過重';
        sidebar = 'orange';
        btnStatus.setAttribute("class", "btnStatus orange");
    } else if (27 <= BMI && BMI < 30) {
        judge = '輕度肥胖';
        sidebar = 'lightRed';
        btnStatus.setAttribute("class", "btnStatus lightRed");
    } else if (30 <= BMI && BMI < 35) {
        judge = '中度肥胖';
        sidebar = 'red';
        btnStatus.setAttribute("class", "btnStatus red");
    } else if (BMI >= 35) {
        judge = '重度肥胖';
        sidebar = 'crimson';
        btnStatus.setAttribute("class", "btnStatus crimson");
    }


    // 組合成物件
    var totalResult = {
        height: height,
        weight: weight,
        BMI: BMI,
        judge: judge,
        sidebar: sidebar,
        time: time,
    }

    data.push(totalResult); // 將資料物件 存入array 
    update(data); // 將資料更新
    localStorage.setItem('BMIdata', JSON.stringify(data)); // 存到 localstage

    console.log(time);
    console.log(BMI);
    console.log(judge);
    console.log(sidebar);

    changeBtn();//變更btn樣式


}



// 更新內容
function update(item) {
    var str = '';
    var len = item.length;
    for (var i = 0; i < len; i++) {
        str += `<ul>
                    <li class="sidebar ${item[i].sidebar} judge">${item[i].judge}</li>
                    <li class="BMI"><i>BMI</i><p>${item[i].BMI}</p></li>
                    <li class="weight"><i>weight</i><p>${item[i].weight}</p><b>kg</b></li>
                    <li class="height"><i>height</i><p>${item[i].height}</p><b>cm</b></li>
                    <li class="time">${item[i].time}</li>
                    <li class="close"><i class="icon-close2"></i></li>
                </ul>`;
        
    }
    list.innerHTML = str;
}



//變更btn樣式
function changeBtn() {
    //更新btnStatus內容
    var str = `<p class="btnBMI">${BMI}</p>
            <p class="BMI">BMI</p>
            <p class="judge">${judge}</p>
            <a href="#" id="refreshBtn"><i class="icon-arrow-back"></i></a>`
    btnStatus.innerHTML = str;
    //建立DOM
    var btnBMI = document.querySelector('.btnBMI');
    var refreshBtn = document.querySelector('#refreshBtn');
    //判定色調
    // switch (judge) {
    //     case '體重過輕':
    //         btnStatus.setAttribute('style', 'color:#31BAF9');
    //         btnBMI.setAttribute('style','border: 6px solid #31BAF9');
    //         refreshBtn.setAttribute('style', 'background-color: #31BAF9');
    //         break;
    //     case '理想範圍':
    //         btnStatus.setAttribute('style', 'color:#86D73F');
    //         btnBMI.setAttribute('style','border: 6px solid #86D73F');
    //         refreshBtn.setAttribute('style', 'background-color: #86D73F');
    //         break;
    //     case '體重過重':
    //         btnStatus.setAttribute('style', 'color:#FF982D');
    //         btnBMI.setAttribute('style','border: 6px solid #FF982D');
    //         refreshBtn.setAttribute('style', 'background-color: #FF982D');
    //         break;
    //     case '輕度肥胖':
    //         btnStatus.setAttribute('style', 'color:#FF6C03');
    //         btnBMI.setAttribute('style','border: 6px solid #FF6C03');
    //         refreshBtn.setAttribute('style', 'background-color: #FF6C03');
    //         break;
    //     case '中度肥胖':
    //         btnStatus.setAttribute('style', 'color:#FF6C03');
    //         btnBMI.setAttribute('style','border: 6px solid #FF6C03');
    //         refreshBtn.setAttribute('style', 'background-color: #FF6C03');
    //         break;
    //     case '重度肥胖':
    //         btnStatus.setAttribute('style', 'color:#FF1200');
    //         btnBMI.setAttribute('style','border: 6px solid #FF1200');
    //         refreshBtn.setAttribute('style', 'background-color: #FF1200');
    //         break;
    // }
    //設定重新整理功能
    document.getElementById('refreshBtn').onclick = function (e) {
        e.preventDefault();
        window.location.reload();
    }
}



// 刪除內容
function delBMI(e) {
    // 取消預設連結行為
    e.preventDefault();
    if (e.target.nodeName !== 'I') { return };
    var index = e.target.dataset.index;
    data.splice(index, 1);
    update(data);
    localStorage.setItem('BMIdata', JSON.stringify(data));
}