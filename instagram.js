if (window.location.host === 'www.instagram.com') {
	chrome.storage.onChanged.addListener(() => {
		chrome.storage.local.get([ 'task', 'on_off' ], (data) => {
			if (data.on_off === 'on' && data.task.next === 'instagram') {
				console.log('redirecionando: ',data.task.url)
				window.location.href = data.task.url
			}
		})
	})
}

window.addEventListener('load', () => {
	chrome.storage.local.get(['task', 'on_off', 'delayTask'], (data) => {
		if (data.on_off === 'on' && data.task.next === 'instagram') {

			function Finish_Task() {
				setTimeout(() => {
					var task = {
	   					next: 'dizu',
						url: null,
					    finishedTasks: data.task.finishedTasks + 1,
						typeTask: null
					}

					chrome.storage.local.set({ task })					
				}, 15000)
			}

			if (data.task.typeTask === 'Seguir') {
				var Seguir = document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div > div > div > span > span.vBF20._1OSdk > button")

				if (Seguir) {
					if (Seguir.innerText === 'Seguir') {
						Seguir.click()
						Finish_Task()
					} else {
						Finish_Task()
						console.log('Já estou seguindo. Finalizando task...')
					}					
				} else {
					alert('Botão de seguir não encontrado, finalizando task...')
				}


			} else if (data.task.typeTask === 'Curtir') {
				var Curtir = document.querySelector("#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button")

				if (Curtir) {
					Curtir.click()
					Finish_Task()
				} else {
					alert('Botão de curtir não encontrado. FInalizando Task...')
					Finish_Task()
				}
			} else {
				alert('Erro no sistema da extensão, por favor atualize as paginas e ligue-a novamente.')
				chrome.storage.local.set({ on_off: 'off' })
			}
		}
	})
})