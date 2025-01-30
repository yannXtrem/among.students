class View {
    constructor() {
        this.app = document.getElementById('app');
        this.mainView = document.getElementById('main-view');
        this.notificationsPopup = document.getElementById('notifications-popup');
        this.notificationsList = document.getElementById('notifications-list');
    }

    renderMenu(menuItems) {
        const menuHTML = `
            <div class="menu">
                ${menuItems.map(item => `
                    <div class="tile" data-id="${item.id}">
                        <span>${item.emoji}</span>
                        <p>${item.title}</p>
                    </div>
                `).join('')}
            </div>
        `;
        this.mainView.innerHTML = menuHTML;
    }

    renderNotifications(notifications) {
        this.notificationsList.innerHTML = notifications.map(notification => `
            <li>${notification.message}</li>
        `).join('');
    }

    showNotificationsPopup() {
        this.notificationsPopup.style.display = 'flex';
    }

    hideNotificationsPopup() {
        this.notificationsPopup.style.display = 'none';
    }
}
