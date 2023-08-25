function hideLine(id){
    document.querySelectorAll('#linha'+id).forEach(ele => ele.style.display = "none");
    document.querySelectorAll('#inv'+id).forEach(ele => ele.style.display = "Flex");
}

function showLine(id){
    document.querySelectorAll('#linha'+id).forEach(ele => ele.style.display = "");
    document.querySelectorAll('#inv'+id).forEach(ele => ele.style.display = "none");
}