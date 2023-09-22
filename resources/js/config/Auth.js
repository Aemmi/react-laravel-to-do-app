
export const validateUser = () => {

    var token = localStorage.getItem('token');
    console.log(token);
    if(token.length > 0){
        return true;
    }
    return false;

}
