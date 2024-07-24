const getUsers = async ()=>{
    const {data} = await axios.get('https://blogsystem2.onrender.com/users');
}