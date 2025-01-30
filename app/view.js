class View {
    constructor() {
        this.app = document.getElementById('app');
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
        this.app.innerHTML = menuHTML;
    }
}
