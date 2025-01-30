class View {
    constructor() {
        this.app = document.getElementById('app');
        this.mainView = document.getElementById('main-view');
        this.requestsView = document.getElementById('requests-view');
        this.requestsContent = document.getElementById('requests-content');
        this.notificationsPopup = document.getElementById('notifications-popup');
        this.notificationsList = document.getElementById('notifications-list');
        this.createRequestPopup = document.getElementById('create-request-popup');
        this.requestForm = document.getElementById('request-form');
    }

    // Afficher le formulaire de création de requêtes
    showCreateRequestPopup() {
        this.createRequestPopup.classList.remove('hidden');
        setTimeout(() => {
            this.createRequestPopup.querySelector('div').classList.remove('translate-y-full');
        }, 10);
    }

    // Masquer le formulaire de création de requêtes
    hideCreateRequestPopup() {
        this.createRequestPopup.querySelector('div').classList.add('translate-y-full');
        setTimeout(() => {
            this.createRequestPopup.classList.add('hidden');
        }, 300);
    }

    // Afficher la vue des requêtes
    showRequestsView() {
        this.mainView.classList.add('hidden');
        this.requestsView.classList.remove('hidden');
    }

    // Afficher la vue principale
    showMainView() {
        this.requestsView.classList.add('hidden');
        this.mainView.classList.remove('hidden');
    }

    // Afficher les requêtes dans la vue des requêtes
    renderRequests(requests, type) {
        if(!type) type = sessionStorage.getItem('requestType');
        const requestsHTML = requests.map(request => `
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="font-bold">${request.title}</h3>
                <p class="text-sm text-gray-600">${request.description}</p>
                <p class="text-xs text-gray-500 mt-2">${type}</p>
                <span class="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                    <div data-id="${request.id}" class="help-button inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative">
                        🤝
                    </div>
                    <div data-id="${request.id}" class="mute-button inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative">
                        🔇
                    </div>
                </span>
            </div>
        `).join('');
        this.requestsContent.innerHTML = requestsHTML;
    }

    renderMenu(menuItems) {
        const menuHTML = menuItems.map(item => `
            <div class="tile bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-50 transition-colors" data-id="${item.id}">
                <span class="text-4xl">${item.emoji}</span>
                <p class="mt-2 text-sm text-gray-600">${item.title}</p>
            </div>
        `).join('');
        this.mainView.innerHTML = menuHTML;
    }

    renderNotifications(notifications) {
        this.notificationsList.innerHTML = notifications.map(notification => `
            <li class="p-2 border-b border-gray-200 last:border-b-0">${notification.message}</li>
        `).join('');
    }

    showNotificationsPopup() {
        this.notificationsPopup.classList.remove('hidden');
    }

    hideNotificationsPopup() {
        this.notificationsPopup.classList.add('hidden');
    }
}