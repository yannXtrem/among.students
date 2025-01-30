class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    init() {
        const menuItems = this.model.getMenuItems();
        this.view.renderMenu(menuItems);

        // Ajouter des écouteurs d'événements pour les tuiles
        document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', () => this.handleTileClick(tile.dataset.id));
        });
    }

    handleTileClick(id) {
        console.log(`Tuile cliquée : ${id}`);
        // Ici, vous pouvez rediriger vers une autre vue ou effectuer une action
    }
}
