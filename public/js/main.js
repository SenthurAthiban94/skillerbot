// SignUp section

var mouseOverSignUp = function(){
    document.getElementById("facebook").classList.add("fb");
    document.getElementById("google").classList.add("gg");
    document.getElementById("linkedin").classList.add("ln");
    document.getElementById("signupImg").classList.remove("display-none");
    document.getElementById("signupImg").classList.remove("animate-signup-image-out");
    document.getElementById("signupImg").classList.remove("animate-signup-image-in");
    document.getElementById("signupImg").classList.add("animate-signup-image-in");
    document.getElementById("contactUsImg").classList.add("display-none");
    document.getElementById("overlay2").classList.remove("display-none");
    
    return;
}

var mouseOutSignUp = function(){
    document.getElementById("facebook").classList.remove("fb");
    document.getElementById("google").classList.remove("gg");
    document.getElementById("linkedin").classList.remove("ln");   
    document.getElementById("signupImg").classList.remove("animate-signup-image-in");
    document.getElementById("signupImg").classList.remove("animate-signup-image-out");
    document.getElementById("overlay2").classList.add("display-none");        
    return; 
}

// Description Section
var mouseOverDescription = function(){
    document.getElementById("signupImg").classList.add("display-none");
    document.getElementById("contactUsImg").classList.add("display-none");
    return;
}



// Customise Section

var mouseOverCustomise = function(){
    document.getElementById("contactUsImg").classList.remove("display-none");
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-in");
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-out");
    document.getElementById("contactUsImg").classList.add("animate-contact-image-in");
    document.getElementById("signupImg").classList.add("display-none");
    document.getElementById("overlay2").classList.remove("display-none");
    
    return;
}

var mouseOutCustomise = function(){
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-out");
    document.getElementById("contactUsImg").classList.remove("animate-contact-image-in");
    document.getElementById("overlay2").classList.add("display-none");    
    return; 
}

var shrinkMenu = function(){
    console.log("shrink")
    // document.getElementById("contactUsImg").classList.add("display-none"); 
    if (document.getElementById("overlay2")) 
        document.getElementById("overlay2").classList.remove("display-none");  
    if (document.getElementById("customize"))  
        document.getElementById("customize").classList.add("customize-bg");    
    setTimeout(function(){document.getElementById("line2").classList.add("display-none");},250);
    return;  
      
}

var expandMenu = function(){
    document.getElementById("line2").classList.remove("display-none");
    if (document.getElementById("customize"))
        document.getElementById("customize").classList.remove("customize-bg");   
    if (document.getElementById("line2"))     
        document.getElementById("line2").classList.add("expand-span");
    return;
}

var openMenu = function(){
    if (document.getElementById("menu"))
        document.getElementById("menu").classList.remove("display-none");    
    return;
}

var closeMenu = function(){
    if (document.getElementById("menu"))
        document.getElementById("menu").classList.add("display-none");    
    return;
}

var validate = function() {

    var selectList = document.getElementById("role");
    var roleIndex = selectList.selectedIndex;

    var roleString = "";
    if (parseInt(roleIndex) > 0) {
        roleString = selectList.options[selectList.selectedIndex].text;
    }
    else {
        alert("Please Select the Role");
        selectList.focus();
        return false;
    }
}

var validateUserResponse = function(){
    var dobValue;
    if (document.getElementById("BasicQuestion_DOB"))
        {
            dobValue = document.getElementById("BasicQuestion_DOB").value;
            // var pattern = /^([0-9]{2})/([0-9]{2})/([0-9]{4})$/
        }
}
