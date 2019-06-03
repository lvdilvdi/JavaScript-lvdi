var startBtn=document.getElementById('btn');
var box=document.getElementById('box');
var flagBox=document.getElementById('flagBox');
var alertBox=document.getElementById('alertBox');
var alertImg=document.getElementById('alertImg');
var closeBtn=document.getElementById('close');
var score=document.getElementById('score');
var minesNum;
var mineOver;
var block;
var mineMap=[];
var startgame=true;
var starttime;
var endtime;
var usetime=null;

bindEvent();

function bindEvent(){
    starttime=new Date().getTime();
    startBtn.onclick=function(){
        if(startgame){
            box.style.display='block';
        flagBox.style.display='block';
        
        init();
        startgame=false;
        }

       
    }

    //取消右键
    box.oncontextmenu=function(){
        return false;
    }

    box.onmousedown=function(e){
        var event=e.target;
        if(e.which===1){
            leftClick(event);
        }else if(e.which===3){
            rightClick(event);
        }
    }

    closeBtn.onclick=function(){
        alertBox.style.display='none';
        flagBox.style.display='none';
        box.style.display='none';
        box.innerHTML='';
        startgame=true;
    }

}

function init(){
    minesNum=10;
    mineOver=10;
    score.innerHTML=mineOver;

    for(var i=0;i<10;i++){

        for(var j=0;j<10;j++){

            var con=document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id',i+'-'+j);
            box.appendChild(con);
            mineMap.push({mine:0});


        }

    }

    block=document.getElementsByClassName('block');

    while(minesNum){
        var mineIndex= Math.floor(Math.random()*100);
        if(mineMap[mineIndex].mine===0){
            mineMap[mineIndex]=1;

            block[mineIndex].classList.add('isLei');
            minesNum--;
        }
    }
}

function leftClick(dom){
    if(dom.classList.contains('flag')){
        return;
    }
    var isLei=document.getElementsByClassName('isLei');
    if(dom && dom.classList.contains('isLei')){

        console.log('gameover');

        for(var i=0;i<isLei.length;i++){
            isLei[i].classList.add('show');
        }
        alertBox.style.display='block';
        alertImg.style.backgroundImage='url("img/gameover.jpg")';
        usetime=86300000;
    }else{

        var n=0;
        var posArr=dom && dom.getAttribute('id').split('-');
        var posX=posArr && +posArr[0];
        var posY=posArr && +posArr[1];
        dom && dom.classList.add('num');
        for(var i=posX-1;i<=posX+1;i++){
            for(var j=posY-1;j<=posY+1;j++){
               var aroundBox = document.getElementById(i+'-'+j);
                if(aroundBox && aroundBox.classList.contains('isLei')){
                n++;
                }
           
            }

        }
        dom && (dom.innerHTML=n);
        if(n ===0){
            for(var i=posX-1;i<=posX+1;i++){
                for(var j=posY-1;j<=posY+1;j++){
                    var nearBox=document.getElementById(i+'-'+j);
                    if(nearBox && nearBox.length!=0){
                        if(!nearBox.classList.contains('check')){
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }

                }

            }

        }

    }

}
function rightClick(dom){
    if(dom.classList.contains('num')){
        return ;
    }

    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei')&&dom.classList.contains('flag')){
        mineOver--;
    }

    if(dom.classList.contains('isLei')&&!dom.classList.contains('flag')){
        mineOver++;
    }

    score.innerHTML=mineOver;
    if(mineOver===0){
        alertBox.style.display='block';
        alertImg.style.backgroundImage='url("img/success.jpg")'
        usetime= get_time_diff(starttime);
    }

}
function get_time_diff(time) {
    var diff = '';
    var time_diff = new Date().getTime() - time;
    alert(time_diff);
    return time_diff;
   }
function paihangbang(name){
    var str = window.location.search;
    if (str.indexOf(name) != -1) {
        var pos_start = str.indexOf(name) + name.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        if (pos_end == -1) {
        var name1=str.substring(pos_start);
        axios.put('http://localhost:4000/api/xiugai',{
				name:name1,
				time:usetime,
		}).then(function(response){
				console.log(response);
			}).catch(function(error){
				console.log(error);
			})
        
        
        
        window.location.href="../paihang.html?name="+name1+ "&" +"usetime="+usetime;
        } else {
        alert("没有此值~~");
        }
        }
}