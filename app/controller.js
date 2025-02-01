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

        // Écouteur pour fermer la vue des négociations
        document.getElementById('close-negotiation-button').addEventListener('click', () => this.view.hideNegotiationView());

        // Écouteur pour soumettre un message dans la vue des négociations
        this.view.negotiationForm.addEventListener('submit', (event) => this.handleNegotiationMessage(event));
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
        // On enregistre le type de requête dans la session
        sessionStorage.setItem('requestType', type);
        this.view.showRequestsView();
        const requests = this.model.getRequests(type);
        this.view.renderRequests(requests);
        this.addEventListenersForActionButtons();
    }

    handleHelpButtonClick(id) {
        const type = sessionStorage.getItem('requestType');
        const requests = this.model.getRequests(type);
        const request = requests.find(r => r.id === parseInt(id));
        if (request) {
            this.model.updateRequestStatus(id, type, 'helped');
            this.view.showNegotiationView(request);
        }
    }

    handleNegotiationMessage(event) {
        event.preventDefault();

        // Récupérer le message saisi
        const input = document.getElementById('negotiation-input');
        const message = input.value.trim();

        if (message) {
            // Ajouter le message à la vue des négociations
            this.view.addNegotiationMessage(message);

            // Effacer le champ de saisie
            input.value = '';
        }
    }

    handleMuteButtonClick(id) {
        const type = sessionStorage.getItem('requestType');
        const requests = this.model.getRequests(type);
        const request = requests.find(r => r.id === parseInt(id));
        if (request) {
            this.model.updateRequestStatus(id, type, 'muted');
        }
    }

    backToMainView() {
        this.view.showMainView();
    }

    showRequests(type) {
        const requests = this.model.getRequests(type);
        this.view.renderRequests(requests, type);
        this.addEventListenersForActionButtons();
    }

    addEventListenersForActionButtons() {
        console.log("Ajout des ecouteurs pour les boutons d'action");
        
        document.querySelectorAll('.help-button').forEach(button => {
            button.addEventListener('click', () => this.handleHelpButtonClick(button.dataset.id));
        });

        document.querySelectorAll('.mute-button').forEach(button => {
            button.addEventListener('click', () => this.handleMuteButtonClick(button.dataset.id));
        });
    }

    showRequestsByFilter(filter) {
        const type = sessionStorage.getItem('requestType');
        const requests = this.model.getRequestsByFilter(filter, type);
        this.view.renderRequests(requests, type);
        this.addEventListenersForActionButtons();
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
