if (window.location.host === "dizu.com.br") {
	window.addEventListener('load', () => {
		chrome.storage.local.set({ href: null, taskType: null, countFinishedTasks: 0, on_off: 'off' })
	})

	chrome.runtime.onMessage.addListener((message) => {
		
		if (message === "inicie a extensão") {
			chrome.storage.local.get(['countFinishedTasks', 'LimitTasks'], (result) => {
				if (result.countFinishedTasks < result.LimitTasks) {
					var Iniciar = document.querySelector("#iniciarTarefas")

					if (Iniciar) {
						var selectAccount = document.querySelector("#instagram_id")

						if (selectAccount.selectedIndex === 0) {
							chrome.runtime.sendMessage({ type: "error", message: "Selecione uma conta do Instagram para continuar" })
							chrome.storage.local.set({ on_off: 'off' })
						} else {
							var timeTask = setInterval(() => {
								var Ver_Link = document.querySelector("#conectar_step_4 > p")

								if (Ver_Link) {
									var Href = document.querySelector("#conectar_step_4").href
									/* Remove Href */ document.querySelector("#conectar_step_4").removeAttribute('href')
									var taskType = document.querySelector("body > div.container-fluid > div > div.content-body.col-sm-12.col-xs-12.col-lg-10.padd0 > div:nth-child(4) > div > div.row > div.col-sm-6.col-lg-6.col-xs-12.tarefasLista > div.box_user.tarefa.bg-white.sombra.Bradius15.col-sm-6.col-xs-12.col-lg-12.padd1.paddB2.marginT2.marginB2 > div.btn_site.text-center.padd1 > div > p").innerText

									Ver_Link.click()
									setTimeout(() => { 
										document.querySelector("#conectar_step_5 > button").click()
										chrome.storage.local.get('countFinishedTasks', (data) => {
											console.log(data.countFinishedTasks)
										})
										chrome.storage.local.get('countFinishedTasks', (data) => {
											chrome.storage.local.set({ href: Href, taskType: taskType, countFinishedTasks: data.countFinishedTasks + 1 })								
										})
									}, 2000)
									
									clearInterval(timeTask) // Finaliza Task
								} else {
									var SemTarefa = document.querySelector("body > div.container-fluid > div > div.content-body.col-sm-12.col-xs-12.col-lg-10.padd0 > div:nth-child(4) > div > p.marginT2.semTarefas")
									if (getComputedStyle(SemTarefa , null).display === 'block') {
										chrome.runtime.sendMessage({ type: "FinishedTasks", message: "Acabaram as tarefas, troque sua conta do Instagram para continuar ganhando. :D" })
										clearInterval(timeTask) // Finaliza Task
									} else {
										Iniciar.click()
									}
								}
							}, 2000)
						}

					} else {
						chrome.runtime.sendMessage({ type: "error", message: "Botão de Iniciar não encontrado. Certifique-se de que está na pagina Conectar e Ganhar do Dizu. A extensão foi parada." })
						chrome.storage.local.set({ on_off: 'off' })
					}
				} else {
					chrome.runtime.sendMessage({ type: "Task limit exceeded"})
				}
			})
		}
	})
}