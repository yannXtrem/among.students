class Model {
    constructor() {
        this.menuItems = [
            { id: 1, emoji: "🚕", title: "Partage de taxi" },
            { id: 2, emoji: "🛒", title: "Aide pour les courses" },
            { id: 3, emoji: "🖨️", title: "Aide pour imprimer" },
            { id: 4, emoji: "🍎", title: "Échanges d'aliments" },
            { id: 5, emoji: "💵", title: "Transferts de liquidités" },
            { id: 6, emoji: "💊", title: "Aide de médication" },
            { id: 0, emoji: "🚀", title: "Autres" },
        ];

        this.requests = {
            types: ["autres", "taxi", "courses", "imprimer", "aliments", "liquidites", "medication"],
            autres: [
                { id: 1, status: "muted", title: "Autres", description: "Je cherche quelqu'un pour m'aider à faire une autre chose." }
            ],
            taxi: [
                { id: 1, status: "published", title: "Partage de taxi", description: "Je cherche à partager un taxi pour l'université demain matin." },
                { id: 2, status: "published", title: "Partage de taxi", description: "Quelqu'un va à l'aéroport ce soir ?" }
            ],
            courses: [
                { id: 1, status: "published", title: "Aide pour les courses", description: "Je cherche quelqu'un pour m'aider à faire les courses ce week-end." }
            ],
            imprimer: [
                { id: 1, status: "published", title: "Aide pour imprimer", description: "J'ai besoin d'aide pour imprimer un document urgent." }
            ],
            aliments: [
                { id: 1, status: "published", title: "Échanges d'aliments", description: "Je cherche quelqu'un pour m'aider à échanger des aliments." }
            ],
            liquidites: [
                { id: 1, status: "published", title: "Transferts de liquidités", description: "Je cherche quelqu'un pour m'aider à faire un transfert de liquidités." }
            ],
            medication: [
                { id: 1, status: "published", title: "Aide de médication", description: "Je cherche quelqu'un pour m'aider à prendre le médicament." },
                { id: 2, status: "muted", title: "Aide de médication", description: "J'ai besoin d'aide pour prendre le médicament." },
                { id: 3, status: "my-requests", title: "Aide de médication", description: "Je cherche quelqu'un pour m'aider à prendre le médicament demain." }
            ]
        };

        this.notifications = [
            { id: 1, message: "Nouvelle demande de partage de taxi." },
            { id: 2, message: "Quelqu'un a besoin d'aide pour les courses." },
            { id: 3, message: "Demande d'impression urgente." }
        ];
    }

    updateRequestStatus(id, type, status) {
        console.log("Updating request status for ID:", id, "Type:", type, "Status:", status);
        if(!type) type = sessionStorage.getItem('requestType');
        let request = this.requests[type].find(r => r.id === id);
        if (request) {
            request.status = status;
            //remplacer l'ancienne requete par la nouvelle
            this.requests[type] = this.requests[type].filter(r => r.id !== id);
            this.requests[type].push(request);
        }
    }

    getMenuItems() {
        return this.menuItems;
    }

    getNotifications() {
        return this.notifications;
    }

    getRequestsByFilter(filter, type){
        // Renvoie les requêtes filtrées par type
        return this.requests[type].filter(request => request.status === filter) || [];
    }

    getRequests(type) {
        return this.requests[type] || [];
    }

    getRequestType(id){
        return this.requests.types[id] || [];
    }

    addRequest(type, description) {
        const newRequest = {
            id: this.requests[type].length + 1,
            title: this.getTitleByType(type),
            description: description,
            status: "published"
        };
        this.requests[type].push(newRequest);
    }

    getTitleByType(type) {
        const menuItems = this.getMenuItems();
        const item = menuItems.find(item => item.title.toLowerCase().replace(/ /g, '-') === type);
        return item ? item.title : 'Requête inconnue';
    }
}