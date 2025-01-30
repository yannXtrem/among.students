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

        // Écouteur pour le bouton de création de requêtes
        document.getElementById('create-request-button').addEventListener('click', () => this.view.showCreateRequestPopup());

        // Écouteur pour annuler la création de requêtes
        document.getElementById('cancel-request-button').addEventListener('click', () => this.view.hideCreateRequestPopup());

        // Écouteur pour soumettre le formulaire de création de requêtes
        this.view.requestForm.addEventListener('submit', (event) => this.handleCreateRequest(event));

        // Écouteurs pour les boutons du menu des requêtes
        document.getElementById('my-requests-button').addEventListener('click', () => this.showRequests('my-requests'));
        document.getElementById('published-requests-button').addEventListener('click', () => this.showRequests('published-requests'));
        document.getElementById('expired-requests-button').addEventListener('click', () => this.showRequests('expired-requests'));

        // Écouteur pour le bouton des notifications
        document.getElementById('notifications-button').addEventListener('click', () => this.showNotifications());

        // Écouteur pour fermer la popup
        document.getElementById('close-popup').addEventListener('click', () => this.view.hideNotificationsPopup());
    }

    handleCreateRequest(event) {
        event.preventDefault();

        // Récupérer les données du formulaire
        const type = document.getElementById('request-type').value;
        const description = document.getElementById('request-description').value;

        // Ajouter la requête au modèle (à implémenter dans le modèle)
        this.model.addRequest(type, description);

        // Masquer le formulaire
        this.view.hideCreateRequestPopup();

        // Afficher un message de succès (optionnel)
        alert('Requête créée avec succès !');
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

    showNotifications() {
        const notifications = this.model.getNotifications();
        this.view.renderNotifications(notifications);
        this.view.showNotificationsPopup();
    }
}
