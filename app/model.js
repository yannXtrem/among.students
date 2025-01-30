class Model {
    constructor() {
        this.menuItems = [
            { id: 1, emoji: "🚕", title: "Partage de taxi" },
            { id: 2, emoji: "🛒", title: "Aide pour les courses" },
            { id: 3, emoji: "🖨️", title: "Aide pour imprimer" },
            { id: 4, emoji: "🍎", title: "Échanges d'aliments" },
            { id: 5, emoji: "💵", title: "Transferts de liquidités" },
            { id: 6, emoji: "💊", title: "Aide de médication" }
        ];
    }

    getMenuItems() {
        return this.menuItems;
    }
}
