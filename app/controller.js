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

        // Écouteur pour le bouton des notifications
        document.getElementById('notifications-button').addEventListener('click', () => this.showNotifications());

        // Écouteur pour fermer la popup
        document.getElementById('close-popup').addEventListener('click', () => this.view.hideNotificationsPopup());
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
