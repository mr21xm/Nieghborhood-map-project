
class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2"
	}
//authentication from the API to fetch.
	static auth() {
		const keys = {
			client_id: "EQVO2RJ141U05N3F0MKXBBHELAZ1NIISMWGFVHCIR2COZQYR",
			client_secret: "VFTO4RVG0WLAW2TVZ4VSQ2HTEU4W2V4355MI5JVUWNVOUTGZ",
			v: "20190205"
		};

		return Object.keys(keys)
		.map(key => `${key}=${keys[key]}`)
		.join("&");
	}

	static urlBuilder(urlPrams) {
		if(!urlPrams){
			return "";
		}
		return Object.keys(urlPrams)
		.map(key => `${key}=${urlPrams[key]}`)
		.join("&")

	}

	static headers() {
		return { 
			Accept: "application/json"
		};
	}
	static simpleFetch(endPoint,method,urlPrams) {
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
			urlPrams
			)}`,
			requestData
			).then(res => res.json());
	}
}


//fetches data from the API to search or details or photos.
export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch("/venues/search","GET",urlPrams);
	}

	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET");
	}

	static getVenuePhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}