class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    init() {
        const menuItems = this.model.getMenuItems();
        this.view.renderMenu(menuItems);

        // Écouteurs d'événements pour les tuiles
        document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', () => this.handleTileClick(tile.dataset.id));
        });

        // Écouteurs pour les boutons du menu des requêtes
        document.getElementById('my-requests-button').addEventListener('click', () => this.showRequests('my-requests'));
        document.getElementById('published-requests-button').addEventListener('click', () => this.showRequests('published-requests'));
        document.getElementById('expired-requests-button').addEventListener('click', () => this.showRequests('expired-requests'));

        // Écouteur pour le bouton des notifications
        document.getElementById('notifications-button').addEventListener('click', () => this.showNotifications());

        // Écouteur pour fermer la popup
        document.getElementById('close-popup').addEventListener('click', () => this.view.hideNotificationsPopup());
    }

    handleTileClick(id) {
        const type = this.getRequestTypeById(id);
        this.view.showRequestsView();
        const requests = this.model.getRequests(type);
        this.view.renderRequests(requests, type);
    }

    showRequests(type) {
        const requests = this.model.getRequests(type);
        this.view.renderRequests(requests, type);
    }

    getRequestTypeById(id) {
        const menuItems = this.model.getMenuItems();
        const item = menuItems.find(item => item.id === parseInt(id));
        return item ? item.title.toLowerCase().replace(/ /g, '-') : '';
    }

    handleTileClick(id) {
        console.log(`Tuile cliquée : ${id}`);
    }

    showNotifications() {
        const notifications = this.model.getNotifications();
        this.view.renderNotifications(notifications);
        this.view.showNotificationsPopup();
    }
}
