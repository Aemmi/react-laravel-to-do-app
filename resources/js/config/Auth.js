
export const validateUser = () => {
    // axios.get('/api/auth/user')
    // .then(response => {
    //     console.log(response);
    //     // Handle the successful response data
    //     if(response.status == 'success'){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // })
    // .catch(error => {
    //     // Handle any errors
    //     console.error(error);
    // });

    return localStorage.getItem('token');

}
