export function requestApi(credentials) {
	 return new Promise((resolve, reject) => {
        const config = {
	        method: credentials.method,
	        url: credentials.url,
	        params: credentials.params
	    } 
        axios(config)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error.response.data.errors)
            });
    });
}