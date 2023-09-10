let HiddenLines = document.querySelector('#hideShowAll');

function hideLine(id){
    document.querySelectorAll('#linha'+id).forEach(ele => ele.style.display = "none");
    document.querySelectorAll('#inv'+id).forEach(ele => ele.style.display = (HiddenLines.checked)?'none':'Flex');
}

function showLine(id){
    document.querySelectorAll('#linha'+id).forEach(ele => ele.style.display = "");
    document.querySelectorAll('#inv'+id).forEach(ele => ele.style.display = "none");
}

function hideOrShowLines(){
    if(HiddenLines.checked) {
        document.querySelectorAll('[id^=inv]').forEach(ele => {
            let id = (ele.id).replace('inv','');
            if(document.querySelector('#linha'+id).style.display == 'none') ele.style.display = "none";
        });

    } else {
        document.querySelectorAll('[id^=inv]').forEach(ele => {
            let id = (ele.id).replace('inv','');
            if(document.querySelector('#linha'+id).style.display == 'none') ele.style.display = "Flex";
        });
    }
}