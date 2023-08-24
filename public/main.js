function hideLine(id){
    document.querySelectorAll('#'+id).forEach(ele => ele.style.display = "none");
    //document.getElementById(id).style.visibility = "visible";   
}