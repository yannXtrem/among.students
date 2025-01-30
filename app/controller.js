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

        // Ecouteur pour les boutons d'action Help
        document.querySelectorAll('.help-button').forEach(button => {
            button.addEventListener('click', () => this.handleHelpButtonClick(button.dataset.id));
        });

        // Ecouteur pour les boutons d'action Mute
        document.querySelectorAll('.mute-button').forEach(button => {
            button.addEventListener('click', () => this.handleMuteButtonClick(button.dataset.id));
        });

        // Ecouteur pour le bouton de retour
        document.getElementById('back-to-main-button').addEventListener('click', () => this.backToMainView());

        // Écouteur pour le bouton de création de requêtes
        document.getElementById('create-request-button').addEventListener('click', () => this.view.showCreateRequestPopup());

        // Écouteur pour annuler la création de requêtes
        document.getElementById('cancel-request-button').addEventListener('click', () => this.view.hideCreateRequestPopup());

        // Écouteur pour soumettre le formulaire de création de requêtes
        this.view.requestForm.addEventListener('submit', (event) => this.handleCreateRequest(event));

        // Écouteurs pour les boutons du menu des requêtes
        document.getElementById('my-requests-button').addEventListener('click', () => this.showRequestsByFilter('my-requests'));
        document.getElementById('published-requests-button').addEventListener('click', () => this.showRequestsByFilter('published'));
        document.getElementById('expired-requests-button').addEventListener('click', () => this.showRequestsByFilter('muted'));

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
        console.log("Request type got : "+type);
        this.view.showRequestsView();
        const requests = this.model.getRequests(type);
        console.log("Requests : "+requests);
        this.view.renderRequests(requests, type);
    }

    handleHelpButtonClick(id) {
        this.model.updateRequestStatus(id, 'helping');
        console.log("Helping request with ID:", id);
    }

    handleMuteButtonClick(id) {
        this.model.updateRequestStatus(id, 'muted');
        console.log("Muting request with ID:", id);
    }

    backToMainView() {
        this.view.showMainView();
    }

    showRequests(type) {
        const requests = this.model.getRequests(type);
        this.view.renderRequests(requests, type);
    }

    showRequestsByFilter(filter, type) {
        const requests = this.model.getRequestsByFilter(filter, type);
        this.view.renderRequests(requests, type);
    }

    getRequestTypeById(id) {
        const menuItems = this.model.getMenuItems();
        const item = menuItems.find(item => item.id === parseInt(id));
        console.log("Item title : "+item.title);
        console.log("Item id : "+item.id);
        return this.model.getRequestType(item.id);
    }

    showNotifications() {
        const notifications = this.model.getNotifications();
        this.view.renderNotifications(notifications);
        this.view.showNotificationsPopup();
    }
}
