window.addEventListener('load', () => {
	if (window.location.host === 'dizu.com.br') {

		var task = {
	   		next: null,
			url: null,
		    finishedTasks: 0,
			typeTask: null			
		}


		chrome.storage.local.set({ task, on_off: 'off' })
	}
})

chrome.storage.onChanged.addListener(() => {
	chrome.storage.local.get(['task', 'on_off'], (data) => {
		if (data.on_off === 'on' && data.task.next === 'dizu' && window.location.host === 'dizu.com.br') {
			console.log('Iniciando')

			var Iniciar = document.querySelector("#iniciarTarefas")


			if (Iniciar) {			
				var StartTime =  setInterval(() => {
					var Ver_Link = document.querySelector("#conectar_step_4 > p")

					if (Ver_Link) {
						var Href = document.querySelector("#conectar_step_4").href
						document.querySelector("#conectar_step_4").removeAttribute('href')
						var taskType = document.querySelector("body > div.container-fluid > div > div.content-body.col-sm-12.col-xs-12.col-lg-10.padd0 > div:nth-child(4) > div > div.row > div.col-sm-6.col-lg-6.col-xs-12.tarefasLista > div.box_user.tarefa.bg-white.sombra.Bradius15.col-sm-6.col-xs-12.col-lg-12.padd1.paddB2.marginT2.marginB2 > div.btn_site.text-center.padd1 > div > p").innerText

						Ver_Link.click()

						setTimeout(() => {
							document.querySelector("#conectar_step_5 > button").click()
						}, 2000)

						var task = {
					   		next: 'instagram',
							url: Href,
						    finishedTasks: data.task.finishedTasks,
							typeTask: taskType
						}

						chrome.storage.local.set({ task })

						clearInterval(StartTime) // Finaliza Task

					} else {
						var SemTarefa = document.querySelector("body > div.container-fluid > div > div.content-body.col-sm-12.col-xs-12.col-lg-10.padd0 > div:nth-child(4) > div > p.marginT2.semTarefas.hide")
						if (getComputedStyle(SemTarefa , null).display === 'block') {
							alert('Todas as tarefas acabacam, a extensão foi parada!')
							var task = { next: null, url: null, finishedTasks: 0, typeTask: null }							
							chrome.storage.local.set({ task, on_off: 'off' })
						} else {
							console.log('Tarefa não encontrada, Procurando novamente...')
							setTimeout(() => { Iniciar.click() }, 3000)
						}
					}

				}, 1000)

				Iniciar.click()
			} else {
				alert('Você não está na pagina Conectar e Ganhar do Dizu')
				var task = { next: null, url: null, finishedTasks: 0, typeTask: null }
				chrome.storage.local.set({ task, on_off: 'off' })
			}
		}
	})
})




