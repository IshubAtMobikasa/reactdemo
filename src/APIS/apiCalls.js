import axios from "axios"

const apiCalls = {}
apiCalls.logIn = async (url, body, callBack = f => f) => {

    try {
        let {data, status} = await axios.post(url, {
            email: body.email,
            password: body.password
        })
        if (status === 200) {
          console.log(data,"from the apiCalls")
          callBack(data)
        } else {
            console.log("errro")
        }

    } catch (err) {
        console.log(err)
    }

}

apiCalls.register=async(url, body, callBack = f => f)=>{
    try {
        let {data, status} = await axios.post(url, {
            name:body.name,
            email: body.email,
            password: body.password
        })
        if (status === 200) {
            callBack(data)
        } else {
            console.log("errro")
        }

    } catch (err) {
        console.log(err)
    }

}

export default apiCalls