var toggle = document.querySelector('.toggle')

//============= LIGA e DESLIGA =============
var on = document.querySelector('.on')
var off = document.querySelector('.off')
var ActualState = document.querySelector('.ActualState')

toggle.addEventListener('click', async () => {
	var [tab] = await chrome.tabs.query({ url: "https://dizu.com.br/painel/conectar" })
	if (typeof tab === 'undefined') {
		chrome.runtime.sendMessage({ type: "error", message: "Para poder Iniciar a extensão, você precisa abrir a pagina Conectar e Ganhar do Dizu!" })
		chrome.storage.local.set({ on_off: 'off' })
	} else {
		chrome.storage.local.get('on_off', (data) => {
			if (data.on_off === 'on') { // DESLIGADO
				chrome.storage.local.set({ on_off: 'off' })

				ActualState.innerText = 'Extensão Desligada'
				ActualState.style.color = 'red'

				on.style.transform = 'scale(0)'
				off.style.transform = 'scale(1)'
			} else { // LIGADO
				chrome.storage.local.set({ on_off: 'on' })

				chrome.storage.local.set({ countFinishedTasks: 0 })

				ActualState.innerText = 'Extensão Ligada'
				ActualState.style.color = 'blue'
				on.style.transform = 'scale(1)'
				off.style.transform = 'scale(0)'
			}
		})
	}
})

chrome.storage.local.get('on_off', (data) => {
	if (data.on_off === 'on') {
		ActualState.innerText = 'Extensão Ligada'
		ActualState.style.color = 'blue'

		on.style.transform = 'scale(1)'
		off.style.transform = 'scale(0)'
	} else {
		ActualState.innerText = 'Extensão Desligada'
		ActualState.style.color = 'red'
		
		on.style.transform = 'scale(0)'
		off.style.transform = 'scale(1)'
	}
})
//============= LIGA e DESLIGA =============


// Notification Sound
	

// Notification Sound


//============== DROPDOWN ================
var handleDropdown = document.querySelector('.configsIcons')
var dropdown = document.querySelector('.dropdown')

handleDropdown.addEventListener('click', () => {
	chrome.storage.local.get('on_off', (data) => {
		if (data.on_off === 'on') {
			chrome.runtime.sendMessage({ type: "error", message: "Para configurar a extensão, primeiro deligue-a." })
		} else {
			if (getComputedStyle(dropdown, null).marginLeft === '-320px') {
				dropdown.style.marginLeft = "0px"
				handleDropdown.style.transform = 'translateX(-100%) rotate(45deg)'
			} else {
				dropdown.style.marginLeft = "-320px"
				handleDropdown.style.transform = 'translateX(-100%) rotate(-45deg)'
			}
		}
	})
})
//============== DROPDOWN ================


// ============= CONFIGURAÇÕES ===============
var subtimeIdleTime = document.querySelector('.submitIdleTime')
var inputIdleTime = document.querySelector('#idleTimeInput')
var inputLimitTasks  = document.querySelector('#LimitTasksInput')

chrome.storage.local.get(['delayTime', 'LimitTasks'], (data) => {
	if (data.delayTime) {
		inputIdleTime.value = data.delayTime
	} else {
		chrome.storage.local.set({ delayTime: 30 })
		inputIdleTime.value = 30
	}

	if (data.LimitTasks) {
		inputLimitTasks.value = data.LimitTasks
	} else {
		chrome.storage.local.set({ LimitTasks: 9999999 })
		inputLimitTasks.value = 0
	}
})

subtimeIdleTime.addEventListener('click', () => {
	var inputIdleTime = document.querySelector('#idleTimeInput')
	var inputLimitTasks  = document.querySelector('#LimitTasksInput')

	var errorIdleTime = document.querySelector('.ErrosIdleTime')
	var SucessIdleTime = document.querySelector('.SucessIdleTime')

	if (inputIdleTime.value === "") {
		errorIdleTime.innerText = " - Por favor insira um tempo válido."
		SucessIdleTime.innerText = ""
	}

	else if (Number(inputIdleTime.value) < 10) {
		errorIdleTime.innerText = " - Para a segurança da sua conta, o tempo mínimo entre cada tarefa é de 10 Segundos."
		SucessIdleTime.innerText = ""
	}

	else if (inputLimitTasks.value === "") {
		errorIdleTime.innerText = " - Por favor insira uma quantidade de tarefas válidas."
		SucessIdleTime.innerText = ""
	} else {

		chrome.storage.local.set({ delayTime: Number(inputIdleTime.value), LimitTasks: Number(inputLimitTasks.value) === 0 ? 9999999 : Number(inputLimitTasks.value) })
		errorIdleTime.innerText = ""
		SucessIdleTime.innerText = "Alterações Salvas!"

		setTimeout(() => {
			SucessIdleTime.innerText = ""
		}, 2000)

	}
})
// ============= CONFIGURAÇÕES ===============
