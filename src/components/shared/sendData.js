export const sendDataToServer = async (url, data) => {
	data = JSON.stringify(data);
	let response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: data,
	});
	console.log('Послыем: ', data);
	let result = await response.json();
	if (response.ok) {
		console.log('Ответ сервера: ', result);
	}
	return result;
};
