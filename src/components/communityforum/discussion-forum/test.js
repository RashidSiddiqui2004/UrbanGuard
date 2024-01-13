

function findIndicesOfAtSymbol(str) {
    const indices = [];
    let index = str.indexOf('@');
    while (index !== -1) {
        indices.push(index);
        index = str.indexOf('@', index + 1);
    }
    return indices;
}


const getformattedReply = (reply) => {

    let message = reply;

    const indices = findIndicesOfAtSymbol(reply);

    indices.forEach(element => {
       message[] 
    });
    
}