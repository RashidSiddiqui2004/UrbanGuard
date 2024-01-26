
const emailSet = new Set(['rashid.siddiqui.ug22@nsut.ac.in', 'rahul7806@gmail.com', 'user3@gmail.com']);

function isRegisteredUser(emailID) {  
 
    if (emailSet.has(emailID)) {
        return true;
    } 
    
    return false;
}


export default isRegisteredUser;