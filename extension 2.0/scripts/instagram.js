
if (window.location.host === "www.instagram.com") {

	function executeTask(taskType) {
		chrome.storage.local.get(['delayTime', 'on_off'], (data) => {
			if (data.on_off === 'on') {
				var time = Math.floor(Math.random() * ((data.delayTime + 5 - data.delayTime) + 1)) + data.delayTime
				console.log(`Sorteando numero entre ${data.delayTime} e ${data.delayTime + 5} = ${time}`)

				if (taskType === "Seguir") {
					var Seguir = document.querySelector("#react-root > section > main > div > header > section button")

					if (Seguir) {
						setTimeout(() => {
							Seguir.click()
							setTimeout(async() => {
								var block = document.querySelector("body > div.RnEpo.Yx5HN > div > div")
								if (block) await chrome.runtime.sendMessage({ type: "error", message: "Infelizmente ao tentar realizar a ultima tarefa sua conta foi bloqueada. A extensão foi parada para não comprometer sua conta." })
							}, 2000)
						}, 2000)

						//============= TO Next Task ==============
							setTimeout(async () => {
								await chrome.runtime.sendMessage({type: "Finish one Task in Instagram"})
								console.log('NEXT')
							}, time * 1000)
						//============= TO Next Task ==============


						//Console Count Time
							var CountTime = 0
							var timeCount = setInterval(() => {
								CountTime++
								if (CountTime >= time) {
									clearInterval(timeCount)
								}
								console.log(CountTime)
							}, 1000)
						//Console Count Time

					} else {
						chrome.runtime.sendMessage({ type: "error", message: "Botão de Seguir não encontrado" })
					}
				} else if (taskType === "Curtir") {
					var Curtir = document.querySelector("#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button")

					if (Curtir) {
						setTimeout(() => { 
							Curtir.click()
							setTimeout(async() => {
								var block = document.querySelector("body > div.RnEpo.Yx5HN > div > div")
								if (block) await chrome.runtime.sendMessage({ type: "error", message: "Infelizmente, ao tentar realizar a ultima tarefa sua conta foi bloqueada. A extensão foi parada para não comprometer sua conta." })
							}, 2000)							
						}, 2000)

						//============= TO Next Task ==============
							setTimeout(async () => {
								await chrome.runtime.sendMessage({type: "Finish one Task in Instagram"})
								console.log('NEXT')
							}, time * 1000)
						//============= TO Next Task ==============

						//Console Count Time
							var CountTime = 0
							var timeCount = setInterval(() => {
								CountTime++
								if (CountTime >= time) {
									clearInterval(timeCount)
								}
								console.log(CountTime)
							}, 1000)
						//Console Count Time

					} else {
						chrome.runtime.sendMessage({ type: "error", message: "Botão de Curtir não encontrado" })
					}
				} else {
					chrome.runtime.sendMessage({ type: "error", message: "Nenhum tipo de tarefa encontrado, erro na linha 48 do Instagram.js. Extensão parada." })
				}
			}
		})
	}

	window.addEventListener('load', () => {
		chrome.storage.local.get(['countFinishedTasks', 'taskType'], (data) => {
			if (data.countFinishedTasks === 0) {
				chrome.runtime.sendMessage({type: "Loaded Instagram"})
				console.log('Loaded Instagram')
			} else {
				console.log('Count finished > 0')
				executeTask(data.taskType)
			}
		})		
	})

	chrome.storage.onChanged.addListener((changes) => {
		if (changes.href && changes.href.newValue != null && typeof changes.href.newValue != 'undefined') {
			window.location.href = changes.href.newValue
		}
	})
}
