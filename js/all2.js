
// 輸入 weight height 計算 BMI
// if 判斷結果 並改變狀態
// 結果 push 到 array 裡 再存到 localstorg 
// 每新增,刪除一筆要 更新資料
// 點擊 click  將 localstorg 結果顯示在網頁上


var btn = document.querySelector('.default');
var list = document.querySelector('.list');
// 畫面顯示出資料若沒資料(第一筆)則 回傳空陣列
var data = JSON.parse(localStorage.getItem('bmiData')) || [];
btn.addEventListener('click',BMI,false);
list.addEventListener('click',delBmi,false);
// 更新的update
update(data)

// 計算 BMI
function BMI(e) {
    e.preventDefault();
    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value;
    var lightBar = "";
	var status = "";
	var m = (height)/100;
	var kg = weight;
    var BMI = (kg/(m*m)).toFixed(2); //四捨五入

// 輸入資料判斷
    if(BMI == "NaN") {
        alert('請輸入正確的數值!');
        return;
    }else if (height == '') {
        alert("您尚未輸入身高！");
        return;
    }else if (weight == '') {
        alert ("您尚未輸入體重！");
        return;
    }else if ( height > 300) {
        alert ("請重新輸入身高！");
        return;
    }else if (weight > 1000) {
        alert ("請重新輸入體重！");
        return;
    }
    
// 計算日期時間s
    var date = new Date(); // 時間物件
    var MM = (date.getMonth()+1);  // 從0開始 +1（0~11月）
    var DD = date.getDate();
    var YY = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var time = YY+'-'+MM+'-'+DD+' '+hours+':'+ min+':'+sec;


// if 判斷 並設定屬性
// 設定 button 裡面的 class 屬性為 blue
    if(BMI<18.5) {
        status = '過輕';
        lightBar = 'blue';
        btn.setAttribute("class","blue");  
    }else if(18.5<=BMI && BMI<24) {
        status = '理想';
        lightBar = 'green';
        btn.setAttribute("class","green");
    }else if(24<=BMI && BMI<27) {
        status = '過重';
        lightBar = 'orange1';
        btn.setAttribute("class","orange1");
    }else if(27<=BMI && BMI<30) {
        status = '輕度肥胖';
        lightBar = 'orange2';
        btn.setAttribute("class","orange2");
    }else if(30<=BMI && BMI<35) {
        status = '中度肥胖';
        lightBar = 'orange2';
        btn.setAttribute("class","orange2");
    }else if(BMI>=35) {
        status = '重度肥胖';
        lightBar = 'red';
        btn.setAttribute("class","red");
    }

// 把 BMI 結果代入(改寫 btnStatus)
    document.querySelector('.value').textContent = BMI;
    document.querySelector('.bmi').textContent = 'BMI';
    document.querySelector('.click').textContent = '';

// 組合成物件
    var bmiAll = {
		lightBar: lightBar,  
		status: status,
		height: height,
		weight: kg,
		BMI: BMI,
        time: time,
    };

// 將資料物件 存入array
    data.push(bmiAll);
// 將資料更新  
    update(data);
// 存到 localstage
    localStorage.setItem('bmiData',JSON.stringify(data));
}

// 更新內容
function update(item){
   var str ='';
   var len = item.length;
    for(var i = 0;i<len;i++){
        str+= '<li><div class="lightBar" id ='+ item[i].lightBar +'> </div><div class="status">'+item[i].status+'</div><div class="box"><div class="bmiName">BMI</div> <div class="value">'+item[i].BMI+'</div></div><div class="box"><div class="bmiName">weight</div><div class="value">'+item[i].weight+'kg</div></div><div class="box"><div class="bmiName">height</div><div class="value">'+item[i].height+'cm</div></div><div class="date">'+item[i].time+'</div><img src="https://github.com/Jimmywei01/Pratice/blob/master/img.jpg?raw=true" alt="" data-index=' + i + '></li>';
    }
    list.innerHTML = str;
}

// 刪除內容
function delBmi(e){
    // 取消預設連結行為
    e.preventDefault();
    if(e.target.nodeName !=='IMG'){return};
    var index = e.target.dataset.index; 
    data.splice(index,1);
    update(data);
    localStorage.setItem('bmiData',JSON.stringify(data));
}

