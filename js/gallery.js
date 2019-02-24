var xmlhttp=new XMLHttpRequest(),imgbox=document.getElementById('image-box'),imgdisplay=document.getElementById('image-main'),imagelist=new Array(),prevbutton=document.getElementById('previous'),nextbutton=document.getElementById('next'),imageinfo=document.getElementById('description'),fullscreenbutton=document.getElementById('fullscreen'),fullscreenbox=document.getElementById('fullscreen-box'),fullscreendisplay=document.getElementById('fullscreen-main');
var nowdisplayed=-1,fullscreenstate=0;
xmlhttp.open("get","/resources/json/gallery.json",true);
xmlhttp.send();
const mediumSize=(url)=>{
    var tmp=String(url);
    //if(tmp.lastIndexOf('md')!=-1)return tmp;
    return tmp.replace('jpg','md.jpg');
}
const displayChange=(direction)=>{
    //console.log(nowdisplayed+direction,imagelist.length);
    if(nowdisplayed+direction<imagelist.length&&nowdisplayed+direction>=0)
    {
        nowdisplayed+=direction,setCookie('ZhYicImagedisplayed',nowdisplayed);
        if(nowdisplayed==imagelist.length-1)
            nextbutton.style.cursor='not-allowed';
        else if(nowdisplayed==0)
            prevbutton.style.cursor='not-allowed';
        else nextbutton.style.cursor=prevbutton.style.cursor='pointer';
    }
    imgdisplay.src=mediumSize(imagelist[nowdisplayed].url),imageinfo.innerText=imagelist[nowdisplayed].alt;
}
const fullscreenChange=()=>{
    fullscreenstate^=1;
    if(fullscreenstate)fullscreendisplay.src=imagelist[nowdisplayed].url,fullscreenbox.style.visibility='visible';
    else fullscreenbox.style.visibility='hidden';
}
xmlhttp.onreadystatechange=function()
{
    if(xmlhttp.readyState==4)
    {
        var jsontmp=JSON.parse(xmlhttp.responseText);
        //console.log(jsontmp);
        for(var i=0;i<jsontmp.pictures.length;i++)
            imagelist[i]=jsontmp.pictures[i];
        imgdisplay.src=mediumSize(imagelist[nowdisplayed=(parseInt(getCookie('ZhYicImagedisplayed')||0))].url),imageinfo.innerText=imagelist[0].alt;
        if(nowdisplayed==0)prevbutton.style.cursor='not-allowed';
        //console.log(getCookie('ZhYicImagedisplayed')||0);
    }
}
nextbutton.addEventListener('click',()=>{displayChange(1)});
prevbutton.addEventListener('click',()=>{displayChange(-1)});
fullscreenbutton.addEventListener('click',()=>{fullscreenChange();})
document.addEventListener('keydown',(event)=>{
    switch(event.keyCode){
        case 27:fullscreenChange();break;
        case 37:;
        case 38:displayChange(-1);break;
        case 39:;
        case 40:displayChange(1);break;
    }
}
);