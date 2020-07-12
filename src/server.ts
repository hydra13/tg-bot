import * as http from 'http';

export function createServer() {
	const port = process.env.PORT || 80;
	http.createServer((req, res) => {
		console.log('starting http server');
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end('<h1>Telegram Bot by Hydra13</h1>', 'utf-8');
	}).listen(port);
	console.log(`Server running at ${port} port`);
}
