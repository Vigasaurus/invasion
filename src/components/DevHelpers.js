import React from 'react';
import { Button } from 'antd';
import axios from 'axios';

const loginQuick = username => {
	axios
		.post('/account/signin', {
			username,
			password: 'snipsnap',
		})
		.then(res => {
			if (window.location.pathname === '/observe') {
				window.location.pathname = '/game';
			} else {
				window.location.reload();
			}
		})
		.catch(res => {
			console.log('something went wrong');
		});
};

const DevHelpers = () => (
	<section className="devhelpers-container">
		<Button
			onClick={() => {
				loginQuick('Sombra');
			}}
		>
			Sombra
		</Button>
		<Button
			onClick={() => {
				loginQuick('Reinhardt');
			}}
		>
			Reinhardt
		</Button>
		<Button
			onClick={() => {
				loginQuick('Mei');
			}}
		>
			Mei
		</Button>
		<Button
			onClick={() => {
				loginQuick('Ana');
			}}
		>
			Ana
		</Button>
		<Button
			onClick={() => {
				loginQuick('Orisa');
			}}
		>
			Orisa
		</Button>
		<Button
			onClick={() => {
				loginQuick('DVA');
			}}
		>
			DVA
		</Button>
		<Button
			onClick={() => {
				loginQuick('Junkrat');
			}}
		>
			Junkrat
		</Button>
		<Button
			onClick={() => {
				loginQuick('Winston');
			}}
		>
			Winston
		</Button>
		<Button
			onClick={() => {
				loginQuick('Doomfist');
			}}
		>
			Doomfist
		</Button>
		<Button
			onClick={() => {
				loginQuick('Zenyatta');
			}}
		>
			Zenyatta
		</Button>
	</section>
);

export default DevHelpers;
