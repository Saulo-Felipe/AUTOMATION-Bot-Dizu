chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === "error") {
		chrome.notifications.create(`${Date.now()}`, {
		    type: 'basic',
		    iconUrl: 'Images/logotipo.png',
		    title: 'Erro encontrado!',
		    message: `${message.message}`,
		})
		chrome.storage.local.set({ on_off: 'off' })
	} else if (message.type === "FinishedTasks") {
		chrome.notifications.create(`${Date.now()}`, {
		    type: 'basic',
		    iconUrl: 'Images/logotipo.png',
		    title: 'As tarefas dessa conta acabaram! :(',
		    message: `${message.message}`,
		})
		chrome.storage.local.set({ on_off: 'off' })
	} else if (message.type === "Task limit exceeded") {
		chrome.storage.local.get('LimitTasks', (data) => {
			chrome.notifications.create(`${Date.now()}`, {
			    type: 'basic',
			    iconUrl: 'Images/logotipo.png',
			    title: 'Tarefas Concluídas 🚀',
			    message: `Limite de ${data.LimitTasks} tarefas foi concluido com sucesso ✅. A extensão foi parada.`,
			})
			chrome.storage.local.set({ on_off: 'off' })
		})
	}
})


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.storage.local.get('on_off', async(data) => {
		if (data.on_off === 'on') {
			if (changeInfo.url && changeInfo.url.indexOf("www.instagram.com") != -1) {
				var [tab] = await chrome.tabs.query({ url: "https://www.instagram.com/", pinned: true, index: 0})
				if (tab && tab.id != tabId) {
					chrome.tabs.remove(tabId)
					chrome.notifications.create(`${Date.now()}`, {
					    type: 'basic',
					    iconUrl: 'Images/logotipo.png',
					    title: 'ATENÇÃO!',
					    message: `Para evitar provaveis erros, enquanto a extensão estiver ligada só é permitido que uma aba do instagram esteja aberta. Se você deseja acessar seu instagram, desligue a extensão antes.`,
					})	
				}			
			}
		}
	})
})

chrome.storage.onChanged.addListener((changes) => {
	if (changes.on_off && changes.on_off.newValue === 'on') {

		//Initialize Extension
		async function InitializeDizuPage() {

			//Close all instagram tabs
		  	var tabInstagram = await chrome.tabs.query({ url: "https://www.instagram.com/*" });
		  	for (var c=0; c < tabInstagram.length; c++) {
		  		chrome.tabs.remove(tabInstagram[c].id)
		  	}
		  	await chrome.tabs.create({index: 0, url: "https://www.instagram.com/", pinned: true})
			//Close all instagram tabs ^

			var [tab] = await chrome.tabs.query({ url: "https://dizu.com.br/painel/conectar" })

			await chrome.tabs.update(tab.id, { pinned: true })
			await chrome.tabs.move(tab.id, { index: 1 })

		}
		InitializeDizuPage()

	} else if (changes.on_off && changes.on_off.newValue === 'off') {
		chrome.storage.local.set({ href: null, taskType: null, countFinishedTasks: 0 })
	}
})

chrome.runtime.onMessage.addListener((message) => {
	chrome.storage.local.get('on_off', async (data) => {
		if (data.on_off === 'on') {
			var [tab] = await chrome.tabs.query({ url: "https://dizu.com.br/painel/conectar" })

			console.log('recebi msg: ', message)
			if (message.type === "Loaded Instagram" || message.type === "Finish one Task in Instagram") {
				console.log('enviando msg')
				chrome.tabs.sendMessage(tab.id, "inicie a extensão")
			}
		}
	})
})