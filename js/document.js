function getDocumentStructure()
{
    const Header=document.getElementById('header-container');
    var Contents=new Array();
    for(var i=1;i<=6;i++)
    {
        var tmp=document.getElementsByTagName('h'+i.toString());
        for(var j=0;j<tmp.length;j++)
            if(tmp[j].compareDocumentPosition(Header)==2)Contents.push(tmp[j]);
    }
    Contents.sort((a,b)=>{return a.compareDocumentPosition(b)==2?1:-1;});
    return Contents;
}
var IndexNodeTemplate=document.createElement('div');
IndexNodeTemplate.classList.add('article-index-node');
function newTitleNode(ori)
{
    var rt=document.createElement(ori.nodeName);
    rt.textContent=ori.textContent;
    rt.classList.add('article-index-text');
    rt.onclick=function(){
        Velocity(ori,"scroll",{duration:'fast'});
    }
    return rt;
}
function generateIndex(titles,st)
{
    var Nodenow=IndexNodeTemplate.cloneNode(0),i;
    for(i=st;i<titles.length&&titles[i].nodeName>=titles[st].nodeName;i++)
    {
        if(titles[i].nodeName!=titles[st].nodeName)
        {
            var now=i;
            Nodenow.appendChild(generateIndex(titles,i));
            while(i<titles.length&&titles[i].nodeName>=titles[now].nodeName)i++;//rubbish O(n^2)!!!
            i--;
        }
        else if(titles[i].nodeName==titles[st].nodeName)
        {
            Nodenow.appendChild(newTitleNode(titles[i]));
        }
    }
    return Nodenow;
}
document.getElementById('article-index').appendChild(generateIndex(getDocumentStructure(),0));
