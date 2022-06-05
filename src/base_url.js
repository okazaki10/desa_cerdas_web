import axios from "axios";

export const SERVER = 'https://api.desa-tambakrejo.com'
//export const SERVER = 'http://192.168.1.5:10'
const axiosFetch = axios.create({
    baseURL: SERVER + "/api",
});
export const fetchError = (resp) => {
    console.log(JSON.stringify(resp.errors))
    let err = ""
    for (let i in resp.errors) {
        err += resp.errors[i][0] + "\n"
    }
    return err
}
export const formatPrice = (price) => {
    return '$ ' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
export default axiosFetch