let off = document.querySelector('.off')
let on = document.querySelector('.on')
let toggle = document.querySelector('.handleChange')
let textIsOn = document.querySelector('.isOn')
let borderBody = document.querySelector('body')
let html = document.querySelector('html')


chrome.storage.local.get('on_off', (data) => {

	on.style.transform   		= data.on_off === 'on' ? 'scale(1.0)'      	 : 'scale(0)' //Liga Extensão
	off.style.transform  		= data.on_off === 'on' ? 'scale(0)'        	 : 'scale(1.0)' //Desligar Extensão
	textIsOn.style.color 		= data.on_off === 'on' ? 'blue'            	 : 'red'
	textIsOn.innerText      	= data.on_off === 'on' ? 'Extensão Ligada' 	 : 'Extensão Desligada'
	borderBody.style.border    	= data.on_off === 'on' ? 'solid 1px blue' 	 : 'solid 1px red'
	borderBody.style.boxShadow 	= data.on_off === 'on' ? '0px 0px 10px blue' : '0px 0px 10px red'
	html.style.backgroundColor  = data.on_off === 'on' ? '#1b00ff21'         : '#ff000021'
})

toggle.addEventListener('click', () => {  // Liga e Desliga
	chrome.storage.local.get(['task', 'on_off'], (data) => {

		on.style.transform   		= data.on_off === 'off' ? 'scale(1.0)'        : 'scale(0)' //Liga Extensão
		off.style.transform  		= data.on_off === 'off' ? 'scale(0)'          : 'scale(1.0)' //Desligar Extensão
		textIsOn.style.color 		= data.on_off === 'off' ? 'blue'              : 'red'
		textIsOn.innerText   		= data.on_off === 'off' ? 'Extensão Ligada'   : 'Extensão Desligada'
		borderBody.style.border 	= data.on_off === 'off' ? 'solid 1px blue'    : 'solid 1px red'
		borderBody.style.boxShadow 	= data.on_off === 'off' ? '0px 0px 10px blue' : '0px 0px 10px red'
	    html.style.backgroundColor  = data.on_off === 'off' ? '#1b00ff21'         : '#ff000021'

		var task = {
	   		next: data.on_off === 'on' ? null : 'dizu',
			url: null,
		    finishedTasks: 0,
			typeTask: null
		}

		chrome.storage.local.set({ task, on_off: data.on_off === 'off' ? 'on' : 'off' })
	})
})







//Configs modal

var closeConfigs = document.querySelector('.icon-close')
var modelConfigs = document.querySelector('.configs')

closeConfigs.addEventListener('click', () => {
	modelConfigs.style.marginLeft = '-260px'
})

var activeConfigs = document.querySelector('.active-configs')

activeConfigs.addEventListener('click', () => {
	chrome.storage.local.get('on_off', (data) => {
		if (data.on_off != 'on') {
			modelConfigs.style.marginLeft = '0'
		} else {
			alert('Para configurar a extensão, primeiro desligue ela.')
		}
	})
})