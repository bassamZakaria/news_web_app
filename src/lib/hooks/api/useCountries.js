import {useEffect, useState} from "react";
import {getSource} from "../../api/NewsApi";

export default () => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await getSource();
				if (res && res.data && res.data.sources) {
					setCountries(res.data.sources);
				}
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	return countries;
}
